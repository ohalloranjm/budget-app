from .db import db, add_prefix_for_prod

budget_templates = db.Table(
  "budget_templates",
    db.Column(
    "template_id",
    db.Integer,
    db.ForeignKey(add_prefix_for_prod("templates.id")),
  ),
  db.Column(
    "budget_name",
    db.String(50),
    db.ForeignKey(add_prefix_for_prod("budgets.name")),
  )
)