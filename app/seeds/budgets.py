from app.models import db, Budget, environment, SCHEMA
from .users import demo, marnie, bobbie
from datetime import datetime
from sqlalchemy.sql import text

demo_budgets = [
    Budget(
        name='Groceries',
        allocated=100000,
        start_date=datetime.now(),
        end_date=None,
        user_id=1,
        icon='shopping_cart'
    ),
    Budget(
        name='Gas',
        allocated=20000,
        start_date=datetime.now(),
        end_date=None,
        user_id=1,
        icon='car'
    ),
    Budget(
        name='Investing',
        allocated=5,
        start_date=datetime.now(),
        end_date=None,
        user_id=1,
        icon='money'
    ),
    Budget(
        name='Investing',
        allocated=5,
        start_date=datetime.now(),
        end_date=None,
        user_id=2,
        icon='money'
    ),
]

def seed_budgets():
    for budget in demo_budgets:
        db.session.add(budget)
    db.session.commit()

def undo_budgets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.budgets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM budgets"))

    db.session.commit()