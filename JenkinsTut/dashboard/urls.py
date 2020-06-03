from django.urls import path
from . import views
from . import config

urlpatterns = [
    path('', views.index, name='index'),
    path(config.GET_JOB_INFO_URL, views.get_jobs, name='get_jobs')
]
