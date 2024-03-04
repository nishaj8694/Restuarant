from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializer import userSerializers
from logApp.models import customUser
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.views import TokenObtainPairView
from logApp.serializer import MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class register(APIView):
     def post(self,request):
          try:
            name=request.data['first_name']
            email=request.data['email']
            pasword=request.data['password']
            usr = customUser.objects.create_user(email=email, password=pasword)
            usr.save()
            return Response(status=status.HTTP_201_CREATED)
          except:
            return Response( status=status.HTTP_400_BAD_REQUEST)    

        # serilizer=userSerializers(data=request.data)
        # if serilizer.is_valid():            
        #     serilizer.save()
        #     return Response(status=status.HTTP_201_CREATED)
        # else:
        #     return Response(serilizer.errors, status=status.HTTP_400_BAD_REQUEST)
