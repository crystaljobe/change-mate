"""
URL configuration for changemate_proj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static 

# test connection 
def connection_test(request):
    return HttpResponse("Test was successful we are connected")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/v1/test/", connection_test),
    path('api/v1/users/', include('user_app.urls')),
    path('api/v1/events/', include('event_app.urls')),
    path('api/v1/userprofile/', include('profile_app.urls')),
    path('api/v1/interests/', include('interest_app.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)