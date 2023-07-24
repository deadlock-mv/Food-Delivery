from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminUserOrReadOnly(BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        isAdmin = bool(request.user and request.user.is_staff)
        return bool(request.method in SAFE_METHODS) or isAdmin


class IsUser(BasePermission):
    """
    One User - operates only on data related to own
    can't operate on other data
    """
    def has_permission(self, request, view):
        print(bool(request.user and request.user.is_authenticated))
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        print(obj.customerid)
        isUser = bool(request.user == obj.customerid)
        return isUser