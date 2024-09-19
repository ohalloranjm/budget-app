from .db import db, add_prefix_for_prod


class Vendor(db.Model):
    __tablename__ = "vendors"
    id = db.Column(db.Integer, primary_key=True)
    vendor_name = db.Column(
        db.String(50),
        db.ForeignKey(add_prefix_for_prod("transactions.name")),
        nullable=False,
    )
    budget_name = db.Column(
        db.String(50),
        db.ForeignKey(add_prefix_for_prod("budgets.name")),
        nullable=False,
    )
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="vendors")
    budgets = db.relationship("Budget", back_populates="vendors")
    transactions = db.relationship("Transaction", back_populates="vendors")
