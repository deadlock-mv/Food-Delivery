from app.models import *
from res_manager.serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from datetime import timedelta, datetime
from django.utils import timezone
from django.db.models.functions import TruncDate, Coalesce
from django.db.models import Sum, Value
from django.db.models.fields import IntegerField
from django.db.models.expressions import Case, When



# Category View functions
def get_category_by_id(pk):
    """category based on id - single item returned"""
    try:
        category = Categorylist.objects.get(pk=pk)
    except Categorylist.DoesNotExist as error:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CategorySerializer(category)
    return Response(serializer.data, status=status.HTTP_200_OK)


def get_category_list(request):
    """category list is returned"""
    try:
        category = Categorylist.objects.all()
        serializer = CategorySerializer(category, many=True)
    except Categorylist.DoesNotExist as error:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_200_OK)


def post_category(request):
    """category is created"""
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def put_category(request, obj):
    """category is modified"""
    serializer = CategorySerializer(obj, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def delete_category(obj):
    """category is deleted"""
    try:
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except APIException:
        return Response(status=status.HTTP_400_BAD_REQUEST)


# Item view related
def get_item_by_id(pk):
    """returns a single object of pk"""
    try:
        item = Itemlist.objects.get(pk=pk)
    except Itemlist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ItemSerializer(item)
    return Response(serializer.data, status=status.HTTP_200_OK)


def get_item_list(request):
    """returns the entire list of Items"""
    item = Itemlist.objects.all()
    serializer = ItemSerializer(item, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


def post_item(request):
    """Item is created"""
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def put_item(request, obj):
    """Item is modified"""
    serializer = ItemSerializer(obj, data=request.data)
    print(obj.category)
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def delete_item(obj):
    """item is deleted"""
    try:
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except APIException:
        return Response(status=status.HTTP_400_BAD_REQUEST)


# AddressManger View Related
def get_address(request):
    address = Address.objects.all()
    serializer = AddressSerializer(address, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


def get_sales_report(request):
    today = timezone.now().date()
    four_days_ago = today - timedelta(days=4)

    # Generate a list of all dates within the last 4 days
    dates = [today - timedelta(days=i) for i in range(4)]

    # Create a query that groups by the truncated orderdate and calculates the sum of the totalamount field
    queryset = Foodorder.objects.annotate(
        order_created=TruncDate('orderdate')
    ).values(
        'order_created'
    ).annotate(
        total_created=Sum('totalamount')
    ).filter(
        order_created__range=[four_days_ago, today]
    )

    # Create a list of dictionaries, with one dictionary for each date
    result = []
    for date in dates:
        # Find the matching object in the queryset
        obj = queryset.filter(order_created=date)

        # Add a dictionary to the result list with the date and total_created fields
        result.append({
            'orderdate': date,
            'total_created': obj.aggregate(Sum('total_created'))['total_created__sum'] or 0,
        })

    return Response(result, status=status.HTTP_200_OK)
