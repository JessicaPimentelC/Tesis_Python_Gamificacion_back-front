from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, authenticate, login
from .serializer import UserSerializer,UsuarioSerializer, ForoSerializer,ParticipacionForoSerializer, EjercicioSerializer, IntentoSerializer, UsuarioLogroSerializer,InsigniaConFechaSerializer,UsuarioEditarSerializer
from django.contrib.auth import get_user_model
from .models import Foro, Participacion_foro, Ejercicio, Intento, UsuarioEjercicioInsignia, Insignia, IntentoEjercicio, EjercicioAsignado,Usuario_logro
import subprocess
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
        participacion = Foro.objects.get(id_foro=id_foro)
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
        
@api_view(['GET', 'POST'])
def guardar_intento(request):
    if request.method == 'POST':
        serializer = IntentoSerializer(data=request.data)
        if serializer.is_valid():
            intento = serializer.save()
            return Response({'message': 'Intento creado exitosamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        intentos = Intento.objects.all()
        serializer = IntentoSerializer(intentos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
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
        return Response({"error": "No estás autenticado"}, status=401)

    usuario_id = request.user.id  # Usamos el id del usuario autenticado
    
    # Verificar cuántos ejercicios ha completado el usuario
    ejercicios_completados = UsuarioEjercicioInsignia.objects.filter(usuario_id=usuario_id)
    
    insignias_otorgadas = []
    # Regla para Insignia 2: Completar 20 ejercicios
    if ejercicios_completados.count() >= 20:
        insignia_20 = Insignia.objects.filter(tipo="Insignia de 20 ejercicios").first()
        if insignia_20 and not UsuarioEjercicioInsignia.objects.filter(usuario_id=usuario_id, insignia=insignia_20).exists():
            UsuarioEjercicioInsignia.objects.create(usuario_id=usuario_id, insignia=insignia_20)
            insignias_otorgadas.append(insignia_20.tipo)

    if insignias_otorgadas:
            return Response({"message": f"¡Insignias otorgadas: {', '.join(insignias_otorgadas)}!"}, status=status.HTTP_201_CREATED)
        
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
    logros_obtenidos = Usuario_logro.objects.filter(usuario_id=usuario_id).select_related('logro_id')  # ✅ Usar 'logro' en lugar de 'logro_id'
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
