from django.urls import path, include
from .views import process

urlpatterns = [
    path("", process, name='process_data'),
]
