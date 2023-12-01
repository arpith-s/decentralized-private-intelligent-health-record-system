from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="CBMH APIs",
      default_version='v1',
      description="ML Backend for the CBMH Project",
    #   terms_of_service="https://www.google.com/policies/terms/",
    #   contact=openapi.Contact(email="contact@snippets.local"),
    #   license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
   path('documentation/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('realtime/', include('realtime.urls')),
   path('heartdisease/', include('heartdisease.urls')),
   path('kidneydisease/', include('kidneydisease.urls')),
   path('liverdisease/', include('liverdisease.urls')),
   path('malariadisease/', include('malariadisease.urls')),
]
