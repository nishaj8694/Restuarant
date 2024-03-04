from django.contrib import admin
from django.urls import path,include
from .views import FoodView,ind,adminFoodView,updateisavailable,updateoffer
from Hotel import views

urlpatterns = [
    path('',ind),
    path('showmenu',FoodView.as_view(),name='showmenu'),
    path('adminmenu',adminFoodView.as_view(),name='adminmenu'),
    path('order',views.orderView.as_view(),name='order'),
    path('profile',views.profile,name='profile'),
    path('updateavailble',updateisavailable,name='updateavailable'),
    path('updateoffer',updateoffer,name='updateoffer'),
]