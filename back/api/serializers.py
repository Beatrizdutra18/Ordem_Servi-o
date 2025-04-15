from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):															 
    password = serializers.CharField(write_only=True, required=True)
class Meta:
    model = User
    fields = ['username', 'email', 'password']

def create(self, validated_data):
    validated_data['password'] = make_password(validated_data.get('password'))
    return super(UserSerializer, self).create(validated_data)


class PatrimoniosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patrimonios
        fields = '__all__'

class AmbientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambientes
        fields = '__all__'

class ManutentoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manutentores
        fields = '__all__'

class GestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gestor
        fields = '__all__'

class OrdemServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdemServico
        fields = '__all__'