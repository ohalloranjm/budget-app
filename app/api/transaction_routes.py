from flask import Blueprint
from app.models import Transaction
from flask_login import current_user, login_required

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def get_user_transactions():
    user = current_user.to_dict()
    transactions = Transaction.query.filter(Transaction.user_id == user['id']).all()
    return {'Transactions': [transaction.to_dict() for transaction in transactions]}