from rest_framework.serializers import ModelSerializer
from .models import Interest

# Interest categories serializer
class InterestCategorySerializer(ModelSerializer):
    class Meta:
        model = Interest
        fields = ["category"]

class InterestSerializer(ModelSerializer):
    class Meta:
        model = Interest
        exclude = ["user_profile"]
