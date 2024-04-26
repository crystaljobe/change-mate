from django.db import models
from event_app.serializers import Event
from profile_app.serializers import UserProfile

# Create your models here.
class VolunteerRole(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    role = models.CharField(max_length=50)
    assigned_volunteer = models.ForeignKey(UserProfile, null=True, on_delete=models.SET_NULL)
    num_volunteers_needed = models.IntegerField()
    #num_volunteers_assigned - calculated in serializer
    # applicants - list of application instances - related field from volunteer applications model