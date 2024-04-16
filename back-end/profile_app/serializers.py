from rest_framework import serializers
from .models import UserProfile
from interest_app.serializers import InterestCategorySerializer


class UserProfileSerializer(serializers.ModelSerializer):
    user_events = serializers.SerializerMethodField()
    events_attending = serializers.SerializerMethodField()
    interests = InterestCategorySerializer(many=True)

    class Meta: 
        model = UserProfile
        fields = ['id', 'display_name', 'location', 'image', 'interests', 'user_events', 'events_attending']

    def get_events_attending(self, obj):
        events_attending = obj.events_attending.all()
        return events_attending

    def get_user_events(self, obj):
        user_events = obj.user_events.all()
        return user_events


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