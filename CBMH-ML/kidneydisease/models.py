from django.db import models

# Create your models here.
# Tables for db
class KidneyDisease(models.Model):
    age = models.FloatField(null=True, blank=True, default=None)
    bp = models.FloatField(null=True, blank=True, default=None)
    sg = models.FloatField(null=True, blank=True, default=None)
    al = models.FloatField(null=True, blank=True, default=None)
    su = models.FloatField(null=True, blank=True, default=None)
    rbc = models.CharField(max_length=100)
    pc = models.CharField(max_length=100)
    pcc = models.CharField(max_length=100)
    ba = models.CharField(max_length=100)
    bgr = models.FloatField(null=True, blank=True, default=None)
    bu = models.FloatField(null=True, blank=True, default=None)
    sc = models.FloatField(null=True, blank=True, default=None)
    sod = models.FloatField(null=True, blank=True, default=None)
    pot = models.FloatField(null=True, blank=True, default=None)
    hemo = models.FloatField(null=True, blank=True, default=None)
    pcv = models.FloatField(null=True, blank=True, default=None)
    wc = models.FloatField(null=True, blank=True, default=None)
    rc = models.FloatField(null=True, blank=True, default=None)
    htn = models.CharField(max_length=100)
    dm = models.CharField(max_length=100)
    cad = models.CharField(max_length=100)
    appet = models.CharField(max_length=100)
    pe = models.CharField(max_length=100)
    ane = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date)

class KidneyDiseaseRequest(models.Model):
    age = models.FloatField(null=True, blank=True, default=None)
    bp = models.FloatField(null=True, blank=True, default=None)
    sg = models.FloatField(null=True, blank=True, default=None)
    al = models.FloatField(null=True, blank=True, default=None)
    su = models.FloatField(null=True, blank=True, default=None)
    rbc = models.FloatField(null=True, blank=True, default=None)
    pc = models.FloatField(null=True, blank=True, default=None)
    pcc = models.FloatField(null=True, blank=True, default=None)
    ba = models.FloatField(null=True, blank=True, default=None)
    bgr = models.FloatField(null=True, blank=True, default=None)
    bu = models.FloatField(null=True, blank=True, default=None)
    sc = models.FloatField(null=True, blank=True, default=None)
    sod = models.FloatField(null=True, blank=True, default=None)
    pot = models.FloatField(null=True, blank=True, default=None)
    hemo = models.FloatField(null=True, blank=True, default=None)
    pcv = models.FloatField(null=True, blank=True, default=None)
    wc = models.FloatField(null=True, blank=True, default=None)
    rc = models.FloatField(null=True, blank=True, default=None)
    htn = models.FloatField(null=True, blank=True, default=None)
    dm = models.FloatField(null=True, blank=True, default=None)
    cad = models.FloatField(null=True, blank=True, default=None)
    appet = models.FloatField(null=True, blank=True, default=None)
    pe = models.FloatField(null=True, blank=True, default=None)
    ane = models.FloatField(null=True, blank=True, default=None)
    prediction = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date)

class KidneyDiseaseResponse(models.Model):
    prediction = models.CharField(max_length=200)
    probability = models.FloatField(null=True, blank=True, default=None)
    error = models.BooleanField()
    error_description = models.CharField(null=True, blank=True, max_length=500)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date) 

