from rest_framework import serializers
from .models import UserProfile
from event_app.serializers import ProfileEventSerializer, EventSerializer
from interest_app.serializers import InterestCategorySerializer


class UserProfileSerializer(serializers.ModelSerializer):
    user_events = EventSerializer(many=True)
    events_attending =  ProfileEventSerializer(many=True)
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

# class NewUserProfileSerializer(serializers.ModelSerializer):
#     user_profile = NewUserSerializer()
#     class Meta: 
#         model = UserProfile
#         fields = ['id', 'user_profile']