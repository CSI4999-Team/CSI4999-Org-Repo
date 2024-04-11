from django.urls import path
from .views import parse_pdf
from .views import analyze_resume
from .views import user_create
from . import views

urlpatterns = [
    path('parse_pdf/', parse_pdf, name='parse_pdf'),
    path('analyze_resume/', views.analyze_resume, name='analyze_resume'),
    path('user/create/', user_create, name='user_create'),
]
