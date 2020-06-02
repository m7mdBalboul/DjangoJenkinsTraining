from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import requests
from . import config


# Create your views here.

def index(request):
    return render(request, 'dashboard.html', {'api': config.GET_JOB_INFO_URL})


def get_jobs(request):
    if request.is_ajax and request.method == "GET":
        req = requests.get(config.JENKINS_API, auth=('hephaestus', 'hephaestus'))
        res = req.json()
        return JsonResponse(res, safe=False)

    return JsonResponse({}, status=400)
