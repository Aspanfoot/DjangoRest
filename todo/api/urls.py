from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from . views import TaskViewSet
from django.views.generic import RedirectView

from .views import *

router = DefaultRouter()
router.register(prefix="tasks", viewset = TaskViewSet)
urlpatterns	= [
	url(r'^accounts/', include('accounts.urls', namespace="accounts")),
	url(r'^admin/', admin.site.urls),
	url(r'^usertasks/', usertasks, name="usertasks")
]

urlpatterns += router.urls
