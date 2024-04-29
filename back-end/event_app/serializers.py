from rest_framework import serializers
from .models import Event
from interest_app.serializers import InterestCategorySerializer

class EventSerializer(serializers.ModelSerializer):
    '''provide correctly formatted data for database storage'''
    category = InterestCategorySerializer()

    class Meta: 
        model = Event
        fields = "__all__"

    

class EventDetailsSerializer(serializers.ModelSerializer):
    '''provide data formatted for front end use'''
    startTime = serializers.SerializerMethodField()
    startDate = serializers.SerializerMethodField()
    endTime = serializers.SerializerMethodField()
    endDate = serializers.SerializerMethodField()
    users_attending = serializers.SerializerMethodField()
    num_users_attending = serializers.SerializerMethodField()
    collaborators = serializers.SerializerMethodField()
    category = InterestCategorySerializer()
    lat = serializers.SerializerMethodField()
    lon = serializers.SerializerMethodField()

    class Meta: 
        model = Event
        fields = ['id', 'title', 'event_start', 'event_end', 'startTime', 'startDate', 'endTime', 'endDate', 'time_zone','event_type', 'virtual_event_link', 'event_venue', 'event_venue_address', 'description', 'event_photo', 'category', 'users_attending', 'num_users_attending', 'collaborators', 'location', 'lat', 'lon', 'attendees_needed']

    # convert date from YYYY-MM-DD to MM/DD/YYYY
    def get_startDate(self, obj):
        return obj.event_start.strftime('%m/%d/%Y')
    
    # convert date from YYYY-MM-DD to MM/DD/YYYY
    def get_endDate(self, obj):
        return obj.event_end.strftime('%m/%d/%Y')
    
    # convert time to 12 hr format
    def get_startTime(self, obj):
        return obj.event_start.strftime('%I:%M %p')
    
    # convert time to 12 hr format
    def get_endTime(self, obj):
        return obj.event_end.strftime('%I:%M %p')
    
    # give list of user id, profile picture, and display name
    def get_users_attending(self, obj):
        return [{"user_id": profile.id, "display_name": profile.display_name, "profile_picture": profile.image} for profile in obj.collaborators.all()]
    
    # count the number of users attending
    def get_num_users_attending(self, obj):
        return obj.users_attending.count()

    def get_lat(self, obj):

        return obj.coordinates[1] if obj.coordinates else None
    
    def get_lon(self, obj):
        return obj.coordinates[0] if obj.coordinates else None
    
    # give list of user id, profile picture, and display name
    def get_collaborators(self, obj):
        return [{"user_id": profile.id, "display_name": profile.display_name, "profile_picture": profile.image} for profile in obj.collaborators.all()]



class ICalSerializer(serializers.ModelSerializer):
    startTime = serializers.SerializerMethodField()
    startDate = serializers.SerializerMethodField()
    endTime = serializers.SerializerMethodField()
    endDate = serializers.SerializerMethodField()

    class Meta: 
        model = Event
        fields = ['id', 'title', 'startTime', 'startDate', 'endTime', 'endDate', 'time_zone', 'description']

    def get_startDate(self, obj):
        return obj.event_start.date()

    def get_endDate(self, obj):
        return obj.event_end.date()

    def get_startTime(self, obj):
        return obj.event_start.strftime('%H:%M')

    def get_endTime(self, obj):
        return obj.event_end.strftime('%H:%M')
