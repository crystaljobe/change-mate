from django.db import models
from .validators import validate_category


# Create your models here.
class Interest(models.Model):
    category = models.CharField(
        max_length=50,
        unique=True,
        validators=[validate_category])
# interests = foreign key w/ interest_app.Interest related name = "user_interests"
    