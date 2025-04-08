from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    path('patrimonios', PatrimoniosView.as_view()),
    path('ambientes', AmbientesView.as_view()),
    path('manutentores', ManutentoresView.as_view()),
    path('gestor', GestorView.as_view()),
    path('ordemServico', OrdemServicoView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]

