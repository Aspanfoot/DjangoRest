from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.authtoken import views
from django.views.generic import TemplateView
from rest_framework.authtoken import views as rest_framework_views

from .views import *

router = routers.DefaultRouter()
router.register(prefix="users", viewset = UserViewSet)

urlpatterns = [ 
	url(r'^login/', TemplateView.as_view(template_name="accounts/login.html"), name="login"),
	url(r'^logout/', TemplateView.as_view(template_name="accounts/logout.html"), name="logout"),
	url(r'^get_auth_token/', rest_framework_views.obtain_auth_token, name='get_auth_token')
]
urlpatterns += router.urls
