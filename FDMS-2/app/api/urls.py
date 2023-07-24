from django.urls import path, include
from .views import (UserDetail, CategoryList, CategoryDetail, OrdPost, OrdPostItems, UserOrder,
                    UserAddress, OrderStatus, UserProfile, TrackOrder)



urlpatterns = [
    # --------------admin related---------------
    # path('userlist/', UserList.as_view(), name='UserList'),
    # path('userlist/<int:pk>/', UserList.as_view(), name='UserList'),
    # path('Order/', OrderList.as_view(), name='OrderList'),
    # path('Order/<int:pk>/', OrderList.as_view(), name='Order'),
    path('Category/', CategoryList.as_view(), name='CategoryList'),
    path('Category/<int:pk>/', CategoryDetail.as_view(), name='CategoryDetail'),

    # ------------user related-------------------
    path('<int:pk>/', UserDetail.as_view(), name='UserDetail'),
    path('user/orders/<int:pk>', UserOrder.as_view(), name='UserOrders'),
    path('user/address/<int:id>', UserAddress.as_view(), name='UserOrders'),
    path('user/orders/status/<int:pk>', OrderStatus.as_view(), name="OrderStatus"),
    path('user/profile/<int:pk>', UserProfile.as_view(), name="UserProfile"),
    path('user/track-order/<int:id>', TrackOrder.as_view(), name="TrackOrder"),

    # ---------Orderid generation & order-item-list generation // posting------
    path('Order-items/', OrdPost.as_view()),
    path('ordlist/', OrdPostItems.as_view()),
]
