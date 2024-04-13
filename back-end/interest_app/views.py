from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import Interest, InterestCategorySerializer, InterestSerializer
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)

# Interest Category App Views: 

# all interests view
class AllInterests(APIView):
    def get(self, request):
        try: 
            # if valid rquest get all interest categories, serialize data and return data & status 200
            categories = Interest.objects.all()
            ser_categories = InterestCategorySerializer(categories, many=True)
            return Response(ser_categories.data, status=HTTP_200_OK)
        # if not valid return error message and response 400
        except Exception as e: 
            return Response(e, status=HTTP_400_BAD_REQUEST)

# singular interest view
class An_Interest(APIView):
    # grab a single interest 
    def get(self, request, interest):
        try: 
            # if valid interest category serialize data and return it with status 200
            interest = Interest.objects.get(category = interest)
            ser_interest = InterestSerializer(interest)
            return Response(ser_interest.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)
        
    # add new interest category 
    def post(self, request, interest):
        # make a copy of the data 
        data = request.data.copy()
        # set interest to category key
        data['category'] = interest
        # serialize data 
        ser_data = InterestSerializer(data=data)
        # validate serialized category is valid
        if ser_data.is_valid(): 
            # if valid save new cat and return data and status 201
            ser_data.save()
            return Response(ser_new_interest.data, status=HTTP_201_CREATED)
        # else return error message and status 400
        else: 
            print(ser_data.errors)
            return Response(status=HTTP_400_BAD_REQUEST)

    def put(self, request, interest):
        try: 
            # get interest category by cat name 
            interest_cat = Interest.objects.get(category = interest)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)
        ser_interest_cat = InterestSerializer(interest_cat)
        if ser_interest_cat.is_valid():
            ser_interest_cat.save()
            return Response(ser_interest_cat.data, status=HTTP_200_OK)
        else: 
            return Response(ser_interest_cat.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, interest):
        # if interest is valid delete interest
        try: 
            interest = Interest.objects.get(category = interest)
            interest.delete()
            return Response(status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)
        
        
        
        
        