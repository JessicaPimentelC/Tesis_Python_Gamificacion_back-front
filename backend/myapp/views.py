from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes, authentication_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, authenticate, login
from .serializer import UserSerializer,UsuarioSerializer, ForoSerializer,ParticipacionForoSerializer, EjercicioSerializer, IntentoSerializer, UsuarioLogroSerializer,InsigniaConFechaSerializer,UsuarioEditarSerializer
from django.contrib.auth import get_user_model
from .models import Foro, Nivel,Puntaje, Participacion_foro, Ejercicio,Logro, Intento, UsuarioEjercicioInsignia, Insignia, IntentoEjercicio, EjercicioAsignado,Usuario_logro,Ranking,VidasUsuario,Usuario_insignia
import subprocess
from datetime import date
from django.db.models import Sum
from .utils import evaluar_insignias
from django.shortcuts import get_object_or_404
import json
from django.http import JsonResponse
from django.utils.timezone import now
from google.auth.transport import requests
from google.oauth2 import id_token
from datetime import timedelta
from django.utils import timezone
User = get_user_model()

#class ApiView(generics.ListCreateAPIView):
class ApiView(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

@csrf_exempt  
@api_view(['GET'])
def get_user_info(request):
    username = request.GET.get('username')  # Obtener el parámetro 'username' de la URL
    if username:
        try:
            # Buscar al usuario por su nombre de usuario
            user = User.objects.get(username=username)
            return Response({
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'El parámetro "username" es obligatorio'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def Registro(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'Usuario creado exitosamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        return Response({'message': 'Debe enviar ua peticion POST'}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def obtenerUsuario(request):
    if request.user.is_authenticated:
        usuario = request.user
        return Response({'id': usuario.id,  'username': usuario.username, 'email': usuario.email , 'last_login':usuario.last_login}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Usuario no autenticado'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@csrf_exempt
def Login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    print(f"email: {email}, Password: {password}")

    try:
        user = User.objects.get(email=email)
        print(f"Usuario encontrado: {user}")
    except User.DoesNotExist:
        print("Usuario no encontrado")
        return Response({'message': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    # Autenticación del usuario
    user = authenticate(request, username=user.username, password=password)

    if user is not None:
        # Inicia una sesión para el usuario
        login(request, user)
        return Response({'message': 'Inicio de sesión exitoso'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

CLIENT_ID="567858506235-sd9fvbkheo3rnggdfpmnfjp63t6rgej3.apps.googleusercontent.com"
@csrf_exempt
@api_view(["POST"])
def google_login(request):
    token = request.data.get("token")

    if not token:
        return JsonResponse({"error": "No se recibió el token"}, status=400)

    try:
        print("Token recibido en backend:", token)  # Verifica que el token llega correctamente

        google_user = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        print("Usuario de Google:", google_user)  # Verifica qué datos devuelve Google

        if not google_user:
            return JsonResponse({"error": "Token inválido"}, status=400)

        email = google_user["email"]
        name = google_user.get("name", "")

        name_parts = name.split(" ", 1)  
        first_name = name_parts[0]  
        last_name = name_parts[1] if len(name_parts) > 1 else ""  

        user, created = User.objects.get_or_create(email=email, defaults={"username": email, "first_name": first_name,"last_name":last_name })

        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)

        return JsonResponse({
            "message": "Inicio de sesión exitoso",
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
            "user": {"id": user.id, "email": user.email, "name": user.first_name},
        })

    except Exception as e:
        print("Error en la autenticación:", e)  # Imprime el error exacto en la terminal
        return JsonResponse({"error": str(e)}, status=400)


@api_view(['GET', 'POST'])
def RegistroForo(request):
    if request.method == 'POST':
        print("Datos recibidos en la API:", request.data)  # Verifica los datos en la consola

        usuario_id = request.data.get("usuario_id")
        if not usuario_id:
            return Response({'error': 'El usuario_id es obligatorio'}, status=status.HTTP_400_BAD_REQUEST)

        # Intentar obtener la instancia de User
        try:
            usuario = User.objects.get(id=usuario_id)
            print(f"Usuario encontrado: {usuario} (ID: {usuario.id})")  # Depuración
        except User.DoesNotExist:
            return Response({'error': 'El usuario no existe'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar el tipo de usuario antes de asignarlo
        if not isinstance(usuario, User):
            print(f"Error: usuario no es una instancia de User, es {type(usuario)}")
            return Response({'error': 'El usuario no es válido'}, status=status.HTTP_400_BAD_REQUEST)

        # Crear el foro manualmente para evitar problemas con el serializador
        foro = Foro(
            usuario_id=usuario.id,  # Asignamos la instancia real del usuario
            tema=request.data.get("tema"),
            descripcion=request.data.get("descripcion"),
            fecha_creacion=request.data.get("fecha_creacion"),
        )

        foro.save()
        print(f"Foro guardado con ID: {foro.id_foro}")  # Confirmación

        # Serializamos la instancia guardada para la respuesta
        serializer = ForoSerializer(foro)
        return Response({'message': 'Foro creado exitosamente', 'foro': serializer.data}, status=status.HTTP_201_CREATED)

    elif request.method == 'GET':
        foros = Foro.objects.all()
        serializer = ForoSerializer(foros, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET','DELETE'])
def eliminarRegistroForo(request, id_foro):
    try:
        print(f"Intentando eliminar foro con ID: {id_foro}")  # 🛠️ Debug
        participacion = Foro.objects.get(id_foro=id_foro)
        print(f"Registro encontrado: {participacion}")  # 🛠️ Debug
        participacion.delete()
        return Response({'message': 'Pregunta eliminada exitosamente'}, status=status.HTTP_200_OK)
    except Foro.DoesNotExist:
        return Response({'error': 'Pregunta no encontrada'}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['GET', 'POST'])
def ParticipacionForo(request):
    if request.method == 'POST':
        serializer = ParticipacionForoSerializer(data=request.data)
        if serializer.is_valid():
            participacionForo = serializer.save()
            return Response({'message': 'Respuesta foro creada exitosamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        participacion = Participacion_foro.objects.all()
        serializer = ParticipacionForoSerializer(participacion, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET','DELETE'])
def eliminarPartiForo(request, id_participacion_foro):
    try:
        # Filtra usando el campo clave primaria
        participacion = Participacion_foro.objects.get(id_participacion_foro=id_participacion_foro)
        participacion.delete()
        return Response({'message': 'Participación eliminada exitosamente'}, status=status.HTTP_200_OK)
    except Participacion_foro.DoesNotExist:
        return Response({'error': 'Participación no encontrada'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def obtener_ejercicio_asignado(request, ejercicio_id):
    try:
        ejercicio = EjercicioAsignado.objects.get(id=ejercicio_id)
        return Response({"id_ejercicio": ejercicio.id, "nivel_id": ejercicio.nivel.id})
    except EjercicioAsignado.DoesNotExist:
        return Response({"error": "Ejercicio no encontrado"}, status=404)

@api_view(['GET'])
def obtener_nivel_ejercicio_asignado(request, ejercicio_id):
    """
    Devuelve el nivel del ejercicio asignado basado en el ID del ejercicio.
    """
    try:
        ejercicio_asignado = EjercicioAsignado.objects.filter(ejercicio_id=ejercicio_id).select_related('ejercicio__nivel').first()

        if not ejercicio_asignado:
            return Response({"error": "No hay un ejercicio asignado con este ID"}, status=404)

        return Response({
            "id_ejercicio": ejercicio_asignado.ejercicio.id_ejercicio,
            "titulo": ejercicio_asignado.ejercicio.titulo,
            "nivel_id": ejercicio_asignado.ejercicio.nivel.id_nivel if ejercicio_asignado.ejercicio.nivel else None,
            "nivel_nombre": ejercicio_asignado.ejercicio.nivel.nombre if ejercicio_asignado.ejercicio.nivel else "Sin nivel"
        })
    except EjercicioAsignado.DoesNotExist:
        return Response({"error": "El ejercicio asignado no existe"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(['GET', 'POST'])
def ejercicio_python(request):
    if request.method == 'POST':
        try:
            serializer = EjercicioSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'message': 'Ejercicio creado exitosamente',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
            return Response({
                'message': 'Error de validación',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'message': 'Ocurrió un error inesperado',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'GET':
        try:
            ejercicios = Ejercicio.objects.all()
            serializer = EjercicioSerializer(ejercicios, many=True)
            return Response({
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['POST'])
def guardar_intento(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Usuario no autenticado'}, status=401)

    serializer = IntentoSerializer(data=request.data)
    usuario = request.user.id # Obtiene el usuario autenticado

    if serializer.is_valid():
        intento = serializer.save()
        vidas_usuario, created = VidasUsuario.objects.get_or_create(usuario=usuario)
        if intento.resultado is False:
            if vidas_usuario.vidas_restantes > 0:
                #vidas_usuario.vidas_restantes -= 1
                vidas_usuario.save()  # Guardamos el cambio        

        # Verificar si el usuario se quedó sin vidas
        if vidas_usuario.vidas_restantes == 0:
            return Response({'message': 'No tienes más vidas', 'vidas': vidas_usuario.vidas_restantes}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'message': 'Intento guardado exitosamente',
            'vidas': vidas_usuario.vidas_restantes,
            'errores': intento.errores  # Mostrar cantidad de errores en la respuesta
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_vidas(request, user_id):
    try:
        if not request.user.is_authenticated:
            return Response({'error': 'Usuario no autenticado'}, status=401)

        usuario = request.user.id # Obtiene el usuario autenticado
        
        vidas_usuario, _ = VidasUsuario.objects.get_or_create(usuario=usuario)
        print("vidas_en OBTENER vidas",vidas_usuario.vidas_restantes)
        # Restaurar automáticamente si pasó el tiempo
        #OJO PENDIENTE DESCOMENTAR
        actualizar_vidas_si_corresponde(vidas_usuario)
        
        return Response({'vidas_restantes': vidas_usuario.vidas_restantes}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

def actualizar_vidas_si_corresponde(vidas_usuario):
    ahora = timezone.now()
    intervalo = timedelta(minutes=30)  # Cada 30 minutos

    # Verificar si ha pasado al menos un intervalo
    if ahora - vidas_usuario.ultima_actualizacion >= intervalo and vidas_usuario.vidas_restantes < 5:
        vidas_usuario.vidas_restantes += 1  # Solo sumamos 1 vida
        vidas_usuario.ultima_actualizacion = ahora  # Actualizamos a "ahora"
        vidas_usuario.save()
        print("🟢 Se restauró 1 vida. Total ahora:", vidas_usuario.vidas_restantes)

@api_view(['GET'])
def ProgresoVersionNueva(request):
    if request.method == 'GET':
        user = request.user
        # Supongamos que los ejercicios están relacionados con el usuario
        total_ejercicios = Ejercicio.objects.count()  # Total de ejercicios en la base de datos
        completados = Ejercicio.objects.filter(terminado=True).count()  # Ejercicios completados por el usuario
        
        if total_ejercicios > 0:
            porcentaje = (completados / total_ejercicios) * 100  # Calcula el porcentaje completado
        else:
            porcentaje = 0
        
        return Response({'porcentaje en view': porcentaje})
    
def actualizar_puntaje_usuario(user_id):
    try:
        # ✅ Asegurarse de que sea una instancia de User
        user_instance = User.objects.get(id=user_id).id
        print("usuario_instancia",user_instance);
        # Ejercicios correctos únicos
        ejercicios_correctos = (
            Intento.objects.filter(usuario=user_instance, resultado=True)
            .values('ejercicio_id')
            .distinct()
            .count()
        )
        puntos_por_ejercicio = ejercicios_correctos * 10

        # Penalización por errores
        penalizacion_errores = (
            Intento.objects.filter(usuario=user_instance, resultado=True)
            .aggregate(total_errores=Sum('errores'))['total_errores'] or 0
        )

        # Votos positivos en el foro
        votos_positivos = (
            Participacion_foro.objects.filter(usuario=user_instance, resultado=True).count()
        )
        puntos_por_votos = votos_positivos * 50

        puntaje_total = puntos_por_ejercicio - penalizacion_errores + puntos_por_votos

        # Ahora, obtenemos o creamos el Puntaje
        puntaje, created = Puntaje.objects.get_or_create(usuario=user_instance)

        # Actualizamos el puntaje
        puntaje.puntos = max(puntaje_total, 0)  # Aseguramos que el puntaje no sea negativo
        puntaje.save()  # Guardamos el puntaje

        return puntaje.puntos  # Devolvemos el puntaje actualizado
    except User.DoesNotExist:
        return None
    
@api_view(['GET'])
def get_score(request, user_id):
    try:
        user_instance = User.objects.get(id=user_id).id
        puntaje = Puntaje.objects.get(usuario=user_instance)
        return Response({'score': puntaje.puntos}, status=200)
    except User.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)
    except Puntaje.DoesNotExist:
        return Response({'score': 0}, status=200)  # Si aún no tiene puntaje

def verificar_actividad_consecutiva(usuario, dias):
    fechas = usuario.ejercicios_completados.values_list('fecha', flat=True).order_by('fecha')
    # Implementa lógica para verificar días consecutivos
    return len(set(fechas)) >= dias

def postCompletoEjercicio(self, request):
    usuario = request.user
    ejercicio_id = request.data.get('ejercicio_id')
    exito = request.data.get('exito')  # True si el usuario completó el ejercicio con éxito

    # Registrar el ejercicio completado
    ejercicio = Ejercicio.objects.get(id=ejercicio_id)
    usuario.ejercicios_completados.create(ejercicio=ejercicio, exito=exito)

    # Evaluar insignias
    insignias_ganadas = evaluar_insignias(usuario)

    return Response({
        "mensaje": "Ejercicio completado",
        "insignias_ganadas": [{"nombre": i.nombre, "descripcion": i.descripcion} for i in insignias_ganadas]
    })
# Función para verificar rapidez (esto depende de cómo defines rapidez)
def verificar_rapidez(usuario_id):
    intentos = Intento.objects.filter(usuario_id=usuario_id, resultado=True).order_by('fecha_intento')[:5]
    if len(intentos) < 5:
        return False  # Si no ha hecho al menos 5 ejercicios, no se evalúa rapidez

    tiempos = [intento.tiempo_resolucion for intento in intentos]
    return sum(tiempos) / len(tiempos) <= 30  # Ejemplo: si el promedio de tiempo es menor o igual a 30 segundos

def contar_ejercicios_realizados(usuario_id):
    return Intento.objects.filter(usuario_id=usuario_id, resultado=True).values('ejercicio_id').distinct().count()

def cumple_condicion_insignia(usuario_id, insignia_id):
    """
    Verifica si un usuario cumple la condición para obtener una insignia.
    """
    if insignia_id == 1:  # Junior - Completar Nivel 1
        return completar_nivel(usuario_id, 1)
    elif insignia_id == 2:  # Semi Senior - Completar Nivel 2
        return completar_nivel(usuario_id, 2)
    elif insignia_id == 3:  # Senior - Completar Nivel 3
        return completar_nivel(usuario_id, 3)
    elif insignia_id == 4:  # Rapidez - Completar ejercicios en menos de cierto tiempo
        return verificar_rapidez(usuario_id)  # Función que verifica si los ejercicios fueron rápidos
    elif insignia_id == 5:  # 20_Ejercicios - Completar 20 ejercicios correctos únicos
        return contar_ejercicios_realizados(usuario_id) >= 20

    return False  # Si no hay una regla definida para esa insignia

def verificar_y_otorgar_insignia(usuario_id):
    """
    Verifica si el usuario cumple las condiciones para obtener una insignia
    y la otorga solo si no la tiene aún.
    """

    # Definir qué logros otorgan insignias
    logros_a_insignias = {
        1: 1,  # Logro "Completar Nivel 1" → Insignia "Junior"
        2: 2,  # Logro "Completar Nivel 2" → Insignia "Semi senior"
        3: 3,  # Logro "Completar Nivel 3" → Insignia "Senior"
        7: 5,  # Logro "Alcanzar 20 ejercicios" → Insignia "20_Ejercicios"
        4: 4   # Logro "Rapidez" → Insignia "Rapidez"
    }

    insignia_otorgada = False  # Para saber si se entregó alguna

    for logro_id, insignia_id in logros_a_insignias.items():
        if cumple_condicion_logro(usuario_id, logro_id):  
            # Verificar si el usuario ya tiene la insignia
            if not Usuario_insignia.objects.filter(usuario_id=usuario_id, insignia_id=insignia_id).exists():
                # Otorgar la insignia
                Usuario_insignia.objects.create(
                    usuario_id=usuario_id,
                    insignia_id=Insignia.objects.get(id_insignia=insignia_id),
                    fecha_otorgada=now().date()
                )
                insignia_otorgada = True  

    return insignia_otorgada  # Devuelve True si otorgó alguna insignia



# Vista para obtener las insignias y verificar si deben ser otorgadas
@api_view(['GET'])
def obtener_insignias(request):
    if not request.user.is_authenticated:
        return Response({"error": "No estás autenticado"}, status=401)

    usuario_id = request.user.id

    # Intentar otorgar insignias si aún no las tiene
    insignias_otorgadas = verificar_y_otorgar_insignia(usuario_id)

    # Obtener todas las insignias del usuario
    insignias_obtenidas = UsuarioEjercicioInsignia.objects.filter(usuario_id=usuario_id).select_related('insignia')

    # Serializar las insignias obtenidas
    serializer = InsigniaConFechaSerializer(insignias_obtenidas, many=True)

    # Definir mensaje solo si se otorgó una nueva insignia
    #mensaje = "¡Has obtenido una nueva insignia!" if insignias_otorgadas else ""
    if insignias_otorgadas:
        nombres = ", ".join([insignia.nombre for insignia in insignias_otorgadas])
        mensaje = f"¡Has obtenido una nueva insignia! {nombres}"
    else:
        mensaje = ""
    return Response({
        "insignias": serializer.data,
        "nuevas_insignias": insignias_otorgadas,
        "mensaje": mensaje  # Enviamos el mensaje al frontend
    })

@csrf_exempt
@api_view(['POST'])
def otorgar_insignia_20_ejercicios(request):
    # Verificar si el usuario está autenticado
    if not request.user.is_authenticated:
        return Response({"error": "No estás autenticado"}, status=status.HTTP_401_UNAUTHORIZED)

    usuario_id = request.user.id  

    # Contar los ejercicios completados por el usuario
    ejercicios_completados = UsuarioEjercicioInsignia.objects.filter(usuario_id=usuario_id, completado=True).count()

    # Verificar si el usuario ya tiene la insignia
    try:
        insignia_20 = Insignia.objects.get(tipo="Insignia de 20 ejercicios")
    except Insignia.DoesNotExist:
        return Response({"error": "Insignia no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    if ejercicios_completados >= 20 and not UsuarioEjercicioInsignia.objects.filter(usuario_id=usuario_id, insignia=insignia_20).exists():
        UsuarioEjercicioInsignia.objects.create(usuario_id=usuario_id, insignia=insignia_20)
        return Response({"message": f"¡Insignia otorgada: {insignia_20.tipo}!"}, status=status.HTTP_201_CREATED)

    return Response({"message": "No se han cumplido los requisitos para otorgar insignias."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_intentos(request, usuario_id):
    intentos = Intento.objects.filter(usuario_id=usuario_id).order_by('-fecha')
    data = [
        {
            "usuario": intento.usuario.id,
            "ejercicio": intento.ejercicio.titulo,
            "resultado": intento.resultado,
            "errores": intento.errores,
            "fecha": intento.fecha.strftime('%Y-%m-%d %H:%M')
        }
        for intento in intentos
    ]
    return Response(data)


@api_view(['POST'])
def run_code(request):
    if request.method == 'POST':
        codigo = request.data.get('codigo')
        #codigo = "print('hola mundo')"

        if not codigo:
            return Response({"error": "No hay codigo"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            process = subprocess.Popen(['python3', '-c', codigo], text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            stdout, stderr = process.communicate()
            if process.returncode != 0:
                return Response({"error": stderr.decode('utf-8')}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"output": stdout.decode('utf-8')}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def votar_respuesta(request):
    participacion_id = request.data.get('id_participacion_foro')
    voto = request.data.get('resultado')

    try:
        participacion = Participacion_foro.objects.get(id_participacion_foro=participacion_id)

        # Ahora obtenemos directamente la instancia del usuario
        user_instance = participacion.usuario

        if not user_instance:
            return Response({'success': False, 'error': 'Usuario no asignado a la participación'}, status=400)

        puntaje, created = Puntaje.objects.get_or_create(usuario=user_instance)

        if voto == 'like':
            participacion.resultado = True
            puntaje.puntos += 50
        elif voto == 'dislike':
            participacion.resultado = False

        participacion.save()
        puntaje.save()

        return Response({
            'success': True,
            'resultado': participacion.resultado,
            'puntaje': puntaje.puntos
        })

    except Participacion_foro.DoesNotExist:
        return Response({'success': False, 'error': 'Participación no encontrada'}, status=404)


@csrf_exempt
def guardar_ejercicio(request):
    if request.method == "POST":
        try:
            # Obtener los datos del cuerpo de la solicitud
            data = json.loads(request.body)
            usuario_id = data.get("usuario_id")
            ejercicio_id = data.get("ejercicio_id")

            if not usuario_id or not ejercicio_id:
                return JsonResponse({"error": "Datos incompletos"}, status=400)

            usuario = User.objects.get(id=usuario_id)  # Recuperar usuario
            ejercicio = Ejercicio.objects.get(id_ejercicio=ejercicio_id)

            ejercicio_asignado = EjercicioAsignado(
                usuario=usuario,
                ejercicio=ejercicio,
                fecha_asignacion=now(),
            )

            ejercicio_asignado.save()  # Guardar en la base de datos

            return JsonResponse({"mensaje": "Ejercicio guardado correctamente", "id": ejercicio_asignado.id})
        except User.DoesNotExist:
            return JsonResponse({"error": "Usuario no encontrado"}, status=404)
        except Ejercicio.DoesNotExist:
            return JsonResponse({"error": "Ejercicio no encontrado"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


def obtener_ejercicios_usuario(request, usuario_id):
    try:
        # Obtener los ejercicios asignados al usuario
        ejercicios_asignados = EjercicioAsignado.objects.filter(usuario_id=usuario_id)
        
        # Crear una lista con los IDs de los ejercicios asignados
        ejercicios = [ea.ejercicio.id_ejercicio for ea in ejercicios_asignados]
        
        return JsonResponse({"ejercicios": ejercicios})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(['GET'])
def obtener_logros_usuario(request):
    if not request.user.is_authenticated:
        return Response({"error": "No estás autenticado"}, status=401)

    usuario_id = request.user.id  
    logros_obtenidos = Usuario_logro.objects.filter(usuario_id=usuario_id).select_related('logro_id') 
    serializer = UsuarioLogroSerializer(logros_obtenidos, many=True)
    
    return Response(serializer.data)

@api_view(['PUT','GET'])
@permission_classes([IsAuthenticated])  # 🔹 Asegurar que el usuario esté autenticado
def editar_usuario(request, user_id):
    usuario = request.user  # 🔹 Obtener el usuario autenticado

    # 🔹 Solo permitir editar su propio perfil o si es superusuario
    if usuario.id != user_id and not usuario.is_superuser:
        return Response({"error": "No tienes permiso para editar este usuario"}, status=status.HTTP_403_FORBIDDEN)

    try:
        usuario_obj = User.objects.get(id=user_id)  # Buscar usuario por ID
    except User.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    serializer = UsuarioEditarSerializer(usuario_obj, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#LOGROS
@api_view(['POST'])
def verificar_y_otorgar_logros(request):
    if not request.user.is_authenticated:
        return Response({"error": "No estás autenticado"}, status=401)

    usuario_id = request.user.id
    logros_obtenidos = []

    # Obtener todos los logros disponibles
    logros = Logro.objects.all()

    for logro in logros:
        # Verificar si el usuario ya tiene este logro
        if Usuario_logro.objects.filter(usuario_id=usuario_id, logro_id=logro.id_logro).exists():
            continue  # Si ya lo tiene, pasamos al siguiente

        # Evaluar si el usuario cumple la condición para obtener el logro
        if cumple_condicion_logro(usuario_id, logro.id_logro):
            Usuario_logro.objects.create(usuario_id=usuario_id, logro_id=logro, fecha_completado=date.today())
            logros_obtenidos.append(logro.nombre)

    if logros_obtenidos:
        return Response({"message": f"¡Logros otorgados: {', '.join(logros_obtenidos)}!"}, status=201)

    return Response({"message": "No se han cumplido los requisitos para otorgar logros."}, status=400)


def cumple_condicion_logro(usuario_id, logro_id):
    """
    Verifica si un usuario cumple la condición para obtener un logro.
    """
    if logro_id == 1:  # Completar nivel 1
        return completar_nivel(usuario_id, 1)
    elif logro_id == 2:  # Completar nivel 2
        return completar_nivel(usuario_id, 2)
    elif logro_id == 3:  # Completar nivel 3
        return completar_nivel(usuario_id, 3)
    elif logro_id == 4:  # Participar en el foro
        return Foro.objects.filter(usuario_id=usuario_id).exists()
    elif logro_id == 5:  # Responder en el foro
        return Participacion_foro.objects.filter(usuario_id=usuario_id).exists()
    elif logro_id == 6:  # Hacer un ejercicio al día por 7 días
        return EjercicioAsignado.objects.filter(usuario_id=usuario_id).count() >= 7
    elif logro_id == 7:  # Alcanzar un puntaje de 200
        return obtener_puntaje_total(usuario_id) >= 200
    elif logro_id == 8:  # Primeros lugares del ranking
        return Ranking.objects.filter(usuario_id=usuario_id).exists()    
    return False  # Si no hay una regla definida para ese logro


def obtener_puntaje_total(usuario_id):
    """
    Obtiene el puntaje total del usuario sumando los puntos de los ejercicios completados.
    """
    puntaje_total = EjercicioAsignado.objects.filter(usuario_id=usuario_id).aggregate(
        total=Sum('ejercicio__puntos')  # Accedemos a los puntos a través de la relación con `Ejercicio`
    )['total']
    
    return puntaje_total if puntaje_total else 0  # Si no tiene puntaje, devolver 0


def completar_nivel(usuario_id, nivel_id):
    """
    Verifica si un usuario ha completado un nivel específico y le otorga una insignia si es el caso.
    """
    # Verificar si el usuario ha completado al menos 2 ejercicios en el nivel con éxito
    ejercicios_completados = Intento.objects.filter(
        usuario_id=usuario_id,  
        ejercicio__nivel_id=nivel_id,  # Asegurar la relación correcta con el nivel
        resultado=True
    ).values('ejercicio').distinct().count()
    # Verificar si el usuario ha cumplido todos los logros requeridos para este nivel
    logros_requeridos = Logro.objects.filter(nivel_id=nivel_id).values_list("id_logro", flat=True)
    logros_obtenidos = Usuario_logro.objects.filter(
        usuario_id=usuario_id, 
        logro_id__in=logros_requeridos
    ).count()

    if ejercicios_completados >= 2 and logros_obtenidos >= len(logros_requeridos):
        # Intentar otorgar la insignia correspondiente
        otorgar_insignia(usuario_id, f"Completar Nivel {nivel_id}")
        return True  # Nivel completado
    return False  # Aún no ha completado el nivel

def otorgar_insignia(usuario_id, nombre_insignia):
    """
    Otorga una insignia a un usuario si aún no la tiene.
    """
    try:
        insignia = Insignia.objects.get(nombre=nombre_insignia)
        if not UsuarioEjercicioInsignia.objects.filter(usuario_id=usuario_id, insignia=insignia).exists():
            UsuarioEjercicioInsignia.objects.create(usuario_id=usuario_id, insignia=insignia)
            print(f"Insignia '{insignia.nombre}' otorgada al usuario {usuario_id}")
    except Insignia.DoesNotExist:
        print(f"Error: No se encontró la insignia '{nombre_insignia}'")

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def verificar_nivel_completado(request):#este se usa en el handleVerify
    if not request.user.is_authenticated:
        return Response({"error": "No estás autenticado"}, status=401)

    usuario_id = request.user.id
    nivel_id = request.data.get("nivel_id")  # Nivel enviado desde el frontend

    if completar_nivel(usuario_id, nivel_id):
        return Response({"mensaje": f"¡Felicidades! Has completado el Nivel {nivel_id} y recibido una insignia"})
    
    return Response({}, status=204)  # 🔹 No devuelve mensaje si no ha completado el nivel

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Solo usuarios autenticados pueden acceder
def listar_usuarios(request):
    usuarios = User.objects.all().values('id', 'username', 'email', 'last_login')  # Obtiene todos los usuarios
    return Response(usuarios, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Solo usuarios autenticados pueden acceder
def obtener_usuario(request, user_id):
    """Devuelve los datos de un usuario específico por su ID"""
    try:
        usuario = User.objects.get(id=user_id)
        serializer = UsuarioEditarSerializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

User = get_user_model()  # Obtiene el modelo `auth_user` de Django

@api_view(['POST'])
def crear_usuario(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()  # Ahora `save()` funciona correctamente

        return Response({
            'message': 'Usuario creado exitosamente',
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name':user.first_name,
            'last_name':user.last_name
        
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
