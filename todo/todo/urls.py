from django.conf.urls import url, include
from django.contrib import admin
from . import views

from registration.forms import RegistrationFormUniqueEmail
from registration.backends.simple.views import RegistrationView

urlpatterns = [
	url(r'^$', views.index, name='index'), 
	url(r'^api/', include('api.urls', namespace="api")),
	url(r'^profile/', include('profile.urls', namespace="profile")),
	url(r'^accounts/', include('registration.backends.simple.urls', namespace="accounts")),
	url(r'^accounts/register/', RegistrationView.as_view(form_class = RegistrationFormUniqueEmail), name='unique_email_register'),
	url(r'^admin/', admin.site.urls)
]
