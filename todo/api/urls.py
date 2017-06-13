from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from . views import TaskViewSet
from django.views.generic import RedirectView


router = DefaultRouter()
router.register(prefix="tasks", viewset = TaskViewSet)
# urlpatterns = [
# 	url(r'^rest-auth/', include('rest_auth.urls')),
# 	url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
# 	url(r'^verifyemail/(?P<key>\w+)$', RedirectView.as_view(url='/', permanent=True), name='account_confirm_email')
# ]
urlpatterns = router.urls
