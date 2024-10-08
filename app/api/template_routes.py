from flask import Blueprint, request
from app.models import db, Template, Budget
from flask_login import current_user, login_required
from ..forms import TemplateForm

template_routes = Blueprint("templates", __name__)


@template_routes.route("/")
@login_required
def get_user_templates():
    """
    Get all templates made by a specific user
    """
    user = current_user.to_dict()
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
    """
    Delete a template by ID
    """
    template = Template.query.get(template_id)
    if not template:
        return {"errors": {"message": "Template not found"}}, 404
    if not template.user_id == current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401

    temp = template.to_dict()
    db.session.delete(template)
    db.session.commit()
    return {"message": "Template successfully deleted", "Template": temp}


@template_routes.route("/", methods=["POST"])
@login_required
def post_new_template():
    """
    Create a new Template
    """
    form = TemplateForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_template = Template()

        form.populate_obj(new_template)
        new_template.user_id = current_user.to_dict()["id"]

        db.session.add(new_template)
        db.session.commit()

        return new_template.to_dict_simple(), 201

    if form.errors:
        return {"errors": form.errors}, 400

    return

@template_routes.route("/<int:template_id>/budgets", methods=["POST"])
@login_required
def post_budget_to_template(template_id):
    """
    Add an existing budget to an existing template
    """
    template = Template.query.get(template_id)
    if not template:
        return {"errors": {"message": "Template not found"}}, 404
    
    if not template.user_id == current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401
    
    for key in request.json:
        budget = Budget.query.get(key)
        if not budget.user_id == current_user.id:
            return {"errors": {"message": "Unauthorized"}}, 401
        template.budgets.append(budget)

    db.session.commit()

    return template.to_dict()

@template_routes.route("/<int:template_id>", methods=["PUT"])
@login_required
def put_template(template_id):
    """
    Edits an existing template
    """
    template = Template.query.get(template_id)
    if not template:
        return {"errors": {"message": "Template not found"}}, 404
    
    if not template.user_id == current_user.id:
        return {"errors": {"message": "Unauthorized"}}, 401
    
    
    template.budgets[:] = []
    
    template.name = request.json['template']['name']
    
    for key in request.json['budgets']:
        budget = Budget.query.get(key)
        if not budget.user_id == current_user.id:
            return {"errors": {"message": "Unauthorized"}}, 401
        template.budgets.append(budget)

    db.session.commit()

    return template.to_dict()