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
from .serializers import Event, EventSerializer
from profile_app.models import UserProfile
from interest_app.models import InterestCategory

# views for all events
class EventsView(TokenReq):
    # get events based on passed queryset where filters include: Category, Type (virtual/in-person), Date, Location
    # if no filters provided all events returned
    def get(self, request, *args, **kwargs):
        # get event object instances as baseline
        queryset = Event.objects.all()
        # get parameter values passed in request
        # if key doesn't exist returns None
        category = request.query_params.get('category')
        event_type = request.query_params.get('type')
        event_date = request.query_params.get('date')
        location = request.query_params.get('location')

        if category:
            queryset = queryset.filter(category=category)
        if event_type:
            queryset = queryset.filter(type=event_type)
        if event_date:
            queryset = queryset.filter(date=event_date)
        # case-insensitive partial match for filtering for location
        if location:
            queryset = queryset.filter(location__icontains=location) 

        # serialize data and return data and status 200
        ser_queryset = EventSerializer(queryset, many=True)
        return Response(ser_queryset.data, status=HTTP_200_OK)

    # create new event
    def post(self, request):
        # create copy of request data
        data = request.data.copy()

        category_id = data["category"]
        category = InterestCategory.objects.get(id = category_id)
        try:
            new_event = Event.objects.create(
                title = data['title'],
                date = data['date'],
                time = data['time'],
                time_zone = data['time_zone'],
                event_type = data['event_type'],
                event_venue = data['event_venue'],
                event_venue_address = data['event_venue_address'],
                description = data['description'],
                category = category,
                )

            # set request user as collaborator
            collaborator = UserProfile.objects.get(user=request.user)
            new_event.collaborators.set([collaborator])

            new_event.full_clean()
            new_event.save()
            # serialize data
            ser_data = EventSerializer(new_event)
            return Response(ser_data.data, status=HTTP_201_CREATED)
        except ValidationError as e: 
            print(e.message_dict)
            return e
    
# views for a singular event
class AnEvent(APIView):
    # get event details
    def get(self, request, event_id):
        event = get_object_or_404(Event, id = event_id)
        ser_event = EventSerializer(event)
        return Response(ser_event.data, status=HTTP_200_OK)

    # edit event details
    def put(self, request, event_id):
        event = get_object_or_404(Event, id = event_id)
        data = request.data.copy()
        category_id = data["category"]
        category = InterestCategory.objects.get(id = category_id)
        event.category = category
        
        print(event)
        data.pop('category')
        updated_event = EventSerializer(event, data=data, partial=True)
        print(updated_event)
        if updated_event.is_valid():
            updated_event.save()
            return Response(updated_event.data, status=HTTP_200_OK)
        return Response(updated_event.error_messages, status=HTTP_400_BAD_REQUEST)
            
    # delete event 
    def delete(self, request, event_id):
        event = get_object_or_404(Event, id = event_id)
        event.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class DefautlEventIcon(APIView):
     def get(self, request):
        api_key = env.get("API_KEY")
        secret_key = env.get("SECRET_KEY")
        auth = OAuth1(api_key, secret_key)
        endpoint = f"https://api.thenounproject.com/v2/icon/5130800?thumbnail_size=200"
        response = requests.get(endpoint, auth=auth)
        json_response = response.json()
        # print(json_response)
        # pp.pprint(json_response)
        if json_response.get("icon"):
            icon_url = json_response.get('icon').get("thumbnail_url")
            return Response(icon_url)
        return Response("This parameter doesn't exist within the noun project")