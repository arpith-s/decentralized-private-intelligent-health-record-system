from django.urls import path
from .views import LiverDisease, LiverDiseaseDetails

urlpatterns = [
    path('', LiverDisease.as_view(), name='liverdisease-home'),
    path('cache/', LiverDiseaseDetails.as_view(), name='liverdisease-cache'),
]  