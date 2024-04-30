from django.db import models
from event_app.serializers import Event
from profile_app.serializers import UserProfile



class VolunteerRole(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="volunteer_roles")
    role = models.CharField(max_length=50)
    num_volunteers_needed = models.IntegerField()
    # assigned_volunteers - generated in serializer
    # num_volunteers_assigned - calculated in serializer
    # applications - list of application instances - related field from volunteer applications model

