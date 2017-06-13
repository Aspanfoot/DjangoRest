
from django.conf.urls import include, url
from . import views
from django.views.generic import TemplateView

urlpatterns = [
	url(r'^$', TemplateView.as_view(template_name = "profile/profile.html"), name="profile"),
]