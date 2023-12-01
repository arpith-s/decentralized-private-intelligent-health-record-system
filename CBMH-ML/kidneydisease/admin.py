from django.contrib import admin
from .models import KidneyDiseaseRequest, KidneyDiseaseResponse, KidneyDisease

admin.site.register(KidneyDisease)
admin.site.register(KidneyDiseaseRequest)
admin.site.register(KidneyDiseaseResponse)
