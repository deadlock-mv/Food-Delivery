from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from app_auth.views import RegisterAPIView, LogOutAPIView, MyTokenObtainPairView

urlpatterns = [
    path('api/login/', MyTokenObtainPairView.as_view(), name='login_view'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh_view'),

    path('api/register/', RegisterAPIView.as_view()),
    path('api/logout/', LogOutAPIView.as_view()),
]

