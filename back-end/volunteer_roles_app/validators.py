from django.core.exceptions import ValidationError
from django.db import IntegrityError

def validate_no_duplicates(instance, volunteer_ids):
    existing_volunteer_ids = instance.assigned_volunteer.values_list('id', flat=True)
    duplicates = [volunteer_id for volunteer_id in volunteer_ids if volunteer_id in existing_volunteer_ids]
    if duplicates:
        raise ValidationError(f"Duplicate volunteer IDs found: {duplicates}")
