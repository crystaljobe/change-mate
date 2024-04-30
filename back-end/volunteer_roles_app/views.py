from changemate_proj.settings import env
from user_app.views import TokenReq 
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import CreateVolunteerRoleSerializer, VolunteerRole
from event_app.models import Event
from drf_yasg.utils import swagger_auto_schema



class AllRoles(TokenReq):
    '''Access all volunteer roles for the event'''
    @swagger_auto_schema(
        operation_summary="Create a new volunteer role for event",
        operation_description="Create a new volunteer role for selected event.",
        request_body=CreateVolunteerRoleSerializer,
        responses={201: CreateVolunteerRoleSerializer()},
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
        operation_summary="Edit a volunteer role by ID",
        operation_description="Edit a volunteer role by ID.",
        request_body=CreateVolunteerRoleSerializer,
        responses={200: CreateVolunteerRoleSerializer()},
    )
    def put(self, request, event_id, role_id):
        data = request.data.copy()
        # Serialize the role with the updated data
        role = get_object_or_404(VolunteerRole, pk=role_id)
        ser_role = CreateVolunteerRoleSerializer(role, data=data, partial=True)
        if ser_role.is_valid():
            ser_role.save()
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