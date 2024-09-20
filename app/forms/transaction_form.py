from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Transaction

class TransactionForm(FlaskForm):
    amount = IntegerField('Amount', validators=[DataRequired()])
    date = DateField('Date', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description')
    user_id = IntegerField('userId', validators=[DataRequired()])
    budget_id = IntegerField('budgetId', validators=[DataRequired()])