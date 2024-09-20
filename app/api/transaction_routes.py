from flask import Blueprint
from app.models import Transaction, db
from flask_login import current_user, login_required

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def get_user_transactions():
    user = current_user.to_dict()
    transactions = Transaction.query.filter(Transaction.user_id == user['id']).all()
    return {'Transactions': [transaction.to_dict() for transaction in transactions]}

@transaction_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_transaction(id):
    # user = current_user.to_dict()
    transaction = Transaction.query.get(id)
    if not transaction: 
        return {
            'error': 'Transaction not found'
        }, 404
    tdict = transaction.to_dict()
    db.session.delete(transaction)
    db.session.commit()
    return {
        'message': 'Transaction successfully deleted',
        'Transaction': tdict
    }