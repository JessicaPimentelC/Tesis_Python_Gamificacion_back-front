from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, authenticate, login
from .serializer import UserSerializer,UsuarioSerializer, ForoSerializer,ParticipacionForoSerializer, EjercicioSerializer, IntentoSerializer, UsuarioLogroSerializer,InsigniaConFechaSerializer,UsuarioEditarSerializer
from django.contrib.auth import get_user_model
from .models import Foro, Nivel, Participacion_foro, Ejercicio,Logro, Intento, UsuarioEjercicioInsignia, Insignia, IntentoEjercicio, EjercicioAsignado,Usuario_logro,Ranking,VidasUsuario
import subprocess
from datetime import date
from django.db.models import Sum
from .utils import evaluar_insignias
from django.shortcuts import get_object_or_404
import json
from django.http import JsonResponse
from django.utils.timezone import now


User = get_user_model()

#class ApiView(generics.ListCreateAPIView):
class ApiView(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

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


@api_view(['GET', 'POST'])
def RegistroForo(request):
    if request.method == 'POST':
        print("Datos recibidos en la API:", request.data)  # Verifica los datos en la consola

        usuario_id = request.data.get("usuario_id")
        if not usuario_id:
            return Response({'error': 'El usuario_id es obligatorio'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ForoSerializer(data=request.data)
        if serializer.is_valid():
            foro = serializer.save()
            return Response({'message': 'Foro creado exitosamente'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    serializer = IntentoSerializer(data=request.data)
    if serializer.is_valid():
        intento = serializer.save()
        usuario = intento.usuario  # Relación con User
        
        # Contar intentos fallidos
        intentos_fallidos = Intento.objects.filter(usuario=usuario, resultado=False).count()
        
        # Calcular vidas restantes
        vidas_restantes = max(5 - intentos_fallidos, 0)

        if vidas_restantes == 0:
            return Response({'message': 'No tienes más vidas', 'vidas': vidas_restantes}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Intento guardado exitosamente', 'vidas': vidas_restantes}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_vidas(request, user_id):
    vidas_usuario = get_object_or_404(VidasUsuario, usuario_id=user_id)
    return Response({"vidas": vidas_usuario.vidas_restantes}, status=status.HTTP_200_OK)

def resetear_vidas(request, user_id):
    vidas_usuario, created = VidasUsuario.objects.get_or_create(usuario_id=user_id)
    vidas_usuario.vidas_restantes = 5
    vidas_usuario.save()
    return JsonResponse({"mensaje": "Vidas reseteadas a 5", "vidas": vidas_usuario.vidas_restantes})

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
    
@api_view(['GET'])
def get_score(request, user_id):
    
    try:
        # Filtrar ejercicios correctos únicos
        ejercicios_correctos = (
            Intento.objects.filter(usuario_id=user_id, resultado=True)
            .values('ejercicio_id')  # Agrupar por ejercicio_id
            .distinct()  # Evitar duplicados
            .count()  # Contar los ejercicios únicos correctos
        )

        # Calcular puntos por ejercicios correctos (10 puntos por ejercicio correcto)
        puntos_por_ejercicio = ejercicios_correctos * 10

        # Calcular la penalización total por errores
        penalizacion_errores = (
            Intento.objects.filter(usuario_id=user_id, resultado=True)
            .aggregate(total_errores=Sum('errores'))['total_errores'] or 0  # Evitar None
        )

        # Calcular el puntaje final
        score = puntos_por_ejercicio - penalizacion_errores

        return Response({'score': max(score, 0)}, status=200)  # Puntaje no puede ser negativo
    except Exception as e:
        return Response({'error': str(e)}, status=500)

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


@api_view(['GET'])
def obtener_insignias(request):
    # Verificar si el usuario está autenticado
    if not request.user.is_authenticated:
        return Response({"error": "No estás autenticado"}, status=401)

    # Obtener el email del usuario autenticado
    email = request.user.email
    usuario_id = request.user.id  # Usamos el id del usuario autenticado

    # Ahora que tenemos el id del usuario, hacemos la consulta
    insignias_obtenidas = UsuarioEjercicioInsignia.objects.filter(usuario_id=usuario_id).select_related('insignia')

    # Serializar las insignias obtenidas
    serializer = InsigniaConFechaSerializer(insignias_obtenidas, many=True)
    
    return Response(serializer.data)

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

@api_view(['POST'])
def intento(request):
    data = request.data
    usuario_id = data.get('usuario_id')
    ejercicio_id = data.get('ejercicio_id')
    respuesta_usuario = data.get('respuesta_usuario')

    try:
        ejercicio = Ejercicio.objects.get(id_ejercicio=ejercicio_id)
        es_correcto = ejercicio.salida_esperada.strip().lower() == respuesta_usuario.strip().lower()

        # Guardar el intento del usuario
        intento = IntentoEjercicio.objects.create(
            usuario_id=usuario_id,
            ejercicio=ejercicio,
            respuesta_usuario=respuesta_usuario,
            es_correcto=es_correcto
        )

        return Response({
            "correcto": es_correcto,
            "mensaje": "¡Correcto!" if es_correcto else "Inténtalo de nuevo",
            "puntos": ejercicio.puntos if es_correcto else 0
        })
    except Ejercicio.DoesNotExist:
        return Response({"error": "Ejercicio no encontrado"}, status=404)


@api_view(['GET'])
def obtener_intentos(request, usuario_id):
    intentos = IntentoEjercicio.objects.filter(usuario_id=usuario_id).order_by('-fecha')
    data = [
        {
            "ejercicio": intento.ejercicio.titulo,
            "respuesta_usuario": intento.respuesta_usuario,
            "es_correcto": intento.es_correcto,
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
    participacion_id = request.data.get('id_participacion_foro')  # ID de la participación
    voto = request.data.get('voto')  # 'like' o 'dislike'

    try:
        participacion = Participacion_foro.objects.get(id_participacion_foro=participacion_id)

        if voto == 'like':
            participacion.resultado = True
            # Opcional: otorgar puntos al usuario por una respuesta útil
            # usuario = User.objects.get(id=participacion.usuario_id)
            # usuario.profile.puntos += 10
            # usuario.profile.save()
        elif voto == 'dislike':
            participacion.resultado = False

        participacion.save()
        return Response({
            'success': True,
            'resultado': participacion.resultado,
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
            print(f"Tipo de usuario obtenido: {type(usuario)}")
            print(f"Es instancia de User: {isinstance(usuario, User)}")
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

@csrf_exempt
def obtener_ejercicios_usuario(request, usuario_id):
    ejercicios = EjercicioAsignado.objects.filter(usuario_id=usuario_id).values_list("ejercicio_id", flat=True)
    return JsonResponse({"ejercicios": list(ejercicios)})

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

@api_view(['PUT'])  # Solo permitir solicitudes PUT
@csrf_exempt
def editar_usuario(request):
    if not request.user.is_authenticated:
        return Response({"error": "No estás autenticado"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        usuario = request.user  # Obtener el usuario actual
        serializer = UsuarioEditarSerializer(usuario, data=request.data, partial=True)  # partial=True permite actualizaciones parciales
        if serializer.is_valid():
            serializer.save()  # Guardar los cambios en la base de datos
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Devolver errores de validación
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  # Manejo de errores

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
    Verifica si un usuario ha completado un nivel específico.
    Requisitos:
    - Haber realizado al menos 2 ejercicios en el nivel con éxito (resultado=True).
    - Haber cumplido los demás logros del nivel.
    """
    # Verificar si el usuario ha completado al menos 2 ejercicios en el nivel con éxito
    ejercicios_completados = Intento.objects.filter(
        usuario_id=usuario_id,  
        ejercicio__nivel=nivel_id,  # ✅ Se usa `nivel` directamente, no `nivel_id`
        resultado=True
    ).values('ejercicio').distinct().count()

    # Verificar si el usuario ha cumplido todos los logros requeridos para este nivel
    logros_requeridos = Logro.objects.filter(nivel=nivel_id)  # ✅ Se usa `nivel`, no `nivel_id`
    logros_obtenidos = Usuario_logro.objects.filter(usuario_id=usuario_id, logro_id__in=logros_requeridos).count()

    if ejercicios_completados >= 2 and logros_obtenidos >= logros_requeridos.count():
        return True  # Nivel completado
    return False  # Aún no ha completado el nivel
