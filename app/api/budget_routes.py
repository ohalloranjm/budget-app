from flask import Blueprint, request
from app.models import db, Budget
from flask_login import current_user, login_required
from ..forms import BudgetForm

budget_routes = Blueprint("budgets", __name__)

def format_errors(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = dict()

    for field in validation_errors:
        errorMessages[field] = [error for error in validation_errors[field]]

    return errorMessages


# Query for all budgets
@budget_routes.route("/")
@login_required
def get_user_budgets():
    user = current_user.to_dict()
    # print(f"\n\n\n\n\n{user}\n\n\n\n\n")
    budgets = Budget.query.filter(Budget.user_id == user["id"]).all()
    return {"Budgets": [budget.to_dict_simple() for budget in budgets]}


# Query for a budget by id
@budget_routes.route('/<int:id>')
@login_required
def budget(id):

    budget = Budget.query.get(id)
    return budget.to_dict_simple()


# Create a new budget from scratch for the current user.
@budget_routes.route('/', methods=['POST'])
@login_required
def create_budget():

    form = BudgetForm()
    if form.validate_on_submit():
        new_budget = Budget()
        form.populate_obj(new_budget)
        
        db.session.add(new_budget)
        db.session.commit()
        
        return new_budget.to_dict_simple(), 201
    
    if form.errors:
        return {"errors": format_errors(form.errors)}, 400
    
    return
    

# Delete a budget
@budget_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_budget(id):
    budget = Budget.query.get(id)

    if not budget or budget.user_id != current_user.id:
        return jsonify({'error': 'Budget not found or access denied.'}), 404

    db.session.delete(budget)
    db.session.commit()

    return jsonify({'message': 'Budget deleted successfully.'})