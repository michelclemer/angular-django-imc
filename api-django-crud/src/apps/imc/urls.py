from django.urls import include, path
from rest_framework import routers

from .views import IMCViewSet

router = routers.DefaultRouter()
router.register(r'', IMCViewSet)

urlpatterns = [
    path('', include(router.urls)),
]