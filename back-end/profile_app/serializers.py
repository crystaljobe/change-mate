from rest_framework import serializer
from .models import UserProfile
from event_app.serializers import EventProfileSerializer
from interest_app.serializers import InterestCategorySerializer


class UserProfileSerializer(serializer.ModelSerializer):
    user_events = EventProfileSerializer()
    events_attending =  EventProfileSerializer()
    interest = InterestCategorySerializer()

    class Meta: 
        model = UserProfile
        fields = ['display_name', 'location', 'image', 'interest' 'user_events', 'events_attending']

class DisplayNameSerializer(serializer.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['display_name']

class ProfileFieldSerializer(serializer.ModelSerializer):
    interest = InterestCategorySerializer()

    class Meta: 
        model = UserProfile
        fields = ['location', 'image', 'interest']