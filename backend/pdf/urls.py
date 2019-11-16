from rest_framework import routers
from .views import PdfViewSet


router = routers.DefaultRouter()
router.register(r'Pdf', PdfViewSet)