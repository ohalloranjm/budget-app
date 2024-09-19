from .budget_templates import budget_templates
from .db import add_prefix_for_prod, db


class SaveGoal(db.Model):
    __tablename__ = "save_goals"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2000))
    cost = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    icon = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    def to_dict_simple(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "cost": self.cost,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "icon": self.icon,
            "user_id": self.user_id,
        }

    user = db.relationship("User", back_populates="save_goals")
