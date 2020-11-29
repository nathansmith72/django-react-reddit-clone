from dj_rest_auth.views import PasswordResetConfirmView
from django.urls import path, include
from rest_framework import routers

from accounts.views import UserViewSet, GoogleLogin

router = routers.DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('rest-auth/', include('dj_rest_auth.urls'))
]