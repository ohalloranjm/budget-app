from flask import Blueprint, request
from app.models import db, Budget,Template,Transaction
from flask_login import current_user, login_required
from app.forms import BudgetForm

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

    if not budget:
        return {"error": "Budget not found"}, 404
    
    return budget.to_dict_simple()


# Create a new budget for the current user.
@budget_routes.route('/', methods=['POST'])
@login_required
def create_budget():

    form = BudgetForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_budget = Budget()

        form.populate_obj(new_budget)

        db.session.add(new_budget)
        db.session.commit()

        # print(new_budget.to_dict_simple())
        return new_budget.to_dict_simple(), 201
    
    if form.errors:
        return {"errors": format_errors(form.errors)}, 400
    
    return

# Create a new budget from an existing template for the current user. No test yet!!!!!
@budget_routes.route('/from-template/<int:template_id>', methods=['POST'])
@login_required
def create_budget_from_template(template_id):

    template = Template.query.get(template_id)

    if not template:
        return {'error': 'Template not found'}, 404

    form = BudgetForm()

    if form.validate_on_submit():
        # Create a new budget based on the template
        budget = Budget(
            name=form.name.data if form.name.data else template.name,
            allocated=form.allocated.data if form.allocated.data else template.allocated,
            start_date=form.start_date.data if form.start_date.data else template.start_date,
            end_date=form.end_date.data if form.end_date.data else template.end_date,
            user_id=current_user.id,
            icon=form.icon.data if form.icon.data else template.icon
        )

        db.session.add(budget)
        db.session.commit()

        return budget.to_dict_simple(), 201
    
    if form.errors:
        return {"errors": format_errors(form.errors)}, 400
    
    return

# Edit an existing budget for the current user.
@budget_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_budget(id):
    budget = Budget.query.get(id)

    if not budget or budget.user_id != current_user.id:
        return {"error": "Budget not found or access denied"}, 404

    form = BudgetForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        form.populate_obj(budget)

        db.session.commit()

        return budget.to_dict_simple(), 200

    if form.errors:
        return {"errors": format_errors(form.errors)}, 400

    return {"error": "Invalid request"}, 400


# Delete a budget
@budget_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_budget(id):
    budget = Budget.query.get(id)

    if not budget or budget.user_id != current_user.id:
        return {'error': 'Budget not found or access denied.'}, 404
    
    Transaction.query.filter_by(budget_id=id).delete()

    db.session.delete(budget)
    db.session.commit()

    return {'message': 'Budget deleted successfully.'}