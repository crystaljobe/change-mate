from django.db import models

# Create your models here.
class Cities(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    state_id = models.ImageField()
    state_code = models.CharField(max_length=255)
    country_id = models.IntegerField()
    country_code = models.CharField(max_length=2)
    latitude = models.FloatField()
    longitude = models.FloatField()
    wikidataid = models.CharField(max_length=255)
    
