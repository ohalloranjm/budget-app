from app.models import db, Vendor, environment, SCHEMA
from sqlalchemy.sql import text

demo_vendors = [
    Vendor(vendor_name="Walmart", user_id=1, budget_name="Groceries"),
    Vendor(vendor_name="Marathon", user_id=1, budget_name="Gas"),
    Vendor(vendor_name="Robinhood", user_id=1, budget_name="Investing"),
    Vendor(vendor_name="Robinhood", user_id=2, budget_name="Investing"),
]


def seed_vendors():
    for vendor in demo_vendors:
        db.session.add(vendor)
    db.session.commit()


def undo_vendors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.vendors RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM vendors"))

    db.session.commit()
