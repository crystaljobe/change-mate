from django.db import models
from .validators import validate_event_type
from profile_app.models import UserProfile
from interest_app.models import InterestCategory


# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=50)
    event_end = models.DateTimeField()
    event_start = models.DateTimeField()
    event_type = models.CharField(validators=[validate_event_type])
    virtual_event_link = models.URLField(
        blank=True,
        unique=True,
        null=True,
    )
    event_venue = models.CharField(
        blank=True,
        null=True,
    )
    event_venue_address = models.CharField(
        blank=True,
        null=True,
    )
    time_zone = models.CharField()
    description = models.TextField()
    event_photo = models.TextField(null=True, blank=True, max_length=10000000)
    category = models.ForeignKey(
        InterestCategory,
        on_delete=models.CASCADE,
        related_name="events",
    )
    collaborators = models.ManyToManyField(UserProfile, related_name="user_events")
    users_attending = models.ManyToManyField(
        UserProfile, related_name="events_attending"
    )
