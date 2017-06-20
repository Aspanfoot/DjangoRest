from django.shortcuts import render
from django.template import RequestContext
from django.http import HttpResponse

#Nothing actually need to be here
def test(request):
	return render(request, 'test.html')