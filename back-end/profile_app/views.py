from PIL import Image, ImageOps
from django.shortcuts import render
from user_app.views import TokenReq
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)
from .serializers import UserProfile, UserInterestSerializer, UserProfileSerializer, DisplayNameSerializer, LocationFieldSerializer, ImgFieldSerializer
from interest_app.serializers import InterestCategory
from user_app.serializers import AppUser
from rest_framework.views import APIView

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

class EditUserProfile(APIView):
    # set interest categories to user profile
    # request should be sent as a list of interest category ids
    def put(self, request): 
        # create a copy of data 
        # get user associated profile
        user = get_object_or_404(AppUser, email = request.user)
        user_profile = get_object_or_404(UserProfile, user=user)
        data = request.data.copy()
        
        # get interest categories using interests key
        interests_ids = data.get('interests', [])

        try:
            interests = InterestCategory.objects.filter(id__in=interests_ids)
            user_profile.interests.set(interests)
            user_profile.location = data['location']
            user_profile.display_name = data['display_name']
            user_profile.full_clean()
            user_profile.save()
            ser_user_profile = UserProfileSerializer(user_profile)
            return Response(ser_user_profile.data, status=HTTP_200_OK)
        except Exception as e: 
            return Response(e, status=HTTP_400_BAD_REQUEST)
        

# method to grab user display name 
class DisplayName(TokenReq):
    # if authenticated get user info and return it with status 200
    def get(self, request):
        profile = get_object_or_404(UserProfile, user=request.user)
        display_name = DisplayNameSerializer(profile)
        return Response(display_name.data, status=HTTP_200_OK)

class ProfilePic(TokenReq):
    def post(self, request):
        try:
            with Image.open(request.data["file"]) as im:
                im.thumbnail((200,200))
                im.save(f'media/users/profile-pic-{request.user.id}.png')
                request.user.profile_pic = f'users/profile-pic-{request.user.id}.png'
                request.user.full_clean()
                request.user.save()
                return Response(status=HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(e, status=HTTP_400_BAD_REQUEST)
