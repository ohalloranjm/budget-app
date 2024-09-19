from flask import Blueprint, request
from app.models import db, Budget
from flask_login import current_user, login_required

budget_routes = Blueprint("budgets", __name__)


@budget_routes.route("/")
def get_user_budgets():
    user = current_user.to_dict()
    print(f"\n\n\n\n\n{user}\n\n\n\n\n")
    budgets = Budget.query.filter(Budget.user_id == user["id"]).all()
    return {"Budgets": [budget.to_dict_simple() for budget in budgets]}
