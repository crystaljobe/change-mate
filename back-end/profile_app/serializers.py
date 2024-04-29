from rest_framework import serializers
from .models import UserProfile
from interest_app.serializers import InterestCategorySerializer
from event_app.serializers import EventDetailsSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    user_events = EventDetailsSerializer(many=True)
    events_attending = EventDetailsSerializer(many=True)
    interests = InterestCategorySerializer(many=True)

    class Meta: 
        model = UserProfile
        fields = ['id', 'display_name', 'location', 'image', 'interests', 'user_events', 'events_attending']

class DisplayNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['display_name']

class BasicUserData(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()

    class Meta: 
        model = UserProfile
        fields = ['id', 'display_name', 'email']


    def get_email(self, obj):
        return obj.user.email
   