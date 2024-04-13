from django.shortcuts import render
from user_app.views import TokenReq
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import UserProfile, UserProfileSerializer, DisplayNameSerializer, LocationFieldSerializer, ImgFieldSerializer
from interest_app.serializers import InterestCategorySerializer

# User Profile views
class UserProfile(TokenReq):
    # get a user's profile data 
    def get(self, request):
        # get user profile
        user_profile = UserProfile.objects.get(user = request.user) 
        # serialize user profile
        ser_profile = UserProfileSerializer(user_profile)
        # return serialized user profile data
        return Response(ser_profile.data, status=HTTP_200_OK)

    # update user profile data 
    def put(self, request): 
        # create a copy of data 
        data = request.data.copy()
        # get user associated profile
        data['user'] = request.user.id
        # deserialize user profile data to store
        ser_data = UserProfileSerializer(data = data)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=HTTP_201_CREATED)
        else: 
            return Response(ser_data.errors, status=HTTP_400_BAD_REQUEST)
        

# update user's profile data based on passed data field
# update all criteria regardless if it's changed
class AProfileField(TokenReq):
    def put(self, request, profile_field):
        # create copy of data
        data = request.data.copy()
        
        # get user profile 
        profile = UserProfile.objects.get(user = request.user)

        # match case to determine profile field to update
        match profile_field:
            # if display name field use display name serializer and return updated data
            case "display_name":
                ser_data = DisplayNameSerializer(profile, data = data)
            # if interest field use interest field serializer  
            case "interest":
                ser_data = InterestCategorySerializer(profile, data=data)
                
            # if location field use location field serializer  
            case "location":
                ser_data = LocationFieldSerializer(profile, data=data)
            # if image field use img field serializer 
            case "image":
                ser_data = ImgFieldSerializer(profile, data=data)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=HTTP_200_OK)
        else: 
            return Response("Invalid data input", HTTP_400_BAD_REQUEST)
        

# method to grab user display name 
class DisplayName(TokenReq):
    # if authenticated get user info and return it with status 200
    def get(self, request):
        return Response({"display name": request.user.display_name}, status=HTTP_200_OK)

