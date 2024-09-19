from .budget_templates import budget_templates
from .db import add_prefix_for_prod, db


class Template(db.Model):
    __tablename__ = "templates"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="templates")
    budgets = db.relationship(
        "Budget", secondary=budget_templates, back_populates="templates"
    )

    def to_dict(self):
        return {"id": self.id, "name": self.name, "user_id": self.user_id}
