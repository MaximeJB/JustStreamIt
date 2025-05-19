# config/urls.py

from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # 1) Page d’accueil front-end
    path(
        "",
        TemplateView.as_view(template_name="index.html"),
        name="home",
    ),

    # 2) Admin Django
    path("admin/", admin.site.urls),

    # 3) API
    path("api/v1/genres/", include("api.v1.genres.urls")),
    path("api/v1/titles/", include("api.v1.titles.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])