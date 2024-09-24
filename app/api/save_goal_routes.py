from flask import Blueprint, request
from app.models import db, SaveGoal
from flask_login import current_user, login_required
from ..forms import save_goal_form

save_goal_routes = Blueprint("templates", __name__)


@save_goal_routes.route("/")
def get_user_save_goals():
    """
    Get all save goals made by a specific user
    """
    user = current_user.to_dict()
    save_goals = SaveGoal.query.filter(SaveGoal.user_id == user["id"]).all()
    return {"Save Goals": [save_goal.to_dict_simple() for save_goal in save_goals]}
