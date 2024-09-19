from .db import db, add_prefix_for_prod
from .budget_templates import budget_templates

class TotalExpense(db.Model):
    __tablename__ = 'total_expenses'

    id = db.Column(db.Integer, primary_key=True)
    total_budgeted = db.Column(db.Integer, nullable=False)
    total_spent = db.Column(db.Integer, nullable=False)
    month = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship('User', back_populates='total_expenses')