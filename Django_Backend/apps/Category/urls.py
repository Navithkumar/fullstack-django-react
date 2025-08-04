from django.urls import path
from .views import CreateCategory,ListCategory

urlpatterns = [
    path('category', CreateCategory.as_view(), name='create-category'),
    path('list-category', ListCategory.as_view(), name='list-category'),
]
