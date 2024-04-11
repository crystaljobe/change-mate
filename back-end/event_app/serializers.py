from rest_framework import serializer
from .models import Event
from profile_app.serializers import DisplayNameSerializer

class EventSerializer(serializer.ModelSerializer):
    users_attending = serializer.SerializerMethodField()
    collaborators = DisplayNameSerializer(many=True)

    class Meta: 
        model = Event
        fields = ['title', 'date', 'time', 'time_zone', 'event_type', 'virtual_event_link', 'event_venue', 'event_venue_address', 'description', 'event_photo', 'category', 'collaborators', 'users_attending']

    def get_users_attending(self, obj):
        return obj.count()

class EventProfileSerializer(serializer.ModelSerializer):

    class Meta: 
        model = Event
        fields = ['title', 'date', 'time', 'event_venue', 'virtual_event_address']
    