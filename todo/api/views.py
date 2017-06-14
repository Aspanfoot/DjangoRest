from django.shortcuts import render
from rest_framework import viewsets
from  . models import Task
from  . serializers import TaskSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response



class TaskViewSet(viewsets.ModelViewSet):
	queryset = Task.objects.all()
	serializer_class = TaskSerializer

@api_view(['GET'])
@permission_classes((AllowAny,))
def usertasks(request):
	queryset = Task.objects.all().filter(id=46)
	serialized = TaskSerializer(data=queryset)
	if serialized.is_valid():
		return Response(serialized.data)


