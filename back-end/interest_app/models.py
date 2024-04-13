from django.db import models
from .validators import validate_category
from profile_app.models import UserProfile

# Create your models here.
class Interest(models.Model):
    category = models.CharField(
        max_length=40,
        unique=True,
        validators=[validate_category])
    user_profile = models.ForeignKey(
        UserProfile, 
        on_delete=models.CASCADE,
        related_name="user_interests",
        null=True,
        )
    