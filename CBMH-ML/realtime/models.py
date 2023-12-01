from django.db import models

# Create your models here.
# Tables for db

class Realtime(models.Model):

    prediction = models.CharField(max_length=200)
    tasks = models.CharField(max_length=1000)
    probability = models.FloatField(null=True, blank=True, default=None)
    error = models.BooleanField()
    error_description = models.CharField(null=True, blank=True, max_length=500)
    
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.prediction 