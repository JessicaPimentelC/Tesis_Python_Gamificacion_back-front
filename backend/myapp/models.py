from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email,username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email,username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username,password, **extra_fields)

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150,unique=True)
    first_name = models.CharField(max_length=50, blank=True, null=True) 
    last_name = models.CharField(max_length=50, blank=True, null=True)  
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

class Nivel(models.Model):
    id_nivel = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(max_length=50)

class Ejercicio(models.Model):
    id_ejercicio = models.AutoField(auto_created=True, primary_key=True, verbose_name='ID')
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(max_length=500)
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name='ejercicios')
    codigo = models.TextField()  
    salida_esperada = models.TextField(blank=True, null=True)  
    puntos = models.IntegerField()

class EjercicioAsignado(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ejercicio = models.ForeignKey(Ejercicio, on_delete=models.CASCADE)  # Relacionado con el ejercicio
    fecha_asignacion = models.DateTimeField(auto_now_add=True)  # Fecha de asignación

class Foro(models.Model):
    id_foro = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    tema = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=200)
    fecha_creacion = models.DateField()
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

class Participacion_foro(models.Model):
    id_participacion_foro = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    usuario_id = models.IntegerField()
    foro_id = models.ForeignKey(Foro, on_delete=models.CASCADE, related_name='participaciones_foro')
    fecha_participacion = models.DateField()
    comentario = models.CharField(max_length=500)
    resultado = models.BooleanField()

class Insignia(models.Model):
    id_insignia = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    nombre = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=200)

class Recompensa(models.Model):
    id_recompensa = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    nombre = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=200)
    condicion = models.CharField(max_length=200)
    
class Logro(models.Model):
    id_logro = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    nombre = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=200)
    recompensa_id = models.ForeignKey(Recompensa, on_delete=models.CASCADE, related_name='recompensas_logro')
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name='logros', null=True, blank=True) 
    
class Ranking(models.Model):
    id_ranking = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usuario_ranking')
    posicion = models.CharField(max_length=50)
    fecha_actualizacion = models.DateField()

class Intento(models.Model):
    id_intento = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usuario_intentos')
    ejercicio = models.ForeignKey(Ejercicio, on_delete=models.CASCADE, related_name='intentos_ejercicios')
    fecha = models.DateField()
    resultado = models.BooleanField()
    errores = models.IntegerField()

class VidasUsuario(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='vidas_usuario')
    vidas_restantes = models.IntegerField(default=5)

    def __str__(self):
        return f"{self.usuario.username} - {self.vidas_restantes} vidas"


class IntentoEjercicio(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='intentos')
    ejercicio = models.ForeignKey(Ejercicio, on_delete=models.CASCADE, related_name='intentos')
    respuesta_usuario = models.TextField()  # Respuesta ingresada por el usuario
    es_correcto = models.BooleanField(default=False)  # Si la respuesta fue correcta o no
    fecha = models.DateTimeField(auto_now_add=True)  # Fecha del intento

    def __str__(self):
        return f"Intento de {self.usuario.username} en {self.ejercicio.titulo}"

class Usuario_insignia(models.Model):
    id_usuario_insignia = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usuario_insignia')
    insignia_id = models.ForeignKey(Insignia, on_delete=models.CASCADE, related_name='insignias')
    fecha_otorgada = models.DateField()

class UsuarioEjercicioInsignia(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    ejercicio = models.ForeignKey(Ejercicio, on_delete=models.CASCADE)
    insignia = models.ForeignKey('Insignia', on_delete=models.CASCADE)
    fecha_obtenida = models.DateTimeField(auto_now_add=True)

class Usuario_logro(models.Model):
    id_usuario_logro = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usuario_logro')
    logro_id = models.ForeignKey(Logro, on_delete=models.CASCADE, related_name='logros')
    fecha_completado = models.DateField()
    
class Usuario_recompensa(models.Model):
    id_usuario_recompensa = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usuario_recompensa')
    recompensa_id = models.ForeignKey(Recompensa, on_delete=models.CASCADE, related_name='recompensas')
    fecha_otorgada = models.DateField()

