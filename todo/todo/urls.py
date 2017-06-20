from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from . import views

# from registration.forms import RegistrationFormUniqueEmail
# from registration.backends.simple.views import RegistrationView


urlpatterns = [
	url(r'^$', TemplateView.as_view(template_name = 'base.html'),name='index'), 
	url(r'^api/', include('api.urls', namespace="api")),
	url(r'^test/', views.test),
	url(r'', TemplateView.as_view(template_name = 'base.html'),name='index'), 
]
