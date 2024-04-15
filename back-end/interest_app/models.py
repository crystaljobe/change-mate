from django.db import models
from .validators import validate_category



# Create your models here.

# model for all interest categories
class InterestCategory(models.Model):
    category = models.CharField(
        max_length=50,
        unique=True,
        validators=[validate_category])




# # model for user assigned interests
# class UserInterest(models.Model):
#     # setup Foreign Key relationship with user profile 
#     user_profile = models.ForeignKey(
#         UserProfile, 
#         on_delete=models.CASCADE,
#         null=True,
#         related_name="user_profile_interests",
#         )
#     # setup One to One relationship with interest category model
#     interest = models.OneToOneField(
#         InterestCategory,
#         on_delete=models.CASCADE,
#         null=True,
#         related_name="user_interests",
#         )
    