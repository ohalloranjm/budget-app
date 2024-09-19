from app.models import db, Transaction, environment, SCHEMA
from .users import demo, marnie, bobbie
from datetime import datetime
from sqlalchemy.sql import text

demo_transactions = [
    Transaction(
        name='Walmart',
        amount=4567,
        date=datetime.now(),
        user_id=1,
        budget_id=1
    ),
    Transaction(
        name='Marathon',
        amount=5000,
        date=datetime.now(),
        user_id=1,
        budget_id=2
    ),
    Transaction(
        name='Robinhood',
        amount=5,
        date=datetime.now(),
        user_id=1,
        budget_id=3
    ),
    Transaction(
        name='Robinhood',
        amount=5,
        date=datetime.now(),
        user_id=2,
        budget_id=1
    ),
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