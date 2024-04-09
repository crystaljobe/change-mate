from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class AppUser(AbstractUser):
    email = models.EmailField(unique = True)
    USERNAME_FIELD = 'email'
    display_name = models.CharField(
        max_length=40,
        )
    REQUIRED_FIELDS = [display_name]