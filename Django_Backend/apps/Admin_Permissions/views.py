from apps.Category.models import Category
from rest_framework.views import APIView
from core.response import success_response,error_response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import AdminPermissionsSerilizers
from django.db import transaction
from .models import Permissions
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from core.pagination  import MyCustomPagination
from django.db.models import Q

class ShowPermissions(APIView):
  permission_classes = [IsAuthenticated]
  def get(self,request):
    try:
      data = Permissions.objects.filter(status=1).order_by('-id')
      pagination = MyCustomPagination()
      paginated_queryset = pagination.paginate_queryset(data, request)
      serializer = AdminPermissionsSerilizers(paginated_queryset, many=True)
      return pagination.get_paginated_response(serializer.data)
    
    except data.DoesNotExist:
            return success_response({
                'status': True,
                'message': 'No Permissions found',
                'data': [],
                'is_v1': True,
            })
    except Exception as e:
      return error_response("Error while Fetching Permissions", str(e))

class ApprovePermission(APIView):
    permission_classes = [IsAuthenticated]
    @transaction.atomic
    def patch(self,request,id):
      try:
          permissions = get_object_or_404(Permissions,id=id)
          serializer = AdminPermissionsSerilizers(permissions,data=request.data,partial=True)
          if serializer.is_valid():
              serializer.save()
              return success_response({
                            'is_v1':True,
                            'status':True,
                            'message':'Permission updated Successfully',
                        })
          rows_updated = Category.objects.filter(id=permissions.category_id).update(
                status=Category.Status.APPROVED
            )
            
          if rows_updated == 0:
              transaction.set_rollback(True)
              return error_response(
                    {
                        'status': False,
                        'message': 'Category not found or not updated'
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
          return success_response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      except Exception as e:
          return error_response("Error while Fetching Permissions", str(e))