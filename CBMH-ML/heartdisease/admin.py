from django.contrib import admin
from .models import HeartDiseaseRequest, HeartDiseaseResponse, HeartDisease

# Register your models here.
admin.site.register(HeartDiseaseRequest)
admin.site.register(HeartDiseaseResponse)
 