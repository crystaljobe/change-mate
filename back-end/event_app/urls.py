from django.urls import path
from .views import EventsView, AnEvent, EventByCollaborators

#create event app urls here 
urlpatterns = [
    path("", EventsView.as_view(), name="events_view"),
    path("<int:event_id>/", AnEvent.as_view(), name="an_event"),
    path("events_by_collaborators/", EventByCollaborators.as_view(), name="events_by_collaborators"),
]
