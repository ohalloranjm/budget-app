from flask import Blueprint, request
from app.models import db, Template
from flask_login import current_user, login_required
from ..forms import TemplateForm

template_routes = Blueprint("templates", __name__)


@template_routes.route("/")
def get_user_templates():
    """
    Get all templates made by a specific user
    """
    user = current_user.to_dict()
    print(f"\n\n\n\n\n{user}\n\n\n\n\n")
    templates = Template.query.filter(Template.user_id == user["id"]).all()
    return {"Templates": [template.to_dict_simple() for template in templates]}


@template_routes.route("/<int:template_id>")
def get_template_by_id(template_id):
    """
    Get details of a specific template by its ID
    """
    template = Template.query.get(template_id)
    return template.to_dict()


@template_routes.route("/<int:template_id>", methods=["DELETE"])
@login_required
def delete_template(template_id):
    template = Template.query.get(template_id)
    if not template:
        {"errors": {"message": "Template not found"}}, 404
    if not template.user_id == current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401

    temp = template.to_dict()
    db.session.delete(template)
    db.session.commit()
    return {"message": "Template successfully deleted", "Template": temp}


@template_routes.route("/", methods=["post"])
def post_new_template():
    """
    Create a new Template
    """
    form = TemplateForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_template = TemplateForm()

        form.populate_obj(new_template)

        db.session.add(new_template)
        db.session.commit()

        return new_template.to_dict_simple(), 201

    if form.errors:
        return {"errors": form.errors}, 400

    return
