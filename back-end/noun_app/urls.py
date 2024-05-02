from django.urls import path
from .views import ANounIcon

urlpatterns = [
    path('<int:id>/', ANounIcon.as_view(), name='a_noun_icon'),
]