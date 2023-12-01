from django.contrib import admin
from .models import LiverDiseaseRequest, LiverDiseaseResponse, LiverDisease

# Register your models here.
admin.site.register(LiverDisease)
admin.site.register(LiverDiseaseRequest)
admin.site.register(LiverDiseaseResponse)