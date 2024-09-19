from app.models import db, TotalExpense, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

demo_total_expenses = [
    TotalExpense(
        total_budgeted = 200000,
        total_spent = 203934,
        month = datetime.fromisoformat('2024-07-01'),
        user_id = 1
    ),
    TotalExpense(
        total_budgeted = 200000,
        total_spent = 198845,
        month = datetime.fromisoformat('2024-08-01'),
        user_id = 1
    ),
    TotalExpense(
        total_budgeted = 500000,
        total_spent = 613556,
        month = datetime.fromisoformat('2024-08-01'),
        user_id = 2
    )
]

def seed_total_expenses():
    for total_expense in demo_total_expenses:
        db.session.add(total_expense)
    db.session.commit()

def undo_total_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.total_expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM total_expenses"))

    db.session.commit()