from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    users_attending = serializers.SerializerMethodField()
    collaborators = serializers.SerializerMethodField()

    class Meta: 
        model = Event
        fields = "['id', 'title', 'date', 'time', 'time_zone', 'event_type', 'virtual_event_link', 'event_venue', 'event_venue_address', 'description', 'event_photo', 'category', 'users_attending', 'collaborators']"

    def get_users_attending(self, obj):
        return obj.count()

    def get_collaborators(self, obj):
         collaborators = obj.collaborators.all()
         return collaborators.display_name

class ProfileEventSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Event
        fields = ['title', 'date', 'time', 'event_venue', 'virtual_event_address']
    