from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.views import APIView
from . import authentication, serializers
from .serializers import UserSerializer
from .permissions import IsStaffOrTargetUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.authtoken import views as rest_framework_views
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	model = User

	def get_permissions(self):
		return (AllowAny if self.request.method == "POST"
                else IsStaffOrTargetUser()),



@api_view(['POST'])
@permission_classes((AllowAny,))
def create_auth(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        User.objects.create_user(
            serialized.initial_data['username'],
            serialized.initial_data['email'],
            serialized.initial_data['password']
        )
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


#{"username" : "test2", "password": "test2", "email":"test@gmail.com"}