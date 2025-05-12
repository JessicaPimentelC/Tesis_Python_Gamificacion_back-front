print("Señales cargadas")  
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Intento, VidasUsuario, User
from django.utils import timezone
from django.contrib.auth.models import User

@receiver(post_save, sender=Intento)
def actualizar_vidas(sender, instance, created, **kwargs):
    if created and not instance.resultado:  # Si el intento es fallido
        vidas_usuario, created = VidasUsuario.objects.get_or_create(usuario=instance.usuario)
        vidas_usuario.vidas_restantes = max(0, vidas_usuario.vidas_restantes - 1)  # No permite valores negativos
        
        if vidas_usuario.vidas_restantes == 0:
            vidas_usuario.ultima_actualizacion = timezone.now()

        vidas_usuario.save()
