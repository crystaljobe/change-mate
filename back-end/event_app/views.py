from PIL import Image, ImageOps
from requests_oauthlib import OAuth1
from changemate_proj.settings import env
import requests
from django.shortcuts import render
from rest_framework.views import APIView
from user_app.views import TokenReq 
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import Event, EventSerializer, ICalSerializer, EventDetailsSerializer, EventCollaborationSerializer, EventAdminSerializer, EventCardSerializer
from profile_app.models import UserProfile
from interest_app.models import InterestCategory
from rest_framework import viewsets
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.db.models import Q
from django.db.models import F
from django.db.models.functions import Sqrt
from changemate_proj.utilities import ImageUploader



# views for all events
class EventsView(TokenReq):
    '''
    Access all events
    '''
    @swagger_auto_schema(
        operation_summary="Get events",
        operation_description="Retrieve events based on provided filters such as category, type, date, and location. If no filters provided, all events are returned.",
        responses={200: EventCardSerializer(many=True)},
        manual_parameters=[
            openapi.Parameter(name='category', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description='Category of the event'),
            openapi.Parameter(name='type', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description='Type of the event (virtual/in-person)'),
            openapi.Parameter(name='start_date', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description='Start of date range (format: YYYY-MM-DD)'),
            openapi.Parameter(name='end_date', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description='End of date range (format: YYYY-MM-DD)'),
            openapi.Parameter(name='location', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description='Location of the event'),
        ]
    )
    def get(self, request, *args, **kwargs):
        # get event object instances as baseline
        queryset = Event.objects.all()
        # get parameter values passed in request
        # if key doesn't exist returns None
        category = request.query_params.get('category')
        event_type = request.query_params.get('type')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        general = request.query_params.get('keyword')
        coordinates = request.query_params.get('coordinates')
        distance = request.query_params.get('distance')
        
    
        # case-insensitive partial match for filtering for location
        # event_type search will be exact match
        if event_type:
            queryset = queryset.filter(event_type=event_type)
          
        if category:
            queryset = queryset.filter(category__category__icontains=category)
         
        # if start and end dates given search for events in date range
        if start_date and end_date:
            queryset = queryset.filter(event_start__date__range=[start_date, end_date])
           
        #if no end date given search only for dates on start date
        if start_date and not end_date:
            queryset = queryset.filter(event_start__date=start_date)
         
        # search for events near location
        if coordinates:
            # split coordinates into lat and lon from array
            lat, lon = [float(coord) for coord in coordinates.strip("[]").split(",")]
            queryset = queryset.annotate(
            distance=Sqrt(
                (F('coordinates__0') - lat) ** 2.0 +
                (F('coordinates__1') - lon) ** 2.0
            )
        ).filter(distance__lte=distance)  

           
        # case-insensitive partical match for filtering for keywords in title, description, and category    
        if general:
            queryset = queryset.filter(
                Q(title__icontains=general) |
                Q(description__icontains=general) |
                Q(category__category__icontains=general)
                )
        
        
        # serialize data and return data and status 200
        ser_queryset = EventCardSerializer(queryset, many=True)
        return Response(ser_queryset.data, status=HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Create event",
        operation_description="Create a new event.",
        request_body=EventSerializer,
        responses={201: EventSerializer()},
    )
    def post(self, request):
        # create copy of request data
        data = request.data.copy()

        category_id = data["category"]
        category = InterestCategory.objects.get(id = category_id)

       
        try:
            new_event = Event.objects.create(
                title = data['title'],
                event_start = data['event_start'],
                event_end = data['event_end'],
                time_zone = data['time_zone'],
                event_type = data['event_type'],
                event_venue = data['event_venue'],
                event_venue_address = data['event_venue_address'],
                event_photo = "",
                description = data['description'],
                category = category,
                virtual_event_link = data['virtual_event_link'],
                location = data['location'], 
                coordinates = data['coordinates'],
                attendees_needed = data['attendees_needed'],
                )

            # set request user as host
            host = UserProfile.objects.get(user=request.user)
            new_event.hosts.set([host])

             # pulls image from request data and uploads to S3
            event_photo = data['event_photo']
            try:
                response = ImageUploader.upload_image(id=new_event.id, image=event_photo, folder='event_photos')
                new_event.event_photo = response
                print("Image uploaded successfully", response)
            except Exception as e:
                return Response(str(e), status=HTTP_400_BAD_REQUEST)

            new_event.full_clean()
            new_event.save()
            # serialize data
            ser_data = EventSerializer(new_event)
            return Response(ser_data.data, status=HTTP_201_CREATED)
        except ValidationError as e: 
            print(e.message_dict)
            return Response(e)
    

class AdminDetails(TokenReq):
    '''View a single event by ID with details for admin page'''
    @swagger_auto_schema(
        operation_summary="Admin Page Data",
        operation_description="Retrieve details of a specific event by its ID.",
        responses={200: EventAdminSerializer()},
    )
    def get(self, request, event_id):
        event = get_object_or_404(Event, id = event_id)
        ser_event = EventAdminSerializer(event)
        return Response(ser_event.data, status=HTTP_200_OK)

class CollabDetails(TokenReq):
    '''View a single event by ID with details for collaboration page'''
    @swagger_auto_schema(
        operation_summary="Collaboration Page Data",
        operation_description="Retrieve details of a specific event by its ID.",
        responses={200: EventCollaborationSerializer()},
    )
    def get(self, request, event_id):
        event = get_object_or_404(Event, id = event_id)
        ser_event = EventCollaborationSerializer(event)
        return Response(ser_event.data, status=HTTP_200_OK)


class AnEvent(APIView):
    '''View a single event by ID'''
    @swagger_auto_schema(
        operation_summary="Event details page data",
        operation_description="Retrieve details of a specific event by its ID.",
        responses={200: EventDetailsSerializer()},
    )
    def get(self, request, event_id):
        event = get_object_or_404(Event, id = event_id)
        ser_event = EventDetailsSerializer(event)
        return Response(ser_event.data, status=HTTP_200_OK)   



    @swagger_auto_schema(
    operation_summary="Update event details",
    operation_description="Update details of a specific event by its ID.",
    request_body=EventSerializer,
    responses={200: EventSerializer(), 400: "Error: Bad Request"},
    manual_parameters=[
        openapi.Parameter(
            name='host_invite',
            in_=openapi.IN_QUERY, 
            description='Indicate whether to add or remove a host from the event. If adding, provide the host ID and set to "add". If removing, provide the host ID and set the value to "remove".',
            type=openapi.TYPE_STRING,
            enum=['add', 'remove'], 
            required=False 
        ),
        openapi.Parameter(
            name='rsvp',
            in_=openapi.IN_QUERY, 
            description='Indicate the RSVP status for the event. Set to "yes" to add event to events_attending or "no" to remove from event from events_attending.',
            type=openapi.TYPE_STRING,
            enum=['yes', 'no'], 
            required=False 
        )
    ]
    )
    def put(self, request, event_id):
        event = get_object_or_404(Event, id = event_id)
        # Pull user id from logged in user
        user_id = request.user.id
        data = request.data.copy()
        #Pulls user data from data base
        user_data = get_object_or_404(UserProfile, user=user_id)

        # Checks if category is present in body
        if 'category' in data:
            data['category']
            category_id = data["category"]
            category = InterestCategory.objects.get(id = category_id)
            event.category = category
            data.pop('category')

        # Checks if hosts are present in body adds host to event
        if 'hosts' in data:
            host_data = get_object_or_404(UserProfile, id=data['hosts'])
            if data['host_invite'] == "add":
                #check if host already in event.hosts
                if host_data in event.hosts.all():
                    return Response({'errors': 'User is already a host'}, status=HTTP_400_BAD_REQUEST)
                host_id = data['hosts']
                host = UserProfile.objects.get(id=host_id)
                event.hosts.add(host)
                data.pop('hosts')
            elif data['host_invite'] == "remove":
                host_id = data['hosts']
                host = UserProfile.objects.get(id=host_id)
                event.hosts.remove(host)
                data.pop('hosts')


        # Checks if RSVP is present in body
        if 'rsvp' in data:
            # Checks if RSVP is yes or no
            if data['rsvp'] == "yes":
                # Adds user to events attending
                event.users_attending.add(user_data)
                data.pop('rsvp')
            elif data['rsvp'] == "no":
                # Removes user from events attending
                event.users_attending.remove(user_data)
                data.pop('rsvp')

        
        # Checks if image is present in body
        if 'image' in data:
            event_photo = data['event_photo']
            try:
                response = ImageUploader.upload_image(id=event.id, image=event_photo, folder='event_photos')
                data["event_photo"] = response
                print("Image uploaded successfully", response)
            except Exception as e:
                return Response(str(e), status=HTTP_400_BAD_REQUEST)
        
        # validate data and save
        updated_event = EventSerializer(event, data=data, partial=True)
        if updated_event.is_valid():
            updated_event.save()
            return Response(updated_event.data, status=HTTP_200_OK)
        else:
            print("Validation errors:", updated_event.errors)
            return Response({'errors': updated_event.errors}, status=HTTP_400_BAD_REQUEST)
    

    @swagger_auto_schema(
        operation_summary="Delete event",
        operation_description="Delete a specific event by its ID.",
        responses={204: "Event deleted successfully"},
    )       
    def delete(self, request, event_id):
        event = get_object_or_404(Event, id = event_id)
        event.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class ICalEvent(APIView):
    '''View a single event by ID'''
    @swagger_auto_schema(
        operation_summary="Retrieve event details for iCal",
        operation_description="Retrieve details of a specific event by its ID formatted for iCal.",
        responses={200: ICalSerializer()},
    )
    def get(self, request, event_id):
        event = get_object_or_404(Event, id = event_id)
        ser_event = ICalSerializer(event)
        return Response(ser_event.data, status=HTTP_200_OK)


