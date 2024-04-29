from rest_framework.serializers import ModelSerializer
from .models import VolunteerRole
from profile_app.serializers import UserProfileSerializer

# InterestCategory categories serializer to return category 
class CreateVolunteerRoleSerializer(ModelSerializer):
    class Meta:
        model = VolunteerRole
        fields = ['event', 'role', 'num_volunteers_needed']

class AssignVolunteerRoleSerializer(ModelSerializer):
    assigned_volunteers = UserProfileSerializer(many=True)
    class Meta:
        model = VolunteerRole
        fields = '__all__'