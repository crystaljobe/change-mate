from django.urls import path
from .views import StatesView

urlpatterns = [
    path('<str:country_name>/', StatesView.as_view(), name='states_in_country'),
    ]