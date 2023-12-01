from django.urls import path
from .views import HeartDisease, HeartDiseaseDetails

urlpatterns = [
    path('', HeartDisease.as_view(), name='heartdisease-home'),
    path('cache/', HeartDiseaseDetails.as_view(), name='heartdisease-data'),
]