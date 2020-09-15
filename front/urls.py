from django.urls import path

from . import views

urlpatterns = [
    path('index', views.serve_front, name='index'),
    ]
