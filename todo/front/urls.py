
from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from . views import TaskViewSet, index
from . import views

task_router = DefaultRouter()
task_router.register(prefix="tasks", viewset = TaskViewSet)

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/', include(task_router.urls))
]