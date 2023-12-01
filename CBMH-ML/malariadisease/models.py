from django.db import models

class MalariaDiseaseBase(models.Model):
    image = models.ImageField()

    def __str__(self):
        return self.image.name

class MalariaDiseaseResponse(models.Model):
    prediction = models.CharField(max_length=200)
    probability = models.FloatField(null=True, blank=True, default=None)
    error = models.BooleanField()
    error_description = models.CharField(null=True, blank=True, max_length=500)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date) 