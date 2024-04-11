from django.core.exceptions import ValidationError

def validate_event_type(event_type):
    if (event_type != "Virtual" or event_type != "In-person"):
        return "Please select a valid event type"
    return event_type

def validate_virtual_event(event_type, virtual_event_link):
    if (event_type == "Virtual"):
        if (virtual_event_link == None):
            return "Please enter a valid virtual event link"
        else:
            return virtual_event_link

def validate_event_location(event_type, event_venue, event_venue_address):
    if (event_type == "In-person"):
        if (event_venue == None or event_venue_address == None):
            return "Please enter valid venue location and address"
        else:
            return event_venue, event_venue_address
        