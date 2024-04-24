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
        ser_events_attending = [{'id':x.id, 'title':x.title, 'event_start':x.event_start, 'event_end':x.event_end, 'event_type':x.event_type, 'event_venue':x.event_venue, 'event_venue_address':x.event_venue_address, 'virtual_event_link':x.virtual_event_link, 'description':x.description, 'users_attending':x.users_attending.count()} for x in events_attending]
        return ser_events_attending

    def get_user_events(self, obj):
        user_events = obj.user_events.all()
        ser_user_events = [{'id':x.id, 'title':x.title, 'event_start':x.event_start, 'event_end':x.event_end, 'event_type':x.event_type, 'event_venue':x.event_venue, 'event_venue_address':x.event_venue_address, 'virtual_event_link':x.virtual_event_link, 'description':x.description,'users_attending':x.users_attending.count()} for x in user_events]
        return ser_user_events

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