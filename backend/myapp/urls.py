from django.urls import path,include
from .views import ApiView, Login
from . import views
from rest_framework import routers
from django.contrib import admin
from rest_framework_simplejwt.views import TokenRefreshView
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
    path("participaciones/", views.ParticipacionForo, name="participaciones"),
    path("logout/", views.logout, name="logout"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', views.Login, name='login'),
    path("google-login/", views.google_login, name="google-login"),
    path('usuario/<username>/', views.obtenerUsuario, name='usuario'),    
    #path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/', include('allauth.urls')),
    path('admin/', admin.site.urls),
    path('ejercicio/', views.ejercicio_python, name='ejercicio'),
    path("insignias/", views.obtener_insignias, name="insignias-usuario"),
    path("insigniasPrueba/", views.otorgar_insignia_20_ejercicios, name="insignias-usuario"),
    path("verificar_nivel_completado/", views.verificar_nivel_completado, name="nivel_completado"),

    path('intentos/<int:usuario_id>/', views.obtener_intentos, name="obtener_intentos"),

    path("guardar_ejercicio/", views.guardar_ejercicio, name="guardar_ejercicio"),
    path("ejercicios_usuario/<int:usuario_id>/", views.obtener_ejercicios_usuario, name="obtener_ejercicios_usuario"),
    path('id_ejercicio_asignado/<int:ejercicio_id>/', views.obtener_ejercicio_asignado, name='ejercicio_id'),
    path('nivel_ejercicio_asignado/<int:ejercicio_id>/', views.obtener_nivel_ejercicio_asignado, name='nivel_ejercicio_asignado'),

    path('vidas/<int:user_id>/', views.obtener_vidas, name='obtener_vidas'),
#    path('restaurar-vidas/<int:user_id>/', views.restaurar_vidas, name='restaurar-vidas'),
    
    path('logros-usuario/', views.obtener_logros_usuario, name='logros'),
    path('otorgar_logros/', views.verificar_y_otorgar_logros, name='otorgar_logros'),
    path('ranking',views.ranking_usuarios, name='ranking_usuarios'),

    path('usuarios/', views.listar_usuarios, name='listar_usuarios'), 
    path('editar-usuario/<int:user_id>/', views.editar_usuario, name='actualizar-user'),
    path('usuario/<int:user_id>/', views.obtener_usuario, name='obtener_usuario'), 
    path('crear-usuario/', views.crear_usuario, name='crear_usuario'), 


    path('guardar-intento/', views.guardar_intento, name="guardar_intento"),
    path('score/<int:user_id>/', views.get_score, name='get_score'),
    path('actualizar-puntaje/', views.actualizar_puntaje_usuario, name='actualizar_score'),

    path('run_code/', views.run_code, name='run_code'),
    path('progreso/', views.ProgresoVersionNueva, name='progreso'),

]