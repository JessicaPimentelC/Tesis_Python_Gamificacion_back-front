# celery.py
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tu_proyecto.settings')  # Reemplaza con el nombre de tu proyecto

celery_app = Celery('myapp')  # Nombre de la app
celery_app.config_from_object('django.conf:settings', namespace='CELERY')

celery_app.autodiscover_tasks()

celery_app.conf.beat_schedule = {
    'resetear_vidas_cada_dia': {
        'task': 'myapp.tasks.resetear_vidas',  # Reemplaza con el nombre de tu app
        'schedule': crontab(hour=0, minute=0),  # Se ejecuta todos los días a la medianoche
    },
}