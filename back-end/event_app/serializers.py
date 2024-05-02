from rest_framework import serializers
from .models import Event
from interest_app.serializers import InterestCategorySerializer
from django.db.models import Count, Sum



class EventSerializer(serializers.ModelSerializer):
    '''provide correctly formatted data for database storage'''
    category = InterestCategorySerializer()

    class Meta: 
        model = Event
        fields = "__all__"


class EventAdminSerializer(serializers.ModelSerializer):
    '''provide data formatted for event admin page'''
    startTime = serializers.SerializerMethodField()
    startDate = serializers.SerializerMethodField()
    endTime = serializers.SerializerMethodField()
    endDate = serializers.SerializerMethodField()
    hosts = serializers.SerializerMethodField()
    category = InterestCategorySerializer()
    applicants = serializers.SerializerMethodField()
    volunteers = serializers.SerializerMethodField()

    class Meta: 
        model = Event
        fields = ['id', 'title', 'event_start', 'event_end', 'startTime', 'startDate', 'endTime', 'endDate', 'time_zone','event_type', 'virtual_event_link', 'event_venue', 'event_venue_address','location', 'description', 'category', 'applicants', 'volunteers', 'hosts', 'event_photo' ]

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
    def get_hosts(self, obj):
        return [{"user_id": profile.id, "display_name": profile.display_name, "profile_picture": profile.image} for profile in obj.hosts.all()]
    
   # give list of volunteer applicants
    def get_applicants(self, obj):
        if obj.volunteer_roles:
            pending_applications = [role.applications.exclude(application_status = True) for role in obj.volunteer_roles.all()]
            applicants = []
            for application_queryset in pending_applications: 
                for application in application_queryset:  
                    status = "Denied" if application.application_status is False else "Pending"
                    volunteer = {
                        "application_id": application.applicant.id,
                        "role": application.volunteer_role.role,
                        "user_id": application.applicant.id,
                        "display_name": application.applicant.display_name,
                        "application_status": status,
                        "profile_picture": application.applicant.image                        
                    }
                    applicants.append(volunteer)
            return applicants  # Return the list of volunteers
        else:
            return None

    # get list of volunteers that have been assigned  
    def get_volunteers(self, obj):
        if obj.volunteer_roles:
            approved_applications = [role.applications.filter(application_status=True) for role in obj.volunteer_roles.all()]
            volunteers = []
            for application_queryset in approved_applications:  # Iterate over each queryset
                for application in application_queryset:  # Iterate over each application object in the queryset
                    volunteer = {
                        "application_id": application.applicant.id,
                        "role": application.volunteer_role.role,
                        "user_id": application.applicant.id,
                        "display_name": application.applicant.display_name,
                        "profile_picture": application.applicant.image
                    }
                    volunteers.append(volunteer)
            return volunteers  # Return the list of volunteers
        else:
            return None
        

class EventCollaborationSerializer(serializers.ModelSerializer):
    '''provide data formatted for event collaboration page'''
    startTime = serializers.SerializerMethodField()
    startDate = serializers.SerializerMethodField()
    endTime = serializers.SerializerMethodField()
    endDate = serializers.SerializerMethodField()
    num_users_attending = serializers.SerializerMethodField()
    volunteer_spots_remaining = serializers.SerializerMethodField()
    hosts = serializers.SerializerMethodField()
    category = InterestCategorySerializer()
    volunteers = serializers.SerializerMethodField()

    class Meta: 
        model = Event
        fields = ['id', 'title', 'event_start', 'event_end', 'startTime', 'startDate', 'endTime', 'endDate', 'time_zone','event_type', 'virtual_event_link', 'event_venue', 'event_venue_address','location', 'description', 'category',  'attendees_needed', 'num_users_attending', 'volunteer_spots_remaining', 'volunteers','hosts','event_photo' ]

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
    
    # count the number of users attending
    def get_num_users_attending(self, obj):
        return obj.users_attending.count()

    def get_lat(self, obj):

        return obj.coordinates[0] if obj.coordinates else None
    
    def get_lon(self, obj):
        return obj.coordinates[1] if obj.coordinates else None
    
    # give list of user id, profile picture, and display name
    def get_hosts(self, obj):
        return [{"user_id": profile.id, "display_name": profile.display_name, "profile_picture": profile.image} for profile in obj.hosts.all()]
    
    def get_volunteer_spots_remaining(self, obj):
        if obj.volunteer_roles:
            volunteers_needed = obj.volunteer_roles.aggregate(num_volunteers_needed=Sum('num_volunteers_needed'))['num_volunteers_needed']
            if volunteers_needed is None:
                return None
            volunteer_roles = obj.volunteer_roles.all()
            volunteers_assigned = sum(role.applications.filter(application_status=True).count() for role in volunteer_roles)
            return volunteers_needed - volunteers_assigned
        else:
            return None
        
    def get_volunteers(self, obj):
        if obj.volunteer_roles:
            approved_applications = [role.applications.filter(application_status=True) for role in obj.volunteer_roles.all()]
            volunteers = []
            for application_queryset in approved_applications:  # Iterate over each queryset
                for application in application_queryset:  # Iterate over each application object in the queryset
                    volunteer = {
                        "id": application.applicant.id,
                        "display_name": application.applicant.display_name,
                        "profile_picture": application.applicant.image
                    }
                    volunteers.append(volunteer)
            return volunteers  # Return the list of volunteers
        else:
            return None

class EventDetailsSerializer(serializers.ModelSerializer):
    '''provide data formatted for event details page'''
    startTime = serializers.SerializerMethodField()
    startDate = serializers.SerializerMethodField()
    endTime = serializers.SerializerMethodField()
    endDate = serializers.SerializerMethodField()
    num_users_attending = serializers.SerializerMethodField()
    volunteer_spots_remaining = serializers.SerializerMethodField()
    hosts = serializers.SerializerMethodField()
    category = InterestCategorySerializer()
    lat = serializers.SerializerMethodField()
    lon = serializers.SerializerMethodField()
    volunteer_roles = serializers.SerializerMethodField()

    class Meta: 
        model = Event
        fields = ['id', 'title', 'event_start', 'event_end', 'startTime', 'startDate', 'endTime', 'endDate', 'time_zone','event_type', 'virtual_event_link', 'event_venue', 'event_venue_address','location', 'lat', 'lon', 'description', 'category',  'attendees_needed', 'num_users_attending', 'volunteer_spots_remaining', 'volunteer_roles','hosts','event_photo' ]

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
    
    # count the number of users attending
    def get_num_users_attending(self, obj):
        return obj.users_attending.count()

    def get_lat(self, obj):

        return obj.coordinates[1] if obj.coordinates else None
    
    def get_lon(self, obj):
        return obj.coordinates[0] if obj.coordinates else None
    
    # give list of user id, profile picture, and display name
    def get_hosts(self, obj):
        return [{"user_id": profile.id, "display_name": profile.display_name, "profile_picture": profile.image} for profile in obj.hosts.all()]
    
    def get_volunteer_spots_remaining(self, obj):
        if obj.volunteer_roles:
            volunteers_needed = obj.volunteer_roles.aggregate(num_volunteers_needed=Sum('num_volunteers_needed'))['num_volunteers_needed']
            if volunteers_needed is None:
                return None
            volunteer_roles = obj.volunteer_roles.all()
            volunteers_assigned = sum(role.applications.filter(application_status=True).count() for role in volunteer_roles)
            return volunteers_needed - volunteers_assigned
        else:
            return None
        
    def get_volunteer_roles(self, obj):
        if obj.volunteer_roles:
            return [{"id": role.id, "role": role.role} for role in obj.volunteer_roles.all()]
        else:
            return None


class EventCardSerializer(serializers.ModelSerializer):
    '''provide data formatted for event cards'''
    startDate = serializers.SerializerMethodField()
    endDate = serializers.SerializerMethodField()
    category = InterestCategorySerializer()

    class Meta: 
        model = Event
        fields = ['id', 'title', 'event_start', 'event_end', 'startDate', 'endDate', 'time_zone','event_type', 'virtual_event_link', 'event_venue', 'event_venue_address', 'event_photo', 'category', 'location']

    # convert date from YYYY-MM-DD to MM/DD/YYYY
    def get_startDate(self, obj):
        return obj.event_start.strftime('%m/%d/%Y')
    
    # convert date from YYYY-MM-DD to MM/DD/YYYY
    def get_endDate(self, obj):
        return obj.event_end.strftime('%m/%d/%Y')

    




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
