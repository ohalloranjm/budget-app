from flask import Blueprint, request
from app.models import db, Budget,Template,Transaction
from flask_login import current_user, login_required
from app.forms import BudgetForm
from app.utils import to_dollars
from datetime import date, timedelta
from calendar import monthrange

budget_routes = Blueprint("budgets", __name__)

def format_errors(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = dict()

    for field in validation_errors:
        errorMessages[field] = [error for error in validation_errors[field]]

    return errorMessages

def calculate_rollover(budget):
    today = date.today()
     # Determine the first and last day of the previous month
    first_day_current_month = today.replace(day=1)
    last_day_previous_month = first_day_current_month - timedelta(days=1)
    first_day_previous_month = last_day_previous_month.replace(day=1)

    # Calculate spending for the previous month
    previous_month_spend = sum(
        transaction.amount for transaction in budget.transactions
        if first_day_previous_month <= transaction.date.date() <= last_day_previous_month
    )
    
    # Calculate rollover based on unspent budget in the previous month
    rollover = budget.allocated - previous_month_spend
    return rollover if rollover > 0 else 0 

# Query for all active budgets for the current user and return a summary with overspending/surplus rolled over to the next budget period.
@budget_routes.route('/active')
@login_required
def active_budgets():

    active_budgets = Budget.query.filter_by(user_id=current_user.id).all()

    summary = []
    for budget in active_budgets:
        rollover = calculate_rollover(budget)
        summary.append({
            'id': budget.id,
            'name': budget.name,
            'allocated': to_dollars(budget.allocated),
            'start_date': budget.start_date,
            'end_date': budget.end_date,
            'rollover': to_dollars(rollover),
        })
    return {'active_budgets': summary}


# Query for all budgets
@budget_routes.route("/")
@login_required
def get_user_budgets():
    user = current_user.to_dict()
    # print(f"\n\n\n\n\n{user}\n\n\n\n\n")
    budgets = Budget.query.filter(Budget.user_id == user["id"]).all()
    return {"Budgets": [budget.to_dict_simple() for budget in budgets]}

# add a transaction to a budget by budget id
@budget_routes.route('/<int:budget_id>/transactions', methods=['POST'])
@login_required
def post_transaction_to_budget(budget_id):
    
    budget = Budget.query.get(budget_id)
    
    if not budget:
        return {'errors': {'message': 'Budget not found'}}, 404
    if not budget.user_id == current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401
    
    form = TransactionForm(user_id=current_user.id,budget_id=budget_id)
    
    if form.validate_on_submit():
        transaction = Transaction()
        form.populate_obj(transaction)
        budget.transactions.append(transaction)
        db.session.commit()
        return transaction.to_dict_simple()
    if form.errors:
        return form.errors, 400
    
# add a transaction to a budget by budget name
@budget_routes.route('/<budget_name>/transactions', methods=['POST'])
@login_required
def post_transaction_to_budget_by_name(budget_name):

    budgets_in_category = Budget.query.filter(Budget.name == budget_name and Budget.user_id == current_user.id)

    if not len(list(budgets_in_category)):
        return {'errors': {'message': 'User does not have any budgets with that name'}}, 404

    demo_form = TransactionForm(user_id=current_user.id,budget_id=1)
    demo_transaction = Transaction()
    demo_form.populate_obj(demo_transaction)

    def valid_date(budget):
        if budget.start_date > demo_transaction.date:
            return False
        if budget.end_date and budget.end_date < demo_transaction.date:
            return False
        return True

    valid_budgets = [ budget for budget in budgets_in_category if valid_date(budget) ]

    if not len(valid_budgets):
        demo_form.validate_on_submit()
        if demo_form.errors:
            errors = dict(demo_form.errors)
            errors['date'] = f'{budget_name} date range does not include {demo_transaction.date}'
            print(errors)
            return errors, 400
        return {'date': f'{budget_name} date range does not include {demo_transaction.date}'}, 400

    budget = valid_budgets[0]
    form = TransactionForm(user_id=current_user.id,budget_id=budget.id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        transaction = Transaction()
        form.populate_obj(transaction)
        budget.transactions.append(transaction)
        db.session.commit()
        return transaction.to_dict_simple(), 201
    if form.errors:
        print(form.errors)
        return form.errors, 400

# Query for a budget by id
@budget_routes.route('/<int:id>')
@login_required
def budget(id):
  
    budget = Budget.query.get(id)

    if not budget:
        return {"error": "Budget not found"}, 404

    return budget.to_dict()


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

    db.session.delete(budget)
    db.session.commit()

    return {'message': 'Budget deleted successfully.'}