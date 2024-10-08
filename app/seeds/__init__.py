from flask.cli import AppGroup
from .users import seed_users, undo_users
from .budgets import seed_budgets, undo_budgets
from .save_goals import seed_save_goals, undo_save_goals
from .transactions import seed_transactions, undo_transactions
from .templates import seed_templates, undo_templates
from .total_expenses import seed_total_expenses, undo_total_expenses

from app.models.db import environment

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    seed_budgets()
    seed_transactions()
    seed_templates()
    seed_save_goals()
    seed_total_expenses()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_total_expenses()
    undo_save_goals()
    undo_templates()
    undo_budgets()
    undo_transactions()
    undo_users()
    # Add other undo functions here
