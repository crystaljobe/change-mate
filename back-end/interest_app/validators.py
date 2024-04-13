from django.core.exceptions import ValidationError
import re

def validate_category(category):
    regex = r'^[A-Za-z\&\']*'
    good_category = re.match(regex, category)
    if good_category:
        return category.title()
    raise ValidationError("Please enter a valid category consisting of only letters, numbers, and special characters (&)(').")
        

