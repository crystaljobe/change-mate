from django.urls import path
from .views import EventsView, AnEvent, DefautlEventIcon

#create event app urls here 
urlpatterns = [
    path("", EventsView.as_view(), name="events_view"),
    path("<int:event_id>/", AnEvent.as_view(), name="an_event"),
    path('event_icon/', DefautlEventIcon.as_view(), name="noun_api"),
]
