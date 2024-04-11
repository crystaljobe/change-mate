from rest_framework import serializer
from .models import UserProfile
from user_app.serializers import AppUserSerializer, DisplayNameSerializer
from event_app.serializers import EventProfileSerializer
from interest_app.serializers import InterestCategorySerializer


class UserProfileSerializer(serializer.ModelSerializer):
    user_events = EventProfileSerializer()
    events_attending =  EventProfileSerializer()
    display_name = DisplayNameSerializer()
    interest = InterestCategorySerializer()

    class Meta: 
        model = UserProfile
        fields = ['display_name', 'location', 'image', 'interest' 'user_events', 'events_attending']

