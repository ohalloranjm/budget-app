"""create templates and transactions tables

Revision ID: 6c349db83c8a
Revises: 3ece013102cf
Create Date: 2024-09-19 12:34:01.629981

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "6c349db83c8a"
down_revision = "3ece013102cf"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "templates",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=50), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "budget_templates",
        sa.Column("template_id", sa.Integer(), nullable=True),
        sa.Column("budget_id", sa.String(length=50), nullable=True),
        sa.ForeignKeyConstraint(
            ["budget_id"],
            ["budgets.id"],
        ),
        sa.ForeignKeyConstraint(
            ["template_id"],
            ["templates.id"],
        ),
    )
    op.create_table(
        "transactions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("amount", sa.Integer(), nullable=False),
        sa.Column("date", sa.DateTime(), nullable=False),
        sa.Column("name", sa.String(length=50), nullable=False),
        sa.Column("description", sa.String(length=2000), nullable=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("budget_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["budget_id"],
            ["budgets.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("transactions")
    op.drop_table("budget_templates")
    op.drop_table("templates")
    # ### end Alembic commands ###
