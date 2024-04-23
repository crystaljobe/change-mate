from django.db import models
import json
from user_app.models import AppUser
from interest_app.models import InterestCategory

# Create your models here.

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
    image = models.ImageField(
        null=True,
        blank=True,
        upload_to = 'images/',
        default='users/default-profile-icon.jpg',
        )
    location = models.TextField(
        null=True,
        )

    def set_location(self, list_data):
        self.location = json.dumps(list_data)

    def get_location(self):
        return json.loads(self.location)

    def add_event_attending(self, event_id):
        self.events_attending.add(event_id)

    def remove_event_attending(self, event_id):
        self.events_attending.remove(event_id)

    def add_user_events(self, event_id):
        self.user_events.add(event_id)

    def remove_user_events(self, event_id):
        self.user_events.remove(event_id)

    
