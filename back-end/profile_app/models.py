from django.db import models
from user_app.models import AppUser
from interest_app.models import InterestCategory

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(
        AppUser,
        on_delete=models.CASCADE,
        related_name="user_profile",
        )
    image = models.ImageFieldField()
    location = models.TextField()
    