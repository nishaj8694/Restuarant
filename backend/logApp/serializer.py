from rest_framework import serializers
from logApp.models import customUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class userSerializers(serializers.ModelSerializer):

    class Meta:
        model = customUser
        fields = ['first_name', 'email', 'password']
        extra_kwargs = {'password':{'write_only':True}}

        def create(self,validated_data):
            password = validated_data.pop('password')
            usr = customUser.objects.create_user(**validated_data, password=password)
            usr.save()
            return usr

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['verified'] = user.Is_verified
        if user.Partnership:
           token['role'] = 'hoteluser'
        else:
           token['role'] = 'normaluser'

        
        print(token)
        return token            

