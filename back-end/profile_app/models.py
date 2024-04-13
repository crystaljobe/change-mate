from django.db import models
from user_app.models import AppUser

# Create your models here.

class UserProfile(models.Model):
    # user profile will be created through user signup view and linked by user ID
    user = models.OneToOneField(
        AppUser,
        on_delete=models.CASCADE,
        related_name="user_profile",
        )
    display_name = models.CharField(
        max_length=40,
        null=True,
        )
    image = models.ImageField(
        null=True,
        )
    location = models.TextField(
        null=True
        )
    # interests = foreign key w/ interest_app.Interest related name = "user_interests"
    
