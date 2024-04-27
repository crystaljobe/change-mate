from django.urls import path
from .views import CitiesView

urlpatterns = [
    path('<int:state_id>/', CitiesView.as_view(), name='cities_in_state'),]