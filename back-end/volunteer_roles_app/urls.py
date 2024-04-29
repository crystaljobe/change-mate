from django.urls import path
from .views import AllRoles, ARole

# paths for interest_app views for all interest categories and an interest category
urlpatterns = [
    path("", AllRoles.as_view(), name="all_volunteer_roles"),
    path("<int:role_id>/", ARole.as_view(), name="volunteer_role_by_id"),

]

