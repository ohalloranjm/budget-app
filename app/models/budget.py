from .db import db, environment, SCHEMA, add_prefix_for_prod
from .budget_templates import budget_templates
from app.utils import to_dollars


class Budget(db.Model):
    __tablename__ = "budgets"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    allocated = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    icon = db.Column(db.String(100))

    user = db.relationship("User", back_populates="budgets")
    transactions = db.relationship("Transaction", back_populates="budgets",cascade='all, delete-orphan')
    templates = db.relationship(
        "Template", secondary=budget_templates, back_populates="budgets"
    )
    vendors = db.relationship("Vendor", back_populates="budgets", cascade='all, delete-orphan')

    def to_dict_simple(self):
        return {
            "id": self.id,
            "name": self.name,
            "allocated": to_dollars(self.allocated),
            "start_date": self.start_date,
            "end_date": self.end_date,
            "user_id": self.user_id,
            "icon": self.icon,
        }
