from rest_framework.serializers import ModelSerializer
from .models import VolunteerRole

# InterestCategory categories serializer to return category 
class VolunteerRoleSerializer(ModelSerializer):
    class Meta:
        model = VolunteerRole
        fields = '__all__'