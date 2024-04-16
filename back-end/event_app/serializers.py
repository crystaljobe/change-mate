from rest_framework import serializers
from .models import Event
from interest_app.serializers import InterestCategorySerializer
from profile_app.serializers import DisplayNameSerializer

class EventSerializer(serializers.ModelSerializer):
    users_attending = serializers.SerializerMethodField()
    collaborators = DisplayNameSerializer(many=True)
    category = InterestCategorySerializer()

    class Meta: 
        model = Event
        fields = ['id', 'title', 'date', 'time', 'time_zone', 'event_type', 'virtual_event_link', 'event_venue', 'event_venue_address', 'description', 'event_photo', 'category', 'users_attending', 'collaborators']

    def get_users_attending(self, obj):
        return obj.users_attending.count()

    # def get_collaborators(self, obj):
    #      collaborators = obj.collaborators.all()

    # def get_category(self, obj):
    #     category = obj.category
    #     ser_category = InterestCategorySerializer(category)
    #     return ser_category


class ProfileEventSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Event
        fields = ['title', 'date', 'time', 'event_venue', 'virtual_event_address']
    