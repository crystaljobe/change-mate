from django.db import models
from .validators import validate_event_type, validate_virtual_event, validate_event_location
from profile_app.models import UserProfile

# Create your models here.
class Event(models.Model):
    title = models.CharField(
        max_length=50
        )
    date = models.DateField()
    event_type = models.CharField(
        validators=[validate_event_type]
        )
    virtual_event_link = models.URLField(
        null=True, 
        unique=True,
        validators=[validate_virtual_event],
        )
    event_venue = models.CharField(
        null=True, 
        validators=[validate_event_location],
        )
    event_venue_address = models.CharField(
        null=True,
        validators=[validate_event_location],
        )
    time = models.CharField()
    time_zome = models.CharField()
    description = models.TextField()
    event_photo = models.ImageField()
    category = models.CharField()
    collaborators = models.ManyToManyField(
        UserProfile,
        related_name='user_events'
        )
    users_attending = models.ManyToManyField(
        UserProfile,
        related_name='event_attending'
        )