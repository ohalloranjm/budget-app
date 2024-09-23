from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, NumberRange, Length

class TransactionForm(FlaskForm):
    amount = IntegerField('Amount', validators=[DataRequired(), NumberRange(1, None, 'Amount must be a positive number.')])
    date = DateField('Date', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired(), Length(max=50, message='Name must be 50 characters or less.')])
    description = StringField('Description', validators=[Length(max=2000, message='Description must be 2000 characters or less.')])
    user_id = IntegerField('userId', validators=[DataRequired()])
    budget_id = IntegerField('budgetId', validators=[DataRequired()])