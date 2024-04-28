from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import Countries, CountriesListSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class CountriesView(APIView):
    '''Access all countries'''
    @swagger_auto_schema(
        operation_summary="Get all countries",
        operation_description="Retrieve a list of all countries",
        responses={200: CountriesListSerializer()}
        )
    def get(self, request):
        try:
            countries = Countries.objects.all()
            serializer = CountriesListSerializer(countries, many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=HTTP_400_BAD_REQUEST)
