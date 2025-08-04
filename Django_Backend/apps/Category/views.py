from rest_framework.views import APIView
from core.response import success_response,error_response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CategorySerilizers
from django.db import transaction
from .models import Category
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from core.pagination  import MyCustomPagination
from django.db.models import Q

class CreateCategory(APIView):
  permission_classes = [IsAuthenticated]
  @transaction.atomic
  def post(self,request):
    try:
      user = request.user
      serializer = CategorySerilizers(data = request.data)
      if serializer.is_valid():
        serializer.save(user_id = user.id)
        return success_response("Category Successfully Created")
      return error_response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
      return error_response("Error while Creating Category", str(e))
    
class ListCategory(APIView):
  permission_classes = [IsAuthenticated]
  def get(self,request):
    try:
      user = request.user
      categories = Category.objects.filter(user_id=user.id).order_by('-id') 
      pagination = MyCustomPagination()
      paginated_queryset = pagination.paginate_queryset(categories, request)
      serializer = CategorySerilizers(paginated_queryset, many=True)
      return pagination.get_paginated_response(serializer.data)
    
    except Category.DoesNotExist:
            return success_response({
                'status': True,
                'message': 'No categories found',
                'data': [],
                'is_v1': True,
            })
    
    except Exception as e:
      return error_response("Error while Fetching Category", str(e))