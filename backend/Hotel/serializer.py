from rest_framework import serializers
from .models import foodmenu,Restaurent,orderItem,Order

class HotelSerializers(serializers.ModelSerializer):

    class Meta:
        model = Restaurent
        fields = '__all__'

class foodSerializers(serializers.ModelSerializer):

    class Meta:
        model = foodmenu
        fields = '__all__'


class orderItemSerializer(serializers.ModelSerializer):
    foodItem=foodSerializers()
    class Meta:
        model = orderItem
        fields = '__all__'



# fields = ['quantity', 'offer', 'price', 'food']        
# food=foodSerializers(source='menu_items')


class orderSerializer(serializers.ModelSerializer):
    order=orderItemSerializer(source='order_items', many=True)
    class Meta:
        model = Order
        fields = ['Total_Price', 'Pay_option', 'status','order']        