from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from app.models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from app.api.pagination import UserOrderPagination
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from app.api.permissions import IsUser
from rest_framework_simplejwt.authentication import JWTAuthentication


class UserOrder(APIView):
    pagination_class = UserOrderPagination

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

    def get(self, request, pk):
        try:
            details = Foodorder.objects.filter(customerid=pk).order_by('-id')
            page = self.paginate_queryset(details)
            if page is not None:
                serializer = OrderDetailSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
        # return Response(serializer.data, status=status.HTTP_200_OK)


class UserProfile(APIView):
    def put(self, request, pk):
        userprofile = User.objects.get(pk=pk)
        if request.data['password']:
            request.data['password'] = make_password(request.data['password'])
        else:
            request.data['password'] = userprofile.password

        serializer = UserProfileSerailizer(userprofile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderStatus(APIView):
    def get(self, request, pk):
        try:
            orderdata = Foodorder.objects.get(pk=pk)
            serializer = OrderDetailSerializer(orderdata)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)


#  Tracks the latest Order and returns the response if orders are in either of preparing or dispatched status
class TrackOrder(APIView):
    def get(self, request, id):
        try:
            orderdata = Foodorder.objects.filter(customerid=id, status__in=["preparing", "dispatched"]).last()
            if orderdata == None:
                raise Exception
            serializer = OrderDetailSerializer(orderdata)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response({'message': 'No order item found'}, status=status.HTTP_404_NOT_FOUND)

#   order id generation
class OrdPost(APIView):
    permission_classes = [IsUser]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        # request.data['customerid'] = request.user.id
        print(request.data)
        serializer = FoodorderSerializer(data=request.data)
        # self.check_object_permissions(request, serializer)
        if serializer.is_valid():
            serializer.validated_data['customerid'] = request.user
            serializer.save()
            return Response(serializer.data['id'], status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#  order-list - relating to orderid created above
class OrdPostItems(APIView):
    def post(self, request):
        serializer = OrderitemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# address getting and posting done via id=user
# address putting and deleting done via id=pk
class UserAddress(APIView):
    def get(self, request, id):
        address = Address.objects.filter(user=id)
        serializer = UserAddressSerializer(address, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, id):
        serializer = UserAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # address putting and deleting done via id=pk
    def put(self, request, id):
        address = Address.objects.get(pk=id)
        serializer = UserAddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        address = Address.objects.get(pk=id)
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserDetail(APIView):
    def get(self, request, pk=None):
        try:
            users = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(users)
        return Response(serializer.data)

    def put(self, request, pk=None):
        users = User.objects.get(pk=pk)
        serializer = UserSerializer(users, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        users = User.objects.get(pk=pk)
        users.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryList(APIView):
    def get(self, request):
        categories = Categorylist.objects.all()
        serializer = CategorylistSerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CategorylistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetail(APIView):
    def get(self, request, pk=None):
        try:
            categories = Categorylist.objects.get(pk=pk)
            serializer = CategorylistSerializer(categories)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Categorylist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk=None):
        categories = Categorylist.objects.get(pk=pk)
        serializer = CategorylistSerializer(categories, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        categories = Categorylist.objects.get(p=pk)
        categories.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# admin list with getting userlist, adding/posting, putting, deleting a user
# requires admin authentication 
# class UserList(APIView):
#     # permission_classes = [IsAdminUser]
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def get(self, request, pk=None):
#         if pk:
#             try:
#                 users = User.objects.get(pk=pk)
#             except User.DoesNotExist:
#                 return Response(status=status.HTTP_404_NOT_FOUND)
#             serializer = UserSerializer(users)
#         else:
#             users = User.objects.all()
#             serializer = UserSerializer(users, many=True)
#         return Response(serializer.data)
#
#     def put(self,request,pk=None):
#         users = User.objects.get(pk=pk)
#         serializer = UserSerializer(users, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk=None):
#         users = User.objects.get(pk=pk)
#         users.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# particular user related functionality like get, put, delete for now -feb 9,
# need to add post functionality for ordering


# class OrderList(APIView):
# # order list with order items
#     def get(self, request, pk=None):
#         if pk:
#             try:
#                 orderlist = Foodorder.objects.get(pk=pk)
#             except Foodorder.DoesNotExist:
#                 return Response(status=status.HTTP_404_NOT_FOUND)
#             serializer = FoodorderSerializer(orderlist)
#         else:
#             orderlist = Foodorder.objects.all()
#             serializer = FoodorderSerializer(orderlist, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
# # order id generation
#     def post(self, request):
#         serializer = FoodorderSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(status=status.HTTP_400_BAD_REQUEST)



