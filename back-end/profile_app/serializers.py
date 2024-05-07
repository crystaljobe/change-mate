from rest_framework import serializers
from .models import UserProfile
from interest_app.serializers import InterestCategorySerializer
from event_app.serializers import EventCardSerializer
# from volunteer_application_app.serializers import ApplicationStatusSerializer

class UserProfileSerializer(serializers.ModelSerializer):
    user_events = EventCardSerializer(many=True)
    events_attending = EventCardSerializer(many=True)
    volunteer_events = serializers.SerializerMethodField()
    interests = InterestCategorySerializer(many=True)

    class Meta: 
        model = UserProfile
        fields = ['id', 'display_name', 'location', 'coordinates', 'image', 'interests', 'user_events', 'events_attending', 'volunteer_events']

    def get_volunteer_events(self, obj):
        applications = obj.volunteer_events.all()
        events = []
        for app in applications:
            event_data = {
                'event': EventCardSerializer(app.volunteer_role.event).data,
                'application_status': app.application_status  # Include application status
            }
            events.append(event_data)
        return events



class DisplayNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['display_name']

class BasicUserDataSerializer(serializers.ModelSerializer):

    class Meta: 
        model = UserProfile
        fields = ['id', 'display_name', 'image']

   
class UserProfileSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'display_name', 'image']

