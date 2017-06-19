from django.shortcuts import render
from rest_framework import viewsets
from  . models import Task
from  . serializers import TaskSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.renderers import JSONRenderer
from rest_framework import parsers
from rest_framework import renderers

from django.core.mail import EmailMessage


class TaskViewSet(viewsets.ModelViewSet):
	queryset = Task.objects.all()
	serializer_class = TaskSerializer
	authentication_classes = (TokenAuthentication,)

	# def retrieve(self, request, *args, **kwargs):
	# 	return super(UserViewSet, self).retrieve(request, *args, **kwargs)

	#GET 
	def list(self, request):
		queryset = Task.objects.filter(user_id=request.user.id)
		serialized = TaskSerializer(instance=queryset, many=True)

		return Response(serialized.data)

	#POST 
	def create(self, request, *args, **kwargs):
		request.data["user_id"] = request.user.id
		serialized = TaskSerializer(data=request.data)
		if serialized.is_valid():
			Task.objects.create (
				user_id=serialized.initial_data["user_id"],
				name=serialized.initial_data["name"],
				description=serialized.initial_data["description"],
			)

			msg = EmailMessage('Title', 'Some html and stuff', to=["zovutexu@p33.org"])
			msg.send()

			return Response(serialized.data, status=status.HTTP_201_CREATED)
		else:
			return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)