from django.urls import path,include
from .views import ApiView, Login
from . import views
from rest_framework import routers
from django.contrib import admin

router = routers.DefaultRouter()
router.register('api', ApiView, basename='UserManager')

urlpatterns = [
    path('',include(router.urls)), 
    path('registro/', views.Registro, name='registro'),    
    path('votar_respuesta/', views.votar_respuesta, name='votar_respuesta'),
    path('usuario-info/', views.obtenerUsuario, name='user-info'),
    path('registroForo/', views.RegistroForo, name='registroParti_foro'),    
    path('registroParti_foro/', views.ParticipacionForo, name='registroParti_foro'),    
    path('eliminarParti_foro/<int:id_participacion_foro>/', views.eliminarPartiForo, name='eliminarParti_foro'),
    path('eliminarRegistro_foro/<int:id_foro>/', views.eliminarRegistroForo, name='eliminarRegistroForo'),    
    path('login/', views.Login, name='login'),
    path('usuario/<username>/', views.obtenerUsuario, name='usuario'),    
    #path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/', include('allauth.urls')),
    path('admin/', admin.site.urls),
    path('ejercicio/', views.ejercicio_python, name='ejercicio'),
    path("insignias/", views.obtener_insignias, name="insignias-usuario"),
    path("insigniasPrueba/", views.otorgar_insignia_20_ejercicios, name="insignias-usuario"),

    path('guardar-intento/', views.guardar_intento, name="guardar_intento"),
    path('intentos/<int:usuario_id>/', views.obtener_intentos, name="obtener_intentos"),

    path('intento/', views.intento, name='intento'),
    path('score/<int:user_id>/', views.get_score, name='get_score'),
    path('run_code/', views.run_code, name='run_code'),
    path('progreso/', views.ProgresoVersionNueva, name='progreso'),

]