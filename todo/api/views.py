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

class TaskViewSet(viewsets.ModelViewSet):
	queryset = Task.objects.all()
	serializer_class = TaskSerializer
	authentication_classes = (TokenAuthentication,)

@api_view(['GET'])
def gettasks(request):
	user_tasks = Task.objects.filter(user_id=request.user.id)
	return Response()
	serialized = TaskSerializer(data=user_tasks)
	if serialized.is_valid():
		return Response(serialized.data, status=status.HTTP_200_OK)
	else:
		return Response("Hello")

@api_view(['POST'])
def createtask(request):
	request.data["user_id"] = request.user.id
	serialized = TaskSerializer(data=request.data)
	if serialized.is_valid():
		Task.objects.create(
			user_id=serialized.initial_data["user_id"],
			name=serialized.initial_data["name"],
			description=serialized.initial_data["description"],
		)
		return Response(serialized.data, status=status.HTTP_201_CREATED)
	else:
		return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)
