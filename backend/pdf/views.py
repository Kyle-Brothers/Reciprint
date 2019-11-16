from django.shortcuts import render

import django_filters
from rest_framework import viewsets, filters

from .models import Pdf
from .serializer import PdfSerializer


class PdfViewSet(viewsets.ModelViewSet):
    queryset = Pdf.objects.all()
    serializer_class = PdfSerializer



