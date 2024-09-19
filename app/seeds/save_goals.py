from app.models import db, SaveGoal, environment, SCHEMA, Budget
from sqlalchemy.sql import text
from datetime import datetime, timedelta

demo_save_goals = [
    SaveGoal(
        name='New Bike',
        cost=20000,
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=360),
        userId=1
    ),
    SaveGoal(
        name='Jacket',
        description='I want this jacket.',
        cost=20000,
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=360),
        userId=2
    ),
        SaveGoal(
        name='Jacket',
        description='I want this jacket.',
        cost=20000,
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=360),
        userId=1
    ),
]

def seed_save_goals():
    for save_goal in demo_save_goals:
        db.session.add(save_goal)
    db.session.commit()

def undo_save_goals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.save_goals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM save_goals"))

    db.session.commit()