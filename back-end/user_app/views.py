from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.contrib.auth import login, logout, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from profile_app.models import UserProfile
from .serializers import AppUser

# Create your views here.

# Signup method for users to signup for the app
class SignUp(APIView):
    def post(self, request):
        # create a copy of data 
        data = request.data.copy() 

        # set user's email to username key so that username = user's email which ensures unique usernames since all emails are unique
        data["username"] = request.data.get("email") 
        # data["username"] = request.data.get("username", data.get("email"))

        # create the user instance
        new_user = AppUser.objects.create_user(**data)
        try:
            # test the data of new instance before saving
            new_user.full_clean()
            # set user password and save the instance
            new_user.set_password(data.get('password'))
            new_user.save()

            # set the user's auth token
            token = Token.objects.create(user = new_user) 
            
            # setup the user's associated profile instance
            profile = UserProfile.objects.create(user = new_user) 

            # log the new user in upon signup and return the users email, token, and 201 status
            login(request, new_user) 
            return Response({"user":new_user.email, "token":token.key}, status=HTTP_201_CREATED)
        
        # if try doesn't work print error 
        except ValidationError as e:
            print(e)
            return Response(e, status=HTTP_400_BAD_REQUEST)
    

class Login(APIView):
    def post(self, request):
        # create a copy of requested data 
        data = request.data.copy()
        
        # set username to user email
        data['username'] = request.data.get("username", request.data.get("email")) 
        
        # validate credentials and retrieve auth user object and set to auth_user
        auth_user = authenticate(username=data.get("username"), password=data.get("password")) 
        
        if auth_user: # if user authenticated
            login(request, auth_user)
            
            # grab/create token and returns a tupil with the object and boolean (T=item was create, F=item already existed and was grabbed)
            token, create = Token.objects.get_or_create(user = auth_user) 

            # return json response with token, email, and status 200
            return Response({"token": token.key, "user": auth_user.email}, status=HTTP_200_OK) 
        
        # if user not authenticated return response no client and status 400
        else:
            return Response("No client matching the credentials", status=HTTP_400_BAD_REQUEST) 

# create token required class to pass in other methods
class TokenReq(APIView): 
    authentication_classes=[TokenAuthentication]
    permission_classes = [IsAuthenticated]

# method to grab user data
# method will check for user authentication
class Info(TokenReq):
    # if authenticated get user info (email) and return it with status 200
    def get(self, request):
        try: 
            user = request.user
            return Response({"email": user.email}, status=HTTP_200_OK)
        except:
            return Response("Error logging out", status=HTTP_400_BAD_REQUEST) 

# method to logout user checking for user authentication first
class Logout(TokenReq):
    def post(self, request):
        # if user authenticated delete user token upon signout to require user to sign back in to access views
        request.user.auth_token.delete()
        logout(request)
        # return response 204 to show no content to confirm token deletion
        return Response(status=HTTP_204_NO_CONTENT)



            