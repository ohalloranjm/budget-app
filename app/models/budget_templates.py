from .db import db, add_prefix_for_prod, environment, SCHEMA

budget_templates = db.Table(
    "budget_templates",
    db.Column(
        "template_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("templates.id")),
    ),
    db.Column(
        "budget_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("budgets.id")),
    ),
)

if environment == "production":
    budget_templates.schema = SCHEMA
