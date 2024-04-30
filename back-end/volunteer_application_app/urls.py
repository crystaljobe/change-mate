from django.urls import path
from .views import AllApplications, AApplication

# paths for interest_app views for all interest categories and an interest category
urlpatterns = [
    path("<int:role_id>/", AllApplications.as_view(), name="create_new_application"),
    path("decision/<int:application_id>/", AApplication.as_view(), name="application_by_id"),
]

