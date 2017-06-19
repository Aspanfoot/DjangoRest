from datetime import datetime
from rest_framework.authtoken.models import Token
from re import sub
class TestMiddleware:
	"""Easy as duck"""
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		header_token = request.META.get("HTTP_AUTHORIZATION", None)
		if header_token is not None:
			token_key =	sub('Token ', '', str(header_token))
			try:
				token_obj = Token.objects.get(key = token_key)
			except token_obj.DoesNotExist as e:
				logger.error('Token doesnt exist.', + str(e))
		response = self.get_response(request)

		return response