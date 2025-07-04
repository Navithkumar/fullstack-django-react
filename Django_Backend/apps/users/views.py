from rest_framework.views import APIView
from rest_framework.response import Response
from core.response import success_response,error_response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer
from django.db import transaction

class RegisterView(APIView):
    def post(self, request):
        try:
          with transaction.atomic():
            serializer = RegisterSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                return success_response("User registered successfully", status=status.HTTP_201_CREATED)
        except Exception as e:
          return error_response("Error while register" ,str(e))


class LoginView(APIView):
    def post(self, request):
        try:
          serializer = LoginSerializer(data=request.data, context={'request': request})
          if serializer.is_valid():
              user = serializer.validated_data['user']
              refresh = RefreshToken.for_user(user)
              return success_response(
                "User Login successfully",
                {
                  'refresh':str(refresh),
                  'access':str(refresh.access_token),
                  'user': {
                      'username': user.username,
                      'email': user.email,
                      'role': user.role,
                  }
              })
        except Exception as e:
          return error_response("Error while register" ,str(e))
