from rest_framework import serializers
from .models import VolunteerApplication
from profile_app.serializers import BasicUserDataSerializer

class ApplicationSerializer(serializers.ModelSerializer):
    applicant = BasicUserDataSerializer()
    email = serializers.SerializerMethodField()

    class Meta:
        model = VolunteerApplication
        fields = '__all__'

    def get_email(self, obj):
        return obj.applicant.email