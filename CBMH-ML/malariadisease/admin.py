from django.contrib import admin
from .models import MalariaDiseaseBase,MalariaDiseaseResponse

# Register your models here.
admin.site.register(MalariaDiseaseBase)
admin.site.register(MalariaDiseaseResponse)
