from django.urls import path
from .views import RealtimeAPIView, RealtimeDetailAPIView
from django.views.generic import TemplateView


urlpatterns = [
    path('', RealtimeAPIView.as_view(), name='realtime-home'),
    path('cache/', RealtimeDetailAPIView.as_view(), name='realtime-data'),
    
    path('swagger-ui/', TemplateView.as_view(
        template_name='doc.html',
        extra_context={'schema_url':'schema'}
    ), name='swagger-ui'),
]