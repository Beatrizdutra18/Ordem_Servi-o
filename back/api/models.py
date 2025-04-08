from django.db import models

class Patrimonios(models.Model):
    ni = models.CharField(max_length=255) 
    desc = models.CharField(max_length=255)
    loca = models.CharField(max_length=255)

class Ambientes(models.Model):
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    resp = models.CharField(max_length=255)

class Manutentores(models.Model):
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    area = models.CharField(max_length=255)
    gestor = models.CharField(max_length=255)

class Gestor(models.Model):
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    area = models.CharField(max_length=255)
    cargo = models.CharField(max_length=255)

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