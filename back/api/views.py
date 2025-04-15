from django.contrib.auth.models import User
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Patrimonios, Ambientes, Manutentores, Gestor, OrdemServico, Perfil
from .serializers import (
    UserSerializer,
    PatrimoniosSerializer,
    AmbientesSerializer,
    ManutentoresSerializer,
    GestorSerializer,
    OrdemServicoSerializer
)


# 👤 Criar usuários (apenas admin pode usar)
class CreateUserView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


# ✅ Cadastro com dados extras
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def signup(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    phone = request.data.get("phone")
    role = request.data.get("role")

    if not all([username, email, password, phone, role]):
        return Response({"error": "Todos os campos são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Nome de usuário já existe."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        Perfil.objects.create(user=user, telefone=phone, role=role)
        return Response({"message": "Usuário cadastrado com sucesso!"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# 🔐 Login com JWT
class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]


# 📦 Patrimônios
class PatrimoniosView(ListCreateAPIView):
    queryset = Patrimonios.objects.all()
    serializer_class = PatrimoniosSerializer


class PatrimoniosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Patrimonios.objects.all()
    serializer_class = PatrimoniosSerializer


# 🏢 Ambientes
class AmbientesView(ListCreateAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer


class AmbientesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer


# 🔧 Manutentores
class ManutentoresView(ListCreateAPIView):
    queryset = Manutentores.objects.all()
    serializer_class = ManutentoresSerializer


class ManutentoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Manutentores.objects.all()
    serializer_class = ManutentoresSerializer


# 👨‍💼 Gestores
class GestorView(ListCreateAPIView):
    queryset = Gestor.objects.all()
    serializer_class = GestorSerializer


class GestorDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Gestor.objects.all()
    serializer_class = GestorSerializer


# 📝 Ordem de Serviço
class OrdemServicoView(ListCreateAPIView):
    queryset = OrdemServico.objects.all()
    serializer_class = OrdemServicoSerializer
