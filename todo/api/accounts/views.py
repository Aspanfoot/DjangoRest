from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.views import APIView
from . import authentication, serializers
from .serializers import UserSerializer
# from .permissions import IsStaffOrTargetUser  
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.authtoken import views as rest_framework_views

from rest_framework import status

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	model = User

	def create(self, request, *args, **kwargs):
		serialized = UserSerializer(data=request.data)

		#Перевірка чи такий пароль існує
		#Перевірка залежить від параметрів тому доцільно перевірити 
		#чи можна зробити функцію
		if  User.objects.filter(username=serialized.initial_data['username']).exists():
			return Response("Username already exist", status=status.HTTP_400_BAD_REQUEST)

		if serialized.is_valid():
			User.objects.create_user(
				serialized.initial_data['username'],
				serialized.initial_data['email'],
				serialized.initial_data['password']
			)
			return Response(serialized.data, status=status.HTTP_201_CREATED)
		else:
			return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

	def check(self, *args, **kwargs):
		pass
		