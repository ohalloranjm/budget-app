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
# @login_required
def edit_transaction(id):
    transaction = Transaction.query.get(id)
    if not transaction:
        return {'errors': {'message': 'Transaction not found'}}, 404
    # if not transaction.user_id == current_user.id:
    #     return {'errors': {'message': 'Unauthorized'}}, 401
    
    form = TransactionForm()
    edits = request.json
    reassign_budget = False

    if 'budget_name' in edits:
        reassign_budget = True
    else:
        form['budget_id'].data = transaction.budget_id

    if 'date' in edits:
        form['date'].data = edits['date']
        reassign_budget = True
    else:
        form['date'].data = transaction.date

    if reassign_budget:
        budget_name = None
        if 'budget_name' in edits:
            budget_name = edits['budget_name']
        else:
            original_budget = Budget.query.get(transaction.budget_id)
            budget_name = original_budget.name
        budgets_in_category = Budget.query.filter(Budget.name == budget_name)
        print(list(budgets_in_category))
    
    if 'amount' in edits:
        form['amount'].data = edits['amount']
    else:
        form['amount'].data = transaction.amount
    
    if 'name' in edits:
        form['name'].data = edits['name']
    else:
        form['name'].data = transaction.name
    
    if 'description' in edits:
        form['description'].data = edits['description']
    else:
        form['description'].data = transaction.description
    

    form.populate_obj(transaction)

    print(request.json)
    print(form.data)

    return {'message': 'hi'}
    