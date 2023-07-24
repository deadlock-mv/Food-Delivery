from django.shortcuts import render
from app.models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.views import APIView
from res_manager.serializers import *
from res_manager.pagination import MangerOrderPagination
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from app.api.permissions import IsAdminUserOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication
from res_manager.Manager.restaurant_manager import get_category_list, get_category_by_id, post_category, put_category, \
                                            delete_category, get_item_by_id, get_item_list, post_item, put_item, \
                                            delete_item, get_address, get_sales_report


# Create your views here.
class Category(APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    authentication_classes = [JWTAuthentication]

    def get(self, request, pk=None):
        if pk:
            return get_category_by_id(pk)
        else:
            return get_category_list(request)

    def post(self, request):
        return post_category(request)

    def put(self, request, pk):
        obj = Categorylist.objects.get(pk=pk)
        self.check_object_permissions(request, obj)
        return put_category(request, obj)

    def delete(self, request, pk):
        if pk:
            category = Categorylist.objects.get(pk=pk)
            self.check_object_permissions(request, category)
            return delete_category(category)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

        
class Item(APIView):
    permission_classes = [IsAdminUserOrReadOnly]
    authentication_classes = [JWTAuthentication]

    def get(self, request, pk=None):
        if pk:
            return get_item_by_id(pk)
        else:
            return get_item_list(request)

    def post(self, request):
        return post_item(request)

    def put(self, request, pk):
        try:
            item = Itemlist.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        self.check_object_permissions(request, item)
        return put_item(request, item)
    
    def delete(self, request, pk):
        if pk:
            item = Itemlist.objects.get(pk=pk)
            self.check_object_permissions(request, item)
            return delete_item(item)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class FoodOrder(APIView):
    pagination_class = MangerOrderPagination
    permission_classes = [IsAdminUserOrReadOnly]
    authentication_classes = [JWTAuthentication]

    @property
    def paginator(self):
        """The paginator instance associated with the view, or `None`."""
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        """Return a single page of results, or `None` if pagination is disabled."""
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        """Return a paginated style `Response` object for the given output data."""
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, pk=None):
        if pk:
            try:
                order = Foodorder.objects.get(pk=pk)
                serializer = FoodOrderSerializer(order)
            except Orderitem.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            order = Foodorder.objects.all().order_by('-id')
            page = self.paginate_queryset(order)
            serializer = FoodOrderSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

    def put(self, request, pk):
        try:
            order = Foodorder.objects.get(pk=pk)
        except Foodorder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        self.check_object_permissions(request, order)
        serializer = FoodOrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddressManager(APIView):
    def get(self, request):
        return get_address(request)


class Sales(APIView):
    def get(self, request):
        return get_sales_report(request)
