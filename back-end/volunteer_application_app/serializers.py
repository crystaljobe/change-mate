from rest_framework import serializers
from .models import VolunteerApplication
from profile_app.serializers import BasicUserDataSerializer
from django.utils.timezone import now

class ApplicationSerializer(serializers.ModelSerializer):
    '''Serializer for new volunteer applications'''

    class Meta:
        model = VolunteerApplication
        exclude = ['decision_made_by', 'decision_text', 'decision_date']

    
class ApplicationDecisionSerializer(serializers.ModelSerializer):
    '''Serializer for updating application status'''

    class Meta:
        model = VolunteerApplication
        fields = ['application_status', 'decision_made_by', 'decision_text', 'decision_date']


class ApplicationViewSerializer(serializers.ModelSerializer):
    '''Serializer for viewing volunteer applications'''
    applicant = BasicUserDataSerializer()
    decision_made_by = BasicUserDataSerializer(required = False)

    class Meta:
        model = VolunteerApplication
        field = '__all__'

        

