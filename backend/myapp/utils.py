from .models import Insignia, Usuario_insignia

def evaluar_insignias(usuario):
    insignias_ganadas = []

    # Ejemplo: Insignia por completar el primer ejercicio
    if usuario.ejercicios_completados.count() == 1:
        insignia, created = Insignia.objects.get_or_create(
            nombre="Comienzo Prometedor",
            descripcion="Completaste tu primer ejercicio"
        )
        if not Usuario_insignia.objects.filter(usuario=usuario, insignia=insignia).exists():
            Usuario_insignia.objects.create(usuario=usuario, insignia=insignia)
            insignias_ganadas.append(insignia)

    # Ejemplo: Insignia por completar 5 ejercicios exitosamente
    ejercicios_correctos = usuario.ejercicios_completados.filter(exito=True).count()
    if ejercicios_correctos >= 5:
        insignia, created = Insignia.objects.get_or_create(
            nombre="Perseverancia",
            descripcion="Resolvió 5 ejercicios sin errores"
        )
        if not Usuario_insignia.objects.filter(usuario=usuario, insignia=insignia).exists():
            Usuario_insignia.objects.create(usuario=usuario, insignia=insignia)
            insignias_ganadas.append(insignia)

    return insignias_ganadas

