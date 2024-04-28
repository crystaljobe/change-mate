from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import States, StatesListSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.shortcuts import get_list_or_404

class StatesView(APIView):
    '''Access all states'''
    @swagger_auto_schema(
        operation_summary="Get all states in Country",
        operation_description="Retrieve a list of all states from given country",
        responses={200: StatesListSerializer()}
        )
    def get(self, request, country_name):
            states = get_list_or_404(States, country__name=country_name)
            serializer = StatesListSerializer(states, many=True)
            return Response(serializer.data, status=HTTP_200_OK)

