from rest_framework import serializers
from .models import UserProfile
from interest_app.serializers import InterestCategorySerializer
from event_app.serializers import EventCardSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    user_events = EventCardSerializer(many=True)
    events_attending = EventCardSerializer(many=True)
    volunteer_events = EventCardSerializer(many=True)

    class Meta: 
        model = UserProfile
        fields = ['id','interests','display_name','image','location','user_events', 'events_attending', 'volunteer_events']

class DisplayNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['display_name']

class BasicUserDataSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()

    class Meta: 
        model = UserProfile
        fields = ['id', 'display_name', 'email', 'image']


    def get_email(self, obj):
        return obj.user.email
   