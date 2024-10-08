from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Template


class TemplateForm(FlaskForm):
    name = StringField("Template Name", validators=[DataRequired()])
