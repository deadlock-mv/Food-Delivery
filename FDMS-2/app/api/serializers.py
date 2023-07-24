from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from app.models import *


class OrderitemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Orderitem
        fields = '__all__'


class FoodorderSerializer(serializers.ModelSerializer):
    orderitem = OrderitemSerializer(many=True, read_only=True)
    class Meta:
        model = Foodorder
        fields = '__all__'
        

class ItemlistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Itemlist
        fields = '__all__'


class CategorylistSerializer(serializers.ModelSerializer):
    items = ItemlistSerializer(many=True, read_only=True)
    class Meta:
        model = Categorylist
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    orders = FoodorderSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = '__all__'

    def validate_name(self, value):
        if len(value) < 4:
            raise serializers.ValidationError("Name must be at least 4 characters long")
        else:
            return value


class OrderItemDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orderitem
        fields = ['quantity', 'itemid']
        depth = 1



class OrderDetailSerializer(serializers.ModelSerializer):
    orderitem = OrderItemDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Foodorder
        fields = ['id', 'status', 'totalamount', 'orderitem']


class UserOrderSerializer(serializers.ModelSerializer):
    orders = FoodorderSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['orders']


class UserAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'


class UserProfileSerailizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'



