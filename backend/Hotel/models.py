from django.db import models
from logApp.models import customUser

class Restaurent(models.Model):
    Name=models.CharField(max_length=100)
    place=models.CharField(max_length=200)
    addres=models.TextField()
    number=models.BigIntegerField()
    user=models.ForeignKey(customUser, on_delete=models.CASCADE, related_name='custemUser', default=1)
 
    def __str__(self):
        return self.Name


class Picturehub(models.Model):
    restaurent=models.ForeignKey(Restaurent, on_delete=models.CASCADE, related_name='hotelimages')    
    image=models.ImageField(upload_to='hotel',null=True)

    def __str__(self):
        return self.restaurent.Name
    
class foodcatagories(models.Model):
    catagories=models.CharField(max_length=200)

    def __str__(self):
        return self.catagories




class foodmenu(models.Model):
    restaurent=models.ForeignKey(Restaurent, on_delete=models.CASCADE,default=1, related_name='hotelmenu')    
    Name=models.CharField(max_length=100)
    Is_available=models.BooleanField(default=False,null=True,blank=True)
    Offer=models.CharField(max_length=100,blank=True,null=True,default=None)
    Price=models.BigIntegerField()
    catagories=models.ForeignKey(foodcatagories,on_delete=models.CASCADE,default=None,related_name='hotelcatagories',null=True,blank=True)
    Vegetarian=models.BooleanField(default=False,null=True,blank=True)
    Image=models.ImageField(upload_to='media',null=True)
    
    def __str__(self):
        return self.Name
    

class Order(models.Model):
    data=(
          ('pending','pending'),
          ('shiped','shiped'),
          ('deliverd','deliverd'),
          ('cancel','cancel'),
     )
    pay=(
          ('cash','cash'),
          ('online','online'),
          ('wallet','wallet')
     )
    user=models.ForeignKey(customUser,on_delete=models.SET_NULL ,null=True)
    Total_Price = models.DecimalField(default=0,max_digits=10, decimal_places=2)
    Pay_option=models.CharField(max_length=10,choices=pay,default="cash",null=True)
    Order_Date= models.DateTimeField(auto_now_add=True)
    Order_Time= models.TimeField(auto_now_add=True)
    Delivery_Date= models.DateTimeField(blank=True,null=True)
    Delivery_Time= models.TimeField(blank=True,null=True)
    status=models.CharField(max_length=10,choices=data,default="pending",null=True,blank=True) 
        

       
    def __str__(self):
         return str(self.user)
    
     
class orderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    foodItem = models.ForeignKey(foodmenu,related_name='menu_items', on_delete=models.CASCADE,null=True,blank=True)
    quantity = models.PositiveIntegerField(default=1)
    offer = models.PositiveIntegerField(default=0)
    price = models.DecimalField(default=0,max_digits=10, decimal_places=2)
    
    def __str__(self):
         return str(self.foodItem)
    
    