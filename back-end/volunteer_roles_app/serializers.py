from rest_framework import serializers
from .models import VolunteerRole
from profile_app.serializers import UserProfileSerializer

class CreateVolunteerRoleSerializer(serializers.ModelSerializer):
    '''Serializer for creating a new volunteer role.'''
    class Meta:
        model = VolunteerRole
        fields = ['event', 'role', 'num_volunteers_needed']

class AssignVolunteerRoleSerializer(serializers.ModelSerializer):
    '''Serializer for put request when assigning a volunteer to a role.'''
    assigned_volunteers = serializers.SerializerMethodField()
    num_volunteers_assigned = serializers.SerializerMethodField()

    class Meta:
        model = VolunteerRole
        fields = ['event', 'role', 'num_volunteers_needed', 'assigned_volunteers', 'num_volunteers_assigned']

    def get_assigned_volunteers(self, obj):
        accepted_applicants = obj.applications.filter(application_status=True)
        if not accepted_applicants:
            return None
        return UserProfileSerializer(accepted_applicants, many=True).data
    
    def get_num_volunteers_assigned(self, obj):
        return obj.assigned_volunteers.count()