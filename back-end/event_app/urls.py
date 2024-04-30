from django.urls import path, include
from .views import EventsView, DefautlEventIcon, ICalEvent, AnEvent, CollabDetails, AdminDetails

#create event app urls here 
urlpatterns = [
    path("", EventsView.as_view(), name="events_view"),
    path("<int:event_id>/", AnEvent.as_view(), name="an_event"),
    path("collaboration/<int:event_id>/", CollabDetails.as_view(), name="an_event"),
    path("admin/<int:event_id>/", AdminDetails.as_view(), name="an_event"),
    path('event_icon/', DefautlEventIcon.as_view(), name="noun_api"),
    path("<int:event_id>/iCal/", ICalEvent.as_view(), name="iCal_event"),
    path("<int:event_id>/volunteers/", include('volunteer_roles_app.urls')),
]
