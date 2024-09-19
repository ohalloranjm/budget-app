from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model):
    __tablename__='transactions'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer,nullable=False)
    date = db.Column(db.Datetime,nullable=False)
    name = db.Column(db.String,nullable=False)
    description = db.Column(db.String(2000))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    budget_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('budgets.id')), nullable=False)

    user = db.relationship(
        'User', back_populates='transactions'
    )

    budget = db.relationship(
        'Budget', back_populates='transactions'
    )