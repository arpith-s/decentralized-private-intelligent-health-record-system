from django.urls import path
from .views import KidneyDisease, KidneyDiseaseDetails

urlpatterns = [
    path('', KidneyDisease.as_view(), name='kidneydisease-home'),
    path('cache/', KidneyDiseaseDetails.as_view(), name='kidneydisease-cache'),
]