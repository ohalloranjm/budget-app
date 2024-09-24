from flask import Blueprint, request
from app.models import Transaction, Budget, db
from flask_login import current_user, login_required
from app.forms import TransactionForm

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def get_user_transactions():
    user = current_user.to_dict()
    transactions = Transaction.query.filter(Transaction.user_id == user['id']).all()
    return {'Transactions': [transaction.to_dict() for transaction in transactions]}

@transaction_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_transaction(id):
    transaction = Transaction.query.get(id)
    if not transaction: 
        return {'errors': {'message': 'Transaction not found'}}, 404
    if (not transaction.user_id == current_user.id):
        return {'errors': {'message': 'Unauthorized'}}, 401
    
    tdict = transaction.to_dict()
    db.session.delete(transaction)
    db.session.commit()
    return {
        'message': 'Transaction successfully deleted',
        'Transaction': tdict
    }

@transaction_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_transaction(id):
    transaction = Transaction.query.get(id)
    if not transaction:
        return {'errors': {'message': 'Transaction not found'}}, 404
    if not transaction.user_id == current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401
    
    form = TransactionForm(user_id=current_user.id)
    form['csrf_token'].data = request.cookies['csrf_token']

    old_budget_name = transaction.budgets.name
    new_budget_name = request.json['budget_name']
    change_budget_name = old_budget_name != new_budget_name

    old_date = str(transaction.date)[:10]
    new_date = str(form['date'].data)[:10]
    change_date = old_date != new_date
    
    if change_budget_name or change_date:
        budgets_in_category = Budget.query.filter(Budget.name == new_budget_name and Budget.user_id == current_user.id)
        
        if not len(list(budgets_in_category)):
            return {'errors': {'message': f'User does not have any budgets with the name {new_budget_name}'}}, 404
        
        def valid_date(budget):
            if budget.start_date > form['date'].data:
                return False
            if budget.end_date and budget.end_date < form['date'].data:
                return False
            return True
        valid_budgets = [ budget for budget in budgets_in_category if valid_date(budget)]

        if not len(valid_budgets):
            form['budget_id'].data = transaction.budget_id
            form.validate_on_submit()
            if form.errors:
                errors = dict(form.errors)
                errors['date'] = f'{new_budget_name} date range does not include {new_date}'
                return errors, 400
            return {'date': f'{new_budget_name} date range does not include {new_date}'}, 400
                
        budget = valid_budgets[0]
        form['budget_id'].data = budget.id

    else:
        form['budget_id'].data = transaction.budget_id

    if form.validate_on_submit():
        form.populate_obj(transaction)
        db.session.commit()
        return transaction.to_dict_simple()
    if form.errors:
        return form.errors, 400
    