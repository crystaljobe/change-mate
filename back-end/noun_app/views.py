from requests_oauthlib import OAuth1
from changemate_proj.settings import env
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

# Create your views here.
class ANounIcon(APIView):
    @swagger_auto_schema(
        operation_summary="Get noun project icon",
        operation_description="Retrieve a noun project icon by id.",
        responses={200: "Icon retrieved successfully."},
    )
    def get(self, request, id):
        api_key = env.get("API_KEY")
        secret_key = env.get("SECRET_KEY")
        auth = OAuth1(api_key, secret_key)
        endpoint = f"https://api.thenounproject.com/v2/icon/{id}?thumbnail_size=200"
        response = requests.get(endpoint, auth=auth)
        json_response = response.json()
        # print(json_response)
        # pp.pprint(json_response)
        if json_response.get("icon"):
            icon_url = json_response.get('icon').get("thumbnail_url")
            return Response(icon_url)
        return Response("This parameter doesn't exist within the noun project")