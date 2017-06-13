from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from . import views

# from registration.forms import RegistrationFormUniqueEmail
# from registration.backends.simple.views import RegistrationView


urlpatterns = [
	url(r'^$', TemplateView.as_view(template_name = 'home.html'),name='index'), 
	url(r'^api/', include('api.urls', namespace="api")),
	url(r'^profile/', include('profile.urls', namespace="profile")),
	url(r'^accounts/', include('accounts.urls', namespace="accounts")),
	url(r'^admin/', admin.site.urls)
]