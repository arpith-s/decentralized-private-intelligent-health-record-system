from django.urls import path
from .views import MalariaDisease

urlpatterns = [
    path('', MalariaDisease.as_view()),
    # path('cache/', MalariaDiseaseDetails.as_view())
]  