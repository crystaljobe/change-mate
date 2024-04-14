from django.core.exceptions import ValidationError
import re

def validate_category(category):
    regex = r'^[A-Za-z\&\']*'
    good_category = re.match(regex, category)
    if good_category and category != category.title():
        return category.title()
    elif good_category and category == category.title():
        return category
    
    raise ValidationError("Please enter a valid category consisting of only letters, numbers, and special characters (&)(').")
        

