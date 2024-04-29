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
        )


    def set_location(self, list_data):
        self.location = json.dumps(list_data)

    def get_location(self):
        return json.loads(self.location)



    
