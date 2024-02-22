from django.urls import path
from .views import process_pdf
from . import views

urlpatterns = [
    path('process_pdf/', process_pdf, name='process_pdf'),
    # testing view
    path('test/', views.my_view, name='test_view'),
]
