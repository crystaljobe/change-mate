from PIL import Image, ImageOps
from requests_oauthlib import OAuth1
from changemate_proj.settings import env
import requests
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
from .serializers import VolunteerRoleSerializer
from profile_app.models import UserProfile
from event_app.models import Event
from rest_framework import viewsets
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.db.models import Q


class AllRoles(TokenReq):
    '''
    Access all Volunteer roles for a given event
    '''
    @swagger_auto_schema(
        operation_summary="View all volunteer roles for event",
        operation_description="View all volunteer roles for selected event.",
        request_body=VolunteerRoleSerializer,
        responses={200: VolunteerRoleSerializer()},
    )
    def get(self, request, event_id):
        pass