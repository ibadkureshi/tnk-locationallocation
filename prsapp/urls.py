from django.urls import path, include

urlpatterns = [
    path('prs/',include('prs.urls')),
    path('pmedian/', include('pmedian.urls'))
]

