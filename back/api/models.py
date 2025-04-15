from django.db import models
from django.contrib.auth.models import User

# ✅ Modelo de Perfil (para dados extras no usuário)
class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    telefone = models.CharField(max_length=20)
    role = models.CharField(
        max_length=20,
        choices=[
            ("tecnico", "Técnico"),
            ("chefe", "Chefe de Manutenção"),
            ("admin", "Administrador"),
        ]
    )

    def __str__(self):
        return f"{self.user.username} ({self.role})"


# 📦 Patrimônios
class Patrimonios(models.Model):
    ni = models.CharField(max_length=255)
    desc = models.CharField(max_length=255)
    loca = models.CharField(max_length=255)


# 🏢 Ambientes
class Ambientes(models.Model):
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    resp = models.CharField(max_length=255)


# 🔧 Manutentores
class Manutentores(models.Model):
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    area = models.CharField(max_length=255)
    gestor = models.CharField(max_length=255)


# 👨‍💼 Gestores
class Gestor(models.Model):
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    area = models.CharField(max_length=255)
    cargo = models.CharField(max_length=255)


# 📝 Ordem de Serviço
class OrdemServico(models.Model):
    desc = models.CharField(max_length=255)
    abert = models.DateTimeField()
    fecha = models.DateTimeField()
    status = models.CharField(max_length=255)
    patri = models.CharField(max_length=255)
    ambi = models.CharField(max_length=255)
    manut = models.CharField(max_length=255)
    resp = models.CharField(max_length=255)
    prior = models.CharField(max_length=255)
