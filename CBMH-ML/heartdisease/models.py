from django.db import models

# Create your models here.
# Tables for db

class HeartDisease(models.Model):

    age = models.IntegerField(null=True, blank=True, default=None)
    sex = models.IntegerField(null=True, blank=True, default=None)
    cp = models.IntegerField(null=True, blank=True, default=None)
    trestbps = models.IntegerField(null=True, blank=True, default=None)
    chol = models.IntegerField(null=True, blank=True, default=None)
    fbs = models.IntegerField(null=True, blank=True, default=None)
    restecg = models.IntegerField(null=True, blank=True, default=None)
    thalach = models.IntegerField(null=True, blank=True, default=None) 
    exang = models.IntegerField(null=True, blank=True, default=None)
    oldpeak = models.FloatField(null=True, blank=True, default=None)
    slope = models.IntegerField(null=True, blank=True, default=None)
    ca = models.IntegerField(null=True, blank=True, default=None)
    thal = models.IntegerField(null=True, blank=True, default=None)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date) 
    
class HeartDiseaseRequest(models.Model):
    age = models.IntegerField(null=True, blank=True, default=None)
    trestbps = models.IntegerField(null=True, blank=True, default=None)
    chol = models.IntegerField(null=True, blank=True, default=None)
    fbs = models.IntegerField(null=True, blank=True, default=None)
    thalach = models.IntegerField(null=True, blank=True, default=None)
    exang = models.IntegerField(null=True, blank=True, default=None)
    oldpeak = models.FloatField(null=True, blank=True, default=None)
    ca = models.IntegerField(null=True, blank=True, default=None)
    cp_0 = models.IntegerField(null=True, blank=True, default=None)
    cp_1 = models.IntegerField(null=True, blank=True, default=None)
    cp_2 = models.IntegerField(null=True, blank=True, default=None)
    cp_3 = models.IntegerField(null=True, blank=True, default=None)
    slope_0 = models.IntegerField(null=True, blank=True, default=None)
    slope_1 = models.IntegerField(null=True, blank=True, default=None)
    slope_2 = models.IntegerField(null=True, blank=True, default=None)
    thal_0 = models.IntegerField(null=True, blank=True, default=None)
    thal_1 = models.IntegerField(null=True, blank=True, default=None)
    thal_2 = models.IntegerField(null=True, blank=True, default=None)
    thal_3 = models.IntegerField(null=True, blank=True, default=None)
    restecg_0 = models.IntegerField(null=True, blank=True, default=None)
    restecg_1 = models.IntegerField(null=True, blank=True, default=None)
    restecg_2 = models.IntegerField(null=True, blank=True, default=None)
    sex_0 = models.IntegerField(null=True, blank=True, default=None)
    sex_1 = models.IntegerField(null=True, blank=True, default=None)
    prediction = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date)

class HeartDiseaseResponse(models.Model):
    prediction = models.CharField(max_length=200)
    probability = models.FloatField(null=True, blank=True, default=None)
    error = models.BooleanField()
    error_description = models.CharField(null=True, blank=True, max_length=500)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date) 

