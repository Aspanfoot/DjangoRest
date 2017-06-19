from __future__ import absolute_import, unicode_literals
from celery import shared_task

from datetime import datetime
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.contrib.staticfiles.templatetags.staticfiles import static

@shared_task
def send_email(action):

	context = {
		'action': action,
		'time': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
	}

	msg_text = render_to_string("email/email.html", context=context)
	msg = EmailMessage("Task " + action, msg_text, to=["lagore@ipdeer.com"])
	msg.send()