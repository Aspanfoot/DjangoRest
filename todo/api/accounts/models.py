from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token 
from django.contrib.auth import get_user_model

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class EmailBackend:
	def authenticate(self, username=None, password=None, **kwargs):
		UserModel = get_user_model()
		if '@' in username :
			credentials = {'email': username}
		else:
			credentials = {'username': username}
		try:
			user = UserModel.objects.get(**credentials)
		except UserModel.DoesNotExist:
			return None
		else:
			if getattr(user, 'is_active', False) and user.check_password(password):
				return user
		return None
