from PIL import Image, ImageOps
from django.shortcuts import render
from user_app.views import TokenReq
import requests
from changemate_proj.settings import env
from requests_oauthlib import OAuth1
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)
from .serializers import UserProfile, UserProfileSerializer, DisplayNameSerializer, UserProfileSearchSerializer
from interest_app.serializers import InterestCategory
from user_app.serializers import AppUser
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from changemate_proj.utilities import ImageUploader

# User Profile views
class CurrentUserProfile(TokenReq):
    '''Access user profile for currently logged in user'''
    @swagger_auto_schema(
        operation_summary="Get current user's profile",
        operation_description="Retrieve the profile data of the currently authenticated user.",
        responses={200: UserProfileSerializer()},
    )
    def get(self, request):
        # get user profile 
        user_profile = get_object_or_404(UserProfile, user=request.user)
        # serialize user profile
        ser_profile = UserProfileSerializer(user_profile)
        # return serialized user profile data
        return Response(ser_profile.data, status=HTTP_200_OK)

class EditUserProfile(APIView):
    @swagger_auto_schema(
        operation_summary="Edit user profile",
        operation_description="Update the profile data of the currently authenticated user.",
        request_body=UserProfileSerializer,
        responses={200: UserProfileSerializer()},
    )
    def put(self, request): 
        user = get_object_or_404(AppUser, email=request.user)
        user_profile = get_object_or_404(UserProfile, user=user)
        data = request.data.copy()
        
        # Get the interests from the data and remove it from the data body
        interests_ids = data.pop('interests', [])  
        
        # pull the profile picture from data body
        
        profile_pic = data.get('image')
        if profile_pic:
            try:
                response = ImageUploader.upload_image(id=user.id, image=profile_pic, picture_type="profile")
                data["image"] = response
                print("Image uploaded successfully", response)
            except Exception as e:
                return Response(str(e), status=HTTP_400_BAD_REQUEST)
            
        edit_profile = UserProfileSerializer(instance=user_profile, data=data, partial=True)
        if edit_profile.is_valid():
            # Save the user profile first
            updated_profile = edit_profile.save()

           # Update the interests
            if interests_ids:
                updated_profile.interests.set(interests_ids)
            print(updated_profile)
            return Response(edit_profile.data, status=HTTP_200_OK)
        
        return Response(edit_profile.errors, status=HTTP_400_BAD_REQUEST)

        

@swagger_auto_schema(
        operation_summary="Get user's display name",
        operation_description="Retrieve the display name of the currently authenticated user.",
        responses={200: DisplayNameSerializer()},
    )
class DisplayName(TokenReq):
    # if authenticated get user info and return it with status 200
    def get(self, request):
        profile = get_object_or_404(UserProfile, user=request.user)
        display_name = DisplayNameSerializer(profile)
        return Response(display_name.data, status=HTTP_200_OK)
    
class UserProfileSearch(APIView):
    '''Search user profiles by email address'''

    @swagger_auto_schema(
        operation_summary="Search user profiles",
        operation_description="Search for user profiles by providing an email in the request body.",
        manual_parameters=[
            openapi.Parameter(
                'email', openapi.IN_QUERY,
                description="Email of the user to search for.",
                type=openapi.TYPE_STRING
            )
        ],
        responses={200: UserProfileSerializer(many=True)},
    )  
    def get(self, request, email):
        data = request.data.copy()
        # search for profiles with email
        profile = get_object_or_404(UserProfile, user__email=email)
        # serialize profiles
        ser_profiles = UserProfileSearchSerializer(profile)
        # return serialized profiles
        return Response(ser_profiles.data, status=HTTP_200_OK)






