from django.urls import path
from .views import CurrentUserProfile,  DisplayName, ProfilePic, EditUserProfile

# profile app urls 
urlpatterns = [
     path("", CurrentUserProfile.as_view(), name="user_profile"),
     path("edit_profile/", EditUserProfile.as_view(), name="edit_profile"),
     path("display_name/", DisplayName.as_view(), name="display_name"),
]
