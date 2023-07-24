from rest_framework import serializers
from app.models import *


class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Categorylist
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Itemlist
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Orderitem
        fields = ['itemid', 'quantity']
        depth = 1


class FoodOrderSerializer(serializers.ModelSerializer):
    orderitem = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Foodorder
        fields = ['id', 'status', 'orderitem']


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'
