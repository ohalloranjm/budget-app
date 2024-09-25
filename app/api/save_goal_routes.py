from flask import Blueprint, request
from app.models import db, SaveGoal
from flask_login import current_user, login_required
from ..forms import SaveGoalForm
from datetime import datetime

save_goal_routes = Blueprint("save-goals", __name__)


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
        return {"errors": {"message": "Save goal not found"}}, 404

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

    temp = save_goal.to_dict_simple()
    db.session.delete(save_goal)
    db.session.commit()
    return {"message": "Save goal successfully deleted", "Save goal": temp}


@save_goal_routes.route("/<int:save_goal_id>", methods=["PUT"])
@login_required
def edit_save_goal_by_id(save_goal_id):
    """
    Edit details of a specific save goal by its ID
    """
    save_goal = SaveGoal.query.get(save_goal_id)
    if not save_goal:
        return {"errors": {"message": "Save goal not found"}}, 404
    if not save_goal.user_id == current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401

    form = SaveGoalForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        form.populate_obj(save_goal)
        db.session.commit()

        return save_goal.to_dict_simple(), 201
    if form.errors:
        return {"errors": form.errors}, 400


@save_goal_routes.route("/", methods=["POST"])
@login_required
def post_new_save_goal():
    """
    Create a new Save goal
    """
    form = SaveGoalForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_save_goal = SaveGoal()

        form.populate_obj(new_save_goal)
        new_save_goal.user_id = current_user.to_dict()["id"]
        new_save_goal.start_date = datetime.now()
        new_save_goal.end_date = datetime.fromisoformat(form.end_date.data)

        db.session.add(new_save_goal)
        db.session.commit()

        return new_save_goal.to_dict_simple(), 201

    if form.errors:
        return {"errors": form.errors}, 400
