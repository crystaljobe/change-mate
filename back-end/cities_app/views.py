from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.views import APIView
from .serializers import Cities, CitiesListSerializer
from states_app.serializers import States, StatesSerializer
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class CitiesView(APIView):
    '''Access all cities'''
    @swagger_auto_schema(
        operation_summary="Get all cities in State",
        operation_description="Retrieve a list of all cities from given state",
        responses={200: CitiesListSerializer()}
        )
    def get(self, request, state_id):
        state = get_object_or_404(States, id=state_id)
        cities = get_list_or_404(Cities, state=state)

        serializer = CitiesListSerializer(cities, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
