from django.db import models

# Create your models here.
class Pdf(models.Model):
    url = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
