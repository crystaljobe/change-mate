from django.urls import path
from .views import AllRoles

# paths for interest_app views for all interest categories and an interest category
urlpatterns = [
    path("<int:event_id>/", AllRoles.as_view(), name="all_volunteer_roles"),

]

