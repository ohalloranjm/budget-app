from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import SaveGoal


class SaveGoalForm(FlaskForm):
    name = StringField("Item Name", validators=[DataRequired()])
    description = StringField("Item Description", validators=[DataRequired()])
    cost = IntegerField("Item Cost", validators=[DataRequired()])
    due_date = StringField("Item Due Date", validators=[DataRequired()])
    icon = StringField("Item Icon", validators=[DataRequired()])
