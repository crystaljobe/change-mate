from .models import Cities
from rest_framework import serializers

class CitiesSerializer(serializers.ModelSerializer):
    '''Serializer for Cities model storage'''
    state = serializers.SerializerMethodField()

    class Meta:
        model = Cities
        fields = '__all__'

    def get_state(self, obj):
        return obj.state.name

class CitiesListSerializer(serializers.ModelSerializer):
    '''Serializer for Cities model retrieval'''
    class Meta:
        model = Cities
        fields = ['id','name']