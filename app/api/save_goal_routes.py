from flask import Blueprint, request
from app.models import db, SaveGoal
from flask_login import current_user, login_required
from ..forms import save_goal_form

save_goal_routes = Blueprint("templates", __name__)


@save_goal_routes.route("/")
@login_required
def get_user_save_goals():
    """
    Get all save goals made by a specific user
    """
    user = current_user.to_dict()
    save_goals = SaveGoal.query.filter(SaveGoal.user_id == user["id"]).all()
    return {"Save Goals": [save_goal.to_dict_simple() for save_goal in save_goals]}

@save_goal_routes.route("/<int:save_goal_id>")
@login_required
def get_save_goal_by_id(save_goal_id):
    """
    Get details of a specific save goal by its ID
    """
    save_goal = SaveGoal.query.get(save_goal_id)
    if not save_goal:
        return {}
    return save_goal.to_dict_simple()

@save_goal_routes.route("/<int:save_goal_id>", methods=["DELETE"])
@login_required
def delete_save_goal(save_goal_id):
    """
    Delete a save goal by ID
    """
    save_goal = SaveGoal.query.get(save_goal_id)
    if not save_goal:
        return {"errors": {"message": "Save goal not found"}}, 404
    if not save_goal.user_id == current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401

    temp = save_goal.to_dict()
    db.session.delete(save_goal)
    db.session.commit()
    return {"message": "Save goal successfully deleted", "Save goal": temp}