from requests_oauthlib import OAuth1
from changemate_proj.settings import env
from user_app.views import TokenReq 
from rest_framework.response import Response
from django.db import IntegrityError
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import CreateVolunteerRoleSerializer, AssignVolunteerRoleSerializer, VolunteerRole
from event_app.models import Event
from drf_yasg.utils import swagger_auto_schema



class AllRoles(TokenReq):
    '''
    Access all Volunteer roles for a given event
    '''
    @swagger_auto_schema(
        operation_summary="View all volunteer roles for event",
        operation_description="View all volunteer roles for selected event.",
        responses={200: AssignVolunteerRoleSerializer()},
    )
    def get(self, request, event_id):
        roles = get_list_or_404(VolunteerRole, event=event_id)
        serializer = AssignVolunteerRoleSerializer(roles, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    

    @swagger_auto_schema(
        operation_summary="Create a new volunteer role for event",
        operation_description="Create a new volunteer role for selected event.",
        request_body=CreateVolunteerRoleSerializer,
        responses={201: AssignVolunteerRoleSerializer()},
    )
    def post(self, request, event_id):
        event = get_object_or_404(Event, pk=event_id)
        data = request.data.copy()
        data['event'] = event_id
        serializer = CreateVolunteerRoleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    

class ARole(TokenReq):
    '''
    Access a volunteer role by ID
    '''
    @swagger_auto_schema(
        operation_summary="View a volunteer role by ID",
        operation_description="View a volunteer role by ID.",
        responses={200: AssignVolunteerRoleSerializer()},
    )
    def get(self, request, event_id, role_id):
        role = get_object_or_404(VolunteerRole, pk=role_id)
        serializer = AssignVolunteerRoleSerializer(role)
        return Response(serializer.data, status=HTTP_200_OK)


    @swagger_auto_schema(
        operation_summary="Edit a volunteer role by ID",
        operation_description="Edit a volunteer role by ID.",
        request_body=AssignVolunteerRoleSerializer,
        responses={200: AssignVolunteerRoleSerializer()},
    )
    def put(self, request, event_id, role_id):
        data = request.data.copy()
        # Retrieve the list of assigned volunteers and remove from data to work with separately
        volunteer_ids = data.pop('assigned_volunteers', [])
        
        # Get the role to edit
        role = get_object_or_404(VolunteerRole, pk=role_id)

        # Serialize the role with the updated data
        ser_role = AssignVolunteerRoleSerializer(role, data=data, partial=True)
        if ser_role.is_valid():
            edited_role = ser_role.save()

            # set updated list of assigned volunteers
            if volunteer_ids:
                try:
                    edited_role.assigned_volunteers.set(volunteer_ids)
                except IntegrityError as e:
                        # Extract the user ID from the error message
                        error_message = str(e)
                        user_id = error_message.split('=')[-1].split(')')[0].strip("()")
                        return Response(f"Volunteer Not Added: No User Profile found with ID {user_id}.", status=HTTP_400_BAD_REQUEST)

            return Response(ser_role.data, status=HTTP_200_OK)
        return Response(ser_role.errors, status=HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        operation_summary="Delete a volunteer role by ID",
        operation_description="Delete a volunteer role by ID.",
        responses={204: "No Content"},
    )
    def delete(self, request, event_id, role_id):
        role = get_object_or_404(VolunteerRole, pk=role_id)
        role_name = role.role
        role_event = role.event.title
        role.delete()
        return Response(f"{role_name}, was successfully deleted from {role_event}", status=HTTP_204_NO_CONTENT)