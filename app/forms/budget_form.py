from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class BudgetForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    allocated = IntegerField('Allocated', validators=[DataRequired()])
    start_date = DateField('Start Date', validators=[DataRequired()])
    end_date = DateField('End Date')
    user_id = IntegerField("User Id", validators=[DataRequired()])
    icon = StringField('Icon')