from rest_framework import serializers
from .models import VolunteerApplication
from profile_app.serializers import BasicUserDataSerializer
from django.utils.timezone import now

class ApplicationSerializer(serializers.ModelSerializer):
    '''Serializer for new volunteer applications'''
    applicant = BasicUserDataSerializer()
    email = serializers.SerializerMethodField()

    class Meta:
        model = VolunteerApplication
        exclude = ['decision_made_by', 'decision_text', 'decision_date']

    def get_email(self, obj):
        return obj.applicant.email
    
class ApplicationDecisionSerializer(serializers.ModelSerializer):
    '''Serializer for updating application status'''
    decision_made_by = BasicUserDataSerializer()
    decision_date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = VolunteerApplication
        fields = "__all__"

    def update(self, obj, validated_data):
        obj.application_status = validated_data.get('application_status', obj.application_status)
        obj.decision_made_by = validated_data.get('decision_made_by', obj.decision_made_by)
        obj.decision_date = now()  # Set decision_date to the current datetime
        obj.save()
        return obj
        

