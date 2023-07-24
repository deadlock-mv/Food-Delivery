from django.urls import path, include
from .views import Category, Item, FoodOrder, AddressManager, Sales


urlpatterns = [
    path('res-manager/category/', Category.as_view()),
    path('res-manager/category/<int:pk>', Category.as_view()),
    path('res-manager/item/', Item.as_view()),
    path('res-manager/item/<int:pk>', Item.as_view()),
    path('res-manager/foodorder/', FoodOrder.as_view()),
    path('res-manager/foodorder/<int:pk>', FoodOrder.as_view()),
    path('res-manager/address/', AddressManager.as_view()),
    path('res-manager/sales/', Sales.as_view()),
]
