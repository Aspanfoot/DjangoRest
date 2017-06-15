from rest_framework import serializers
from  . models import Task

class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		fields = ("id", "name", "description", "status", "priority", "user_id")
		related_object = 'user'


	def create(self, validated_data):
		return Task.objects.create(**validated_data)