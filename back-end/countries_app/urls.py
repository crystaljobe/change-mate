from django.urls import path
from .views import CountriesView

urlpatterns = [
    path('', CountriesView.as_view(), name='countries'),
    ]