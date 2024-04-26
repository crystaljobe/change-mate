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

class LocationFieldSerializer(serializers.ModelSerializer):

    class Meta: 
        model = UserProfile
        fields = ['location']

class ImgFieldSerializer(serializers.ModelSerializer):

    class Meta: 
        model = UserProfile
        fields = ['image']

class UserInterestSerializer(serializers.ModelSerializer):
    interests = InterestCategorySerializer(many=True) 
    
    class Meta: 
        model = UserProfile
        fields = ['interests']