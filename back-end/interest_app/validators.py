from django.core.exceptions import ValidationError

def validate_title_case(category):
    if category != category.title():
        raise ValidationError('Interest category must be in title format')
    else:
        return category