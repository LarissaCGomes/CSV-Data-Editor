from django.urls import path
from .views import FileUploadView

urlpatterns = [
    path('upload-csv/', FileUploadView.as_view(), name='upload-csv')
]