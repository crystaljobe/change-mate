from rest_framework.serializers import ModelSerializer
from .models import InterestCategory

# InterestCategory categories serializer to return category 
class InterestCategorySerializer(ModelSerializer):
    class Meta:
        model = InterestCategory
        fields = ["id", "category"]


