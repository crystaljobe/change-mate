from .models import Cities
from rest_framework import serializers

class CitiesSerializer(serializers.ModelSerializer):
    '''Serializer for Cities model storage'''
    class Meta:
        model = Cities
        fields = '__all__'

class CitiesListSerializer(serializers.ModelSerializer):
    '''Serializer for Cities model retrieval'''
    class Meta:
        model = Cities
        fields = ['name']