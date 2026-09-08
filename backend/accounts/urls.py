from django.urls import path
from .views import CurrentUserView, PasswordResetView, RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
]
