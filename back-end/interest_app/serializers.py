from rest_framework.serializers import ModelSerializer
from .models import InterestCategory

# Interest categories serializer
class InterestCategorySerializer(ModelSerializer):
    class Meta:
        model = InterestCategory
        fields = ["category"]
