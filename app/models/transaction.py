from .db import add_prefix_for_prod, db, environment, SCHEMA
from app.utils import to_dollars

class Transaction(db.Model):
    __tablename__ = "transactions"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2000))
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    budget_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("budgets.id")), nullable=False
    )

    user = db.relationship("User", back_populates="transactions")

    budgets = db.relationship("Budget", back_populates="transactions")

    def to_dict_simple(self):
        return {
            "id": self.id,
            "amount": to_dollars(self.amount),
            "date": self.date,
            "name": self.name,
            "description": self.description,
            "user_id": self.user_id,
            "budget_id": self.budget_id,
        }
    
    def to_dict(self):
        return {
            "id": self.id,
            "amount": to_dollars(self.amount),
            "date": self.date,
            "name": self.name,
            "description": self.description,
            "user_id": self.user_id,
            "Budget": self.budgets.to_dict_simple()
        }
