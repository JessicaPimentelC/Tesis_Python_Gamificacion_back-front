from .models import Insignia
# Diccionario que asocia el nombre de la insignia con el archivo de imagen
INSIGNIA_IMAGENES = {
    "Comienzo Prometedor": "insignias/comienzo.png",
    "Perseverancia": "insignias/perseverancia.png",
    "Innovador": "insignias/innovador.png",
}

for nombre, ruta_imagen in INSIGNIA_IMAGENES.items():
    insignia = Insignia.objects.filter(nombre=nombre).first()
    if insignia:
        insignia.imagen = ruta_imagen
        insignia.save()
        print(f"Imagen asignada a {nombre}: {ruta_imagen}")
    else:
        print(f"No se encontró la insignia: {nombre}")