from django.db import models
import json
from user_app.models import AppUser
from interest_app.models import InterestCategory


class UserProfile(models.Model):
    # user profile will be created through user signup view and linked by user ID
    user = models.OneToOneField(
        AppUser,
        on_delete=models.CASCADE,
        related_name="user_profile",
        )
    interests = models.ManyToManyField(
        InterestCategory,
        related_name="user_profiles",
        )
    display_name = models.CharField(
        max_length=40,
        null=True,
        )
    image = models.TextField(
        null=True,
        max_length=10000000
        )
    location = models.TextField(
        null=True,
        blank=True,
        )
    # events_attending - relation from events: users_attending
    # user_events - relation from events: collaborators
    # volunteer_events - relation from volunteer_application: applicant



    
