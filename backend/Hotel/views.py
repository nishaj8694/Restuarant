from django.shortcuts import render
from django.http import HttpResponse
from .serializer import HotelSerializers,foodSerializers,orderItemSerializer,orderSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from .models import foodmenu,Restaurent,Order,orderItem
from .serializer import HotelSerializers
from logApp.models import customUser
from logApp.serializer import userSerializers
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


# Create your views here.
def ind(request):
    return HttpResponse('you are welcome')


class orderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request,*args,**kwargs):
        data=Order.objects.filter(user=request.user).exclude(status='delivered')
        Serializer=orderSerializer(data,many=True)
        return Response(Serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request,*args,**kwargs):
        option=request.data.get('option')
        if option =='cart':
            data=request.data.get('cart')
            if data:
                try:
                    ord=Order.objects.create(user=request.user)
                    sum=0
                    product_Dict = {}
                    for Product in data:                               
                        orditm=orderItem.objects.create(order=ord)
                        orditm.foodItem_id=Product['id']
                        orditm.offer=Product['Offer'] if Product['Offer'] is not None else 0
                        orditm.price=Product['Price']
                        orditm.quantity=Product['itemNo'] if Product['Offer'] is not None else 1
                        orditm.save()
                        sum += orditm.quantity * (Product['Price'] - (int(orditm.offer) / 100 * Product['Price'])) 
                        if Product['restaurent'] in product_Dict:
                            product_Dict[Product['restaurent']].append(Product)
                        else:
                            product_Dict[Product['restaurent']]=[Product]                                       
                    ord.Total_Price=sum
                    ord.save()

                    
                    for dc in product_Dict:
                        query=Restaurent.objects.get(id=int(dc))
                        id=query.user_id                        
                        item=product_Dict[dc]
                        channel_layer=get_channel_layer()
                        async_to_sync(channel_layer.group_send)(
                        str(id),
                        {
                          'type':'send_notification',
                          'notification':item                    
                         }
                        )   
                    return Response(status=status.HTTP_201_CREATED)
                except:    
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        if option =='buy':
            try:
                Product=request.data.get('buy')
                try:
                    ord=Order.objects.create(user=request.user)
                except:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
                try:    
                    orditm=orderItem.objects.create(order=ord)
                    
                except:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
                orditm.foodItem_id=Product['id']
                orditm.offer=Product['Offer'] if Product['Offer'] is not None else 0
                orditm.price=Product['Price']
                orditm.quantity=Product['itemNo'] if Product['Offer'] is not None else 1
                ord.Total_Price= orditm.quantity * (Product['Price'] - (int(orditm.offer) / 100 * Product['Price']))
                grp=orditm.foodItem.restaurent.user
                id=grp.id
                orditm.save()
                ord.save()
                channel_layer=get_channel_layer()
                async_to_sync(channel_layer.group_send)(
                     str(id),
                    {
                     'type':'send_notification',
                     'notification':[Product]                     
                    }
                )
                return Response(id,status=status.HTTP_201_CREATED)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)



        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    try:
        profile=customUser.objects.get(id=request.user.id)
        print(profile)
        resto=Restaurent.objects.get(user=request.user)
        serializer = userSerializers(profile)
        jser=HotelSerializers(resto)
        print('rest',jser.data)

        return Response([serializer.data,jser.data],status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_304_NOT_MODIFIED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateisavailable(request):
    try:
        id=request.data.get('id')
        queryset = foodmenu.objects.get(id=id)
        queryset.Is_available = not queryset.Is_available
        queryset.save()
        return Response(status=status.HTTP_201_CREATED)
    except:
        return Response(status=status.HTTP_304_NOT_MODIFIED)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def updateoffer(request):
    try:
        id=request.data.get('id')
        offer=request.data.get('offer')
        print(id,offer)
        queryset = foodmenu.objects.get(id=id)
        if int(offer)>0:
            queryset.Offer=offer
        else:
            queryset.Offer=None
        queryset.save()
        serializer = foodSerializers(queryset)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    except:
        return Response(status=status.HTTP_304_NOT_MODIFIED)


class adminFoodView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = foodmenu.objects.filter(restaurent__user=request.user)
        serializer = foodSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self,request):
        serilizer=foodSerializers(data=request.data)
        if serilizer.is_valid():
            serilizer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serilizer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
      print('food id',request.data.get('id'))
      return Response(status=status.HTTP_200_OK)

    def delete(self, request):
      try:
        queryset = foodmenu.objects.get(id=request.data.get('id'))
        # queryset.delete()
        return Response(status=status.HTTP_200_OK)
      except:
        return Response(status=status.HTTP_304_NOT_MODIFIED)
          



class FoodView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        print(request.user)
        queryset = foodmenu.objects.all()
        serializer = foodSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

