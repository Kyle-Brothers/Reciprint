from django.db import models

# Create your models here.
class Pdf(models.model):
    url = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
