from rest_framework import serializers
from .models import VolunteerApplication
from django.utils.timezone import now


class ApplicationSerializer(serializers.ModelSerializer):
    '''Serializer for new volunteer applications'''

    class Meta:
        model = VolunteerApplication
        fields = '__all__'

    
class ApplicationDecisionSerializer(serializers.ModelSerializer):
    '''Serializer for updating application status'''

    class Meta:
        model = VolunteerApplication
        fields = ['application_status', 'decision_made_by', 'decision_text', 'decision_date']


class ApplicationViewSerializer(serializers.ModelSerializer):
    '''Serializer for viewing volunteer applications'''
    applicant = serializers.SerializerMethodField()
    decision_made_by = serializers.SerializerMethodField()

    class Meta:
        model = VolunteerApplication
        fields = '__all__'

    def get_applicant(self, obj):
        return {
            'id': obj.applicant.id,
            'display_name': obj.applicant.display_name,
            'email': obj.applicant.user.email
        }
    
    def get_decision_made_by(self, obj):
        return {
            'id': obj.applicant.id,
            'display_name': obj.applicant.display_name,
            'email': obj.applicant.user.email
        }


