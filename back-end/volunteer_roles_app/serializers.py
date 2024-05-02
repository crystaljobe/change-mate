from rest_framework import serializers
from .models import VolunteerRole




class CreateVolunteerRoleSerializer(serializers.ModelSerializer):
    '''Serializer for creating a new volunteer role.'''
    class Meta:
        model = VolunteerRole
        fields = ['event', 'role', 'num_volunteers_needed']

