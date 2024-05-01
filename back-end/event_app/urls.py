from django.urls import path, include
from .views import EventsView, AnEvent, DefautlEventIcon, ICalEvent

#create event app urls here 
urlpatterns = [
    path("", EventsView.as_view(), name="events_view"),
    path("<int:event_id>/", AnEvent.as_view(), name="an_event"),
    path('event_icon/', DefautlEventIcon.as_view(), name="noun_api"),
    path("<int:event_id>/iCal/", ICalEvent.as_view(), name="iCal_event"),
    path("<int:event_id>/volunteers/", include('volunteer_roles_app.urls')),
    path("<int:event_id>/posts/", include('post_app.urls')),
  
]
