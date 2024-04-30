from django.core.exceptions import ValidationError

def validate_event_type(event_type):
    if (event_type != "Virtual" or event_type != "In-person"):
        return "Please select a valid event type"
    return event_type

