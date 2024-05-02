from rest_framework import serializers
from .models import Countries

class CountriesSerializer(serializers.ModelSerializer):
    '''Serializer for Countries model storage'''
    class Meta:
        model = Countries
        fields = '__all__'

class CountriesListSerializer(serializers.ModelSerializer):
    '''Serializer for Countries model retrieval'''
    class Meta:
        model = Countries
        fields = ['name', 'flag_emoji']
