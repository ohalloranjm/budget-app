from flask import Blueprint, request
from app.models import db, Budget, Transaction
from flask_login import current_user, login_required
from app.forms import TransactionForm

budget_routes = Blueprint("budgets", __name__)


@budget_routes.route("/")
def get_user_budgets():
    user = current_user.to_dict()
    print(f"\n\n\n\n\n{user}\n\n\n\n\n")
    budgets = Budget.query.filter(Budget.user_id == user["id"]).all()
    return {"Budgets": [budget.to_dict_simple() for budget in budgets]}

@budget_routes.route('/<int:budget_id>/transactions', methods=['POST'])
@login_required
def post_transaction_to_budget(budget_id):
    
    budget = Budget.query.get(budget_id)
    
    if not budget:
        return {'errors': {'message': 'Budget not found'}}, 404
    if not budget.user_id == current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401
    
    form = TransactionForm(user_id=1,budget_id=budget_id)
    
    if form.validate_on_submit():
        transaction = Transaction()
        form.populate_obj(transaction)
        budget.transactions.append(transaction)
        db.session.commit()
        return transaction.to_dict_simple()
    if form.errors:
        return form.errors, 400