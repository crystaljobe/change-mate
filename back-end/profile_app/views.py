from django.shortcuts import render
from user_app.views import TokenReq
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)
from .serializers import UserProfile, UserProfileSerializer, DisplayNameSerializer, LocationFieldSerializer, ImgFieldSerializer
from interest_app.serializers import InterestCategory

# User Profile views
class CurrentUserProfile(TokenReq):
    # get a user's profile data 
    def get(self, request):
        # get user profile 
        user_profile = get_object_or_404(UserProfile, user=request.user)
        # serialize user profile
        ser_profile = UserProfileSerializer(user_profile)
        # return serialized user profile data
        return Response(ser_profile.data, status=HTTP_200_OK)

    # set interest categories to user profile
    def post(self, request): 
        # create a copy of data 
        data = request.data.copy()
        # get interest categories using interests key, if key is not present use empty list as default
        interests_ids = data.get('interests', [])
        # get user associated profile
        user_profile = get_object_or_404(UserProfile, user=request.user)
        
        try:
            interests = InterestCategory.objects.filter(id__in=interests_ids)
            user_profile.interests.set(interests)
            user_profile.save()
            return Response(UserProfileSerializer(user_profile).data, status=HTTP_200_OK)
        except Exception as e: 
            return Response(e, status=HTTP_400_BAD_REQUEST)
        

# update user's profile data based on passed data field
# update all criteria regardless if it's changed
class AProfileField(TokenReq):
    def put(self, request, field):
        # create copy of data
        data = request.data.copy()
        
        # get user profile 
        profile = get_object_or_404(UserProfile, user=request.user)

        # match case to determine profile field to update
        # if display name field use display name serializer and return updated data
        if field == "display_name":
            profile.display_name = data['display_name']
            ser_data = DisplayNameSerializer(profile, data=data)
            
        # if location field use location field serializer  
        elif field == "location":
            profile.set_location(data['location']) 
            ser_data = LocationFieldSerializer(profile, data=data)
            
        # if image field use img field serializer 
        elif field == "image":
            profile.image = data['image']
            ser_data = ImgFieldSerializer(profile, data=data)
        else:
            return Response("Invalid user profile field")
            
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=HTTP_200_OK)
        else: 
            return Response("Invalid data input", HTTP_400_BAD_REQUEST)

# method to grab user display name 
class DisplayName(TokenReq):
    # if authenticated get user info and return it with status 200
    def get(self, request):
        profile = get_object_or_404(UserProfile, user=request.user)
        display_name = DisplayNameSerializer(profile)
        return Response(display_name.data, status=HTTP_200_OK)

