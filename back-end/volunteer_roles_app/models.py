from django.db import models
from event_app.serializers import Event
from profile_app.serializers import UserProfile
from .validators import validate_no_duplicates, ValidationError, IntegrityError


class VolunteerRole(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    role = models.CharField(max_length=50)
    assigned_volunteers = models.ManyToManyField(UserProfile, blank=True, related_name="volunteer_roles")
    num_volunteers_needed = models.IntegerField()
    #num_volunteers_assigned - calculated in serializer
    # applicants - list of application instances - related field from volunteer applications model


    # def add_volunteers(self, volunteer_ids):
    #     '''add new volunteers to role'''
    #     try:
    #         # validate that no duplicates are being added
    #         validate_no_duplicates(self, volunteer_ids)
    #         self.assigned_volunteer.add(*volunteer_ids)
    #     except IntegrityError as e:
    #         raise ValidationError('Volunteer Not Added: No User Profile found with provided ID.')
    #     except ValidationError as e:
    #         raise e