from rest_framework.serializers import ModelSerializer
from .models import VolunteerRole
from profile_app.serializers import UserProfileSerializer

class CreateVolunteerRoleSerializer(ModelSerializer):
    '''Serializer for creating a new volunteer role.'''
    class Meta:
        model = VolunteerRole
        fields = ['event', 'role', 'num_volunteers_needed']

class AssignVolunteerRoleSerializer(ModelSerializer):
    '''Serializer for put request when assigning a volunteer to a role.'''
    assigned_volunteers = UserProfileSerializer(many=True)

    class Meta:
        model = VolunteerRole
        fields = '__all__'