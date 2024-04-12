from django.urls import path
from .views import parse_pdf
from .views import analyze_resume
from .views import get_user_data
from . import views

urlpatterns = [
    path('parse_pdf/', parse_pdf, name='parse_pdf'),
    path('analyze_resume/', views.analyze_resume, name='analyze_resume'),
    path('user-data/<str:auth0_id>/', get_user_data, name='get_user_data'),
    path('delete-data/<int:data_id>/', views.delete_user_data, name='delete_data'),
]
