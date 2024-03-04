import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.http import HttpRequest
from asgiref.sync import sync_to_async
import datetime

class HotelConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['id']
        print(self.room_name)
        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self,close_code):
        # Leave room
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        # message = text_data_json['content']
        # id = text_data_json['id']

        # # Send message to room group
        # await self.channel_layer.group_send(
        #     self.room_name,
        #     {
        #         'type': 'send_notification',
        #         'content': message,
        #         'user':id
        #     }
        # )
    
    async def send_notification(self,event):
        notification=event['notification']
        # id=event['user']
        print(notification)

        await self.send(text_data=json.dumps({
            'notification': notification,
        }))