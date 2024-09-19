from app.models import db, Template, environment, SCHEMA, Budget
from .users import demo, marnie, bobbie
from datetime import datetime
from sqlalchemy.sql import text

demo_templates = [
    Template(
        name='JustDoIt',
        user_id=1,
    ),
    Template(
        name='SomethingElse',
        user_id=2,
    ),
]

def seed_templates():
    for template in demo_templates:
        some_budgets = Budget.query.filter(Budget.user_id == template.user_id).all()

        for budget in some_budgets:
            template.budgets.append(budget)
            
        db.session.add(template)
    db.session.commit()

def undo_templates():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.templates RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM templates"))

    db.session.commit()