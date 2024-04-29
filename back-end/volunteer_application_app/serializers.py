from rest_framework import serializers
from .models import VolunteerApplication

class ApplicationSerializer(serializers.ModelSerializer):
    applicant = serialzer.

    class Meta:
        model = VolunteerApplication
        fields = '__all__'