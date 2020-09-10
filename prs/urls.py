from django.urls import path

from prs import views

urlpatterns = [
    path('', views.home, name='home'),
    path('redirect/', views.home, name='redirect'),
    path('query', views.prsquery, name='prsquery')
]