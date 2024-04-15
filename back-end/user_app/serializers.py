from rest_framework.serializers import ModelSerializer
from .models import AppUser

class AppUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = ["email", "password"]

class NewUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = ["id"]