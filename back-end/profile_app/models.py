from django.db import models
from user_app.models import AppUser
from interest_app.models import InterestCategory
from django.contrib.postgres.fields import ArrayField


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
        blank=True,
        )
    display_name = models.CharField(
        max_length=40,
        null=True,
        blank=True,
        )
    image = models.TextField(
        null=True,
        max_length=10000000,
        blank=True,
        )
    location = models.CharField( max_length=1000, null=True, blank=True)
    coordinates = ArrayField(models.FloatField(null=True, blank =True), null=True, blank=True)
    # events_attending - relation from events: users_attending
    # user_events - relation from events: collaborators
    # volunteer_events - relation from volunteer_application: applicant



    
