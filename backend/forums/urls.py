from django.urls import path, include
from rest_framework import routers

from forums.views import PostViewSet

router = routers.DefaultRouter()
router.register(r'', PostViewSet)

urlpatterns = [
    path('posts/', include(router.urls)),
]