from rest_framework import serializers
from .models import UserProfile
from event_app.serializers import EventProfileSerializer
from interest_app.serializers import InterestCategorySerializer


class UserProfileSerializer(serializers.ModelSerializer):
    user_events = EventProfileSerializer(many=True)
    events_attending =  EventProfileSerializer(many=True)
    # interest = InterestCategorySerializer(many=True)

    class Meta: 
        model = UserProfile
        fields = ['display_name', 'location', 'image', 'user_events', 'events_attending']
        # 'interest',

class DisplayNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['display_name']

class LocationFieldSerializer(serializers.ModelSerializer):

    class Meta: 
        model = UserProfile
        fields = ['location']

class ImgFieldSerializer(serializers.ModelSerializer):

    class Meta: 
        model = UserProfile
        fields = ['image']