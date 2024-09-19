from flask import Blueprint, request
from app.models import db, Budget
from flask_login import current_user, login_required

budget_routes = Blueprint("auth", __name__)


@budget_routes.route("/")
def get_user_budgets():
    user_id = current_user.to_dict().object
