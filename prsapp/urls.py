from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('prs/', include('prs.urls')),
    path('pmedian/', include('pmedian.urls')),
    path('', include('front.urls')),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
