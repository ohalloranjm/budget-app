from .db import db, add_prefix_for_prod
from .budget_templates import budget_templates

class SaveGoal(db.Model):
    __tablename__ = 'save_goals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2000))
    cost = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    icon = db.Column(db.String(100))
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship('User', back_populates='save_goals')