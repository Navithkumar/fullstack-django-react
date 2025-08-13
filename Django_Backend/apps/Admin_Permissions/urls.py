from django.urls import path
from .views import ShowPermissions,ApprovePermission

urlpatterns = [
    path('list-permissions', ShowPermissions.as_view(), name='show-permissions'),
    path('approve-permissions/<int:id>', ApprovePermission.as_view(), name='approve-permissions'),
]
