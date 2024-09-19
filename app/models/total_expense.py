from .budget_templates import budget_templates
from .db import add_prefix_for_prod, db


class TotalExpense(db.Model):
    __tablename__ = "total_expenses"

    id = db.Column(db.Integer, primary_key=True)
    total_budgeted = db.Column(db.Integer, nullable=False)
    total_spent = db.Column(db.Integer, nullable=False)
    month = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="total_expenses")

    def to_dict(self):
        return {
            "id": self.id,
            "total_budgeted": self.total_budgeted,
            "total_spent": self.total_spent,
            "month": self.month,
            "user_id": self.user_id,
        }
