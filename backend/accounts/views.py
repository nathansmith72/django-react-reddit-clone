from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import permissions
from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin, CreateModelMixin
from rest_framework.viewsets import GenericViewSet

from accounts.models import User
from accounts.serializers import UserSerializer, CreateUserSerializer


class IsUser(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj == request.user


class UserViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    serializer_action_classes = {
        'create': CreateUserSerializer
    }
    permission_classes = [IsUser]

    def get_serializer_class(self):
        try:
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter