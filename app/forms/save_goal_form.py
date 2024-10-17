from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import SaveGoal


class SaveGoalForm(FlaskForm):
    name = StringField("Item Name", validators=[DataRequired()])
    description = StringField("Item Description")
    cost = IntegerField("Item Cost", validators=[DataRequired()])
    end_date = StringField("Item Due Date", validators=[DataRequired()])
    icon = StringField("Item Icon")
