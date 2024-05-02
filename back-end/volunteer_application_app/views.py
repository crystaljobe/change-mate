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
from .serializers import VolunteerApplication, ApplicationSerializer, ApplicationDecisionSerializer
from drf_yasg.utils import swagger_auto_schema
from django.utils.timezone import now
from drf_yasg import openapi


class AllApplications(TokenReq):
    '''Access all Volunteer Applications for a given event'''
    
    @swagger_auto_schema(
            operation_summary="Create new volunteer application for event role",
            operation_description="Create new volunteer application for event role.",
            request_body=ApplicationSerializer,
            responses={201: ApplicationSerializer()},
    )
    def post(self, request, role_id):
        '''Create a new volunteer application for event'''
        data = request.data.copy()
        applicant = request.user.id
        data['volunteer_role'] = role_id
        data['applicant'] = applicant
        serializer = ApplicationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    

class AApplication(TokenReq):
    '''Access a volunteer application by ID'''
    
    @swagger_auto_schema(
            operation_summary="Get a volunteer application by ID",
            operation_description="Retrieve a volunteer application by ID.",
            responses={200: ApplicationSerializer()},
    )
    def get(self, request, application_id):
        '''Retrieve a volunteer application by ID'''
        application = get_object_or_404(VolunteerApplication, pk=application_id)
        serializer = ApplicationSerializer(application)
        return Response(serializer.data, status=HTTP_200_OK)

    @swagger_auto_schema(
    operation_summary="Approve/Deny volunteer application status",
    operation_description="Update volunteer application status with True or False.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['decision'],
        properties={
            'decision': openapi.Schema(
                type=openapi.TYPE_BOOLEAN,
                description="Boolean value indicating approval (True) or denial (False) of the application."
            )
        }
    ),
    responses={200: ApplicationDecisionSerializer()}
    )
    def put(self, request, application_id):
        '''Update a volunteer application status'''
        data = request.data.copy()
        approver = request.user
        data['decision_made_by'] = approver.id
        data['decision_date'] = now()
        print(data)
        application = get_object_or_404(VolunteerApplication, pk=application_id)

        serializer = ApplicationDecisionSerializer(application, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
            operation_summary="Delete a volunteer application by ID",
            operation_description="Delete a volunteer application by ID.",
            responses={204: "No Content"},
    )
    def delete(self, request, application_id):
        '''Delete a volunteer application'''
        application = get_object_or_404(VolunteerApplication, pk=application_id)
        application.delete()
        return Response(status=HTTP_204_NO_CONTENT)