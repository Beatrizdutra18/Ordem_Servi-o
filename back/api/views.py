from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import *
from .serializers import *


class PatrimoniosView(ListCreateAPIView):
    queryset = Patrimonios.objects.all()
    serializer_class = PatrimoniosSerializer
    
class AmbientesView(ListCreateAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer

class ManutentoresView(ListCreateAPIView):
    queryset = Manutentores.objects.all()
    serializer_class = ManutentoresSerializer

class GestorView(ListCreateAPIView):
    queryset = Gestor.objects.all()
    serializer_class = GestorSerializer

class OrdemServicoView(ListCreateAPIView):
    queryset = OrdemServico.objects.all()
    serializer_class = OrdemServicoSerializer