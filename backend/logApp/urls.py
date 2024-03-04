from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt import views as jwt_views
from .views import register,MyTokenObtainPairView
from logApp import views

urlpatterns = [
    path('register',register.as_view(),name='register'),
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]