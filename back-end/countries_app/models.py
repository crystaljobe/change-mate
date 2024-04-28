from django.db import models

# Create your models here.
class Countries(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    country_code = models.CharField(max_length=3)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    flag_emoji = models.TextField(max_length=255)
    #states - contains states instances - related name from States model



