from django.db import models
from .validators import validate_category

# model for all interest categories
class InterestCategory(models.Model):
    category = models.CharField(
        max_length=50,
        unique=True,
        validators=[validate_category])





    