from django.db import models

# Create your models here.
# Tables for db

class LiverDisease(models.Model):
    age = models.FloatField(null=True, blank=True, default=None)
    gender = models.CharField(max_length=100)
    total_bilirubin = models.FloatField(null=True, blank=True, default=None)
    direct_bilirubin = models.FloatField(null=True, blank=True, default=None)
    alkaline_phosphotase = models.FloatField(null=True, blank=True, default=None)
    alamine_aminotransferase = models.FloatField(null=True, blank=True, default=None)
    aspartate_aminotransferase = models.FloatField(null=True, blank=True, default=None)
    total_protiens = models.FloatField(null=True, blank=True, default=None)
    albumin = models.FloatField(null=True, blank=True, default=None)
    albumin_and_globulin_ratio = models.FloatField(null=True, blank=True, default=None)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date)

class LiverDiseaseRequest(models.Model):
    age = models.FloatField(null=True, blank=True, default=None)
    gender = models.FloatField(null=True, blank=True, default=None)
    total_bilirubin = models.FloatField(null=True, blank=True, default=None)
    direct_bilirubin = models.FloatField(null=True, blank=True, default=None)
    alkaline_phosphotase = models.FloatField(null=True, blank=True, default=None)
    alamine_aminotransferase = models.FloatField(null=True, blank=True, default=None)
    aspartate_aminotransferase = models.FloatField(null=True, blank=True, default=None)
    total_protiens = models.FloatField(null=True, blank=True, default=None)
    albumin = models.FloatField(null=True, blank=True, default=None)
    albumin_and_globulin_ratio = models.FloatField(null=True, blank=True, default=None)
    prediction = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date)

class LiverDiseaseResponse(models.Model):
    prediction = models.CharField(max_length=200)
    probability = models.FloatField(null=True, blank=True, default=None)
    error = models.BooleanField()
    error_description = models.CharField(null=True, blank=True, max_length=500)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date) 

