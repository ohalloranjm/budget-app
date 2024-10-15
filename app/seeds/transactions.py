from app.models import db, Transaction, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

demo_transactions = [
    Transaction(budget_id=4, name='Gold\'s Gym', amount=3045, date=datetime(2024, 10, 2), user_id=1),
    Transaction(budget_id=1, name='Walmart', amount=1824, date=datetime(2024, 10, 21), user_id=1),
    Transaction(budget_id=3, name='Robinhood', amount=2252, date=datetime(2024, 10, 23), user_id=1),
    Transaction(budget_id=3, name='Vanguard', amount=4552, date=datetime(2024, 10, 11), user_id=1),
    Transaction(budget_id=1, name='Whole Foods', amount=3544, date=datetime(2024, 10, 22), user_id=1),
    Transaction(budget_id=3, name='E*TRADE', amount=2107, date=datetime(2024, 10, 3), user_id=1),
    Transaction(budget_id=3, name='E*TRADE', amount=3266, date=datetime(2024, 10, 16), user_id=1),
    Transaction(budget_id=2, name='Shell', amount=4816, date=datetime(2024, 10, 28), user_id=1),
    Transaction(budget_id=3, name='Vanguard', amount=1357, date=datetime(2024, 10, 2), user_id=1),
    Transaction(budget_id=1, name='Trader Joe\'s', amount=3126, date=datetime(2024, 10, 27), user_id=1)
]

def seed_transactions():
    for transaction in demo_transactions:
        db.session.add(transaction)
    db.session.commit()

def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()