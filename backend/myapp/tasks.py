# tasks.py
from celery import shared_task
from django.utils.timezone import now
from .models import VidasUsuario

@shared_task
def resetear_vidas():
    vidas_actualizadas = VidasUsuario.objects.update(vidas_restantes=5)
    return f"Vidas reseteadas para {vidas_actualizadas} usuarios el {now()}."