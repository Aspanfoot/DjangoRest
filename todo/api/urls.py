from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from . views import TaskViewSet

router = DefaultRouter()
router.register(prefix="tasks", viewset = TaskViewSet)

urlpatterns = router.urls