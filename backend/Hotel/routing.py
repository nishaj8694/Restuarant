from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from Hotel import consumers

websocket_urlpatterns =[
     path("ws/chat/<str:id>/",consumers.HotelConsumer.as_asgi(),),
    ]

