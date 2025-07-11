from django.urls import path
from .views import AdminSidebarView

urlpatterns = [
    path('admin-slidebar', AdminSidebarView.as_view(), name='admin-slidebar'),
]
