from django.urls import path
from .views import UserProfile, AProfileField, DisplayName

# profile app urls 
urlpatterns = [
     path("user_profile/", UserProfile.as_view(), name="user_profile"),
     path("add_profile_fields", UserProfile.as_view(), name="add_profile_data"),
     path("edit_profile_field/<str:field>/", AProfileField.as_view(), name="edit_profile"),
     path("display_name/", DisplayName.as_view(), name="display_name"),
]
