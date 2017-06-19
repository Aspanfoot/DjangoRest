from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import viewsets
from rest_framework.views import APIView
from . import serializers
from .serializers import UserSerializer, AuthCustomTokenSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.authtoken import views as rest_framework_views
from rest_framework import status
from rest_framework import parsers
from rest_framework import renderers
from django.views.decorators.csrf import csrf_exempt

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	model = User
	permission_classes = (AllowAny,)

	def create(self, request, *args, **kwargs):
		serialized = UserSerializer(data=request.data)

		if  User.objects.filter(username=serialized.initial_data['username']).exists():
			return Response("Username already exist", status=status.HTTP_400_BAD_REQUEST)

		if  User.objects.filter(username=serialized.initial_data['email']).exists():
			return Response("Email already exist", status=status.HTTP_400_BAD_REQUEST)

		if serialized.is_valid():
			User.objects.create_user(
				serialized.initial_data['username'],
				serialized.initial_data['email'],
				serialized.initial_data['password']
			)
			return Response(serialized.data, status=status.HTTP_201_CREATED)
		else:
			return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


class ObtainAuthToken(APIView):
	throttle_classes = ()
	permission_classes = (AllowAny,)
	parser_classes = (
		parsers.FormParser,
		parsers.MultiPartParser,
		parsers.JSONParser,
	)
	renderer_classes = (renderers.JSONRenderer,)

	def post(self, request):
		#This works just fine
		serializer = UserSerializer(data=request.data)

		username = serializer.initial_data['username']
		password = serializer.initial_data['password']

		user = authenticate(username=username, password=password)
		token, created = Token.objects.get_or_create(user=user)

		content = {
			'token': str(token.key),
		}

		return Response(content)

	def get(self, request):
		Token.objects.get(key=request.auth.key).delete()

		return Response("Token deleted");