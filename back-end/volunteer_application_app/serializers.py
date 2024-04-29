from rest_framework import serializers
from .models import VolunteerApplication
from profile_app.serializers import BasicUserDataSerializer

class ApplicationSerializer(serializers.ModelSerializer):
    applicant = 

    class Meta:
        model = VolunteerApplication
        fields = '__all__'