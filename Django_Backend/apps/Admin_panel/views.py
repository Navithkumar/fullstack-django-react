from django.shortcuts import render
from rest_framework.views import APIView
from core.response import success_response,error_response
from .models import Admin_Slidebar
from .serializers import AdminPanelSerilizers
from rest_framework.permissions import IsAuthenticated
class AdminSidebarView(APIView):
  permission_classes = [IsAuthenticated]
  def get(self,request):
    try:
      user = request.user
      slidebars = Admin_Slidebar.objects.all()
      serializer = AdminPanelSerilizers(slidebars, many=True)
      response_data = {
          "user":{
              "username":user.username,
              "phone_number" : user.phone_number,
              "role":user.role
          },
          "slidebars": serializer.data
      }
      return success_response("Admin Sliderbar Fetched Successfully",response_data)
    except Exception as e:
      return error_response("Error while login", str(e))