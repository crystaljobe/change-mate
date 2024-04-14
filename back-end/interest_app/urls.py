from django.urls import path
from .views import AllInterests, An_Interest

# paths for interest_app views for all interest categories and an interest category
urlpatterns = [
    path("", AllInterests.as_view(), name="all_interest_categories"),
    path("<str:interest>/", An_Interest.as_view(), name="an_interest"),
]

