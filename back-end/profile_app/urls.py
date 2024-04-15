from django.urls import path
from .views import CurrentUserProfile, AProfileField, DisplayName

# profile app urls 
urlpatterns = [
     path("", CurrentUserProfile.as_view(), name="user_profile"),
     path("user_interests/", CurrentUserProfile.as_view(), name="user_interests"),
     path("edit_profile_field/<str:field>/", AProfileField.as_view(), name="edit_profile"),
     path("display_name/", DisplayName.as_view(), name="display_name"),
]
