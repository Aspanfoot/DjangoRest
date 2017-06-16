from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from django.core import exceptions
 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        write_only_fields = ('password',)
        read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'date_joined',)
 
    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.email = validated_data.get("email", instance.email)
        instance.username = validated_data.get("username", instance.username)

        instance.save()

        return instance


#Кастомний серіалізатор для цього гавна
class AuthCustomTokenSerializer(serializers.Serializer):
    email_or_username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        email_or_username = attrs.get('email_or_username')
        password = attrs.get('password')

        if email_or_username and password:
            # Check if user sent email
            if validate_email(email_or_username):
                user_request = get_object_or_404(
                    User,
                    email=email_or_username,
                )

                email_or_username = user_request.username

            user = authenticate(username=email_or_username, password=password)

            if user:
                if not user.is_active:
                    msg = ('User account is disabled.')
                    raise exceptions.ValidationError(msg)
            else:
                msg = ('Unable to log in with provided credentials. username = {} password = {}'.format(email_or_username, password))
                raise exceptions.ValidationError(msg)
        else:
            msg = ('Must include "email or username" and "password"')
            raise exceptions.ValidationError(msg)

        attrs['user'] = user
        return attrs
