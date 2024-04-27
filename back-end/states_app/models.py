from django.db import models


class States(models.Model):
    id= models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    state_code = models.CharField(max_length=255)
    country_id = models.IntegerField()
    country_code = models.CharField(max_length=2)
    type = models.CharField(max_length=255)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    