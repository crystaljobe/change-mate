from rest_framework import serializers
from .models import States

class StatesSerializer(serializers.ModelSerializer):
    '''Serializer for States model storage'''
    country = serializers.SerializerMethodField()
    
    class Meta:
        model = States
        fields = '__all__'

    def get_country(self, obj):
        return obj.country.name

class StatesListSerializer(serializers.ModelSerializer):
    '''Serializer for States model retrieval'''
    class Meta:
        model = States
        fields = ['name']