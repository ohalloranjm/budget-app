from flask import Blueprint, request
from app.models import db, Template
from flask_login import current_user, login_required

template_routes = Blueprint("templates", __name__)


@template_routes.route("/")
def get_user_templates():
    user = current_user.to_dict()
    print(f"\n\n\n\n\n{user}\n\n\n\n\n")
    templates = Template.query.filter(Template.user_id == user["id"]).all()
    return {"Templates": [template.to_dict_simple() for template in templates]}


@template_routes.route("/<int:template_id>")
def get_template_by_id(template_id):
    template = Template.query.get(template_id)
