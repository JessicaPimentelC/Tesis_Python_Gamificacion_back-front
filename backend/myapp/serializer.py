# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import User, Foro, Participacion_foro, Ejercicio, Intento, Insignia, Usuario_insignia, Usuario_logro, Logro
from django.contrib.auth import get_user_model

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email', 'username', 'password', 'first_name', 'last_name', 'last_login')
        #fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'username': {'required': True}
        }
    def validate(self, data):
        username = data.get('username', '').lower()
        email = data.get('email', '').lower()

        if User.objects.filter(username__iexact=username).exists():
            raise serializers.ValidationError({'username': 'El nombre de usuario ya está en uso.'})

        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({'email': 'El correo electrónico ya está registrado.'})
        return data
    
    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''), 
            last_name=validated_data.get('last_name', '')  
        
        )
        user.set_password(validated_data['password']) 
        user.save() 
        return user

class UsuarioEditarSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email'] 

class ParticipacionForoSerializer(serializers.ModelSerializer):
    usuario = serializers.StringRelatedField(read_only=True)
    foro = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Participacion_foro
        fields = [
            'id_participacion_foro',
            'usuario',
            'foro',
            'fecha_participacion',
            'comentario',
            'resultado'
        ]

class ForoSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    usuario_data = UserSerializer(source='usuario', read_only=True)
    participaciones_foro = ParticipacionForoSerializer(many=True, read_only=True)  

    class Meta:
        model = Foro
        fields = ['id_foro', 'usuario', 'usuario_data', 'tema', 'descripcion', 'fecha_creacion', 'participaciones_foro']

class EjercicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ejercicio
        #fields = ['id_ejercicio', 'titulo', 'descripcion', 'nivel_id','codigo','salida_esperada' ,'puntos']
        fields = '__all__'

class IntentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intento
        #fields = ['id_ejercicio', 'titulo', 'descripcion', 'nivel_id','codigo','salida_esperada' ,'puntos']
        fields = '__all__'

class InsigniaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insignia
        fields = ['id_insignia', 'nombre', 'descripcion']

class UsuarioInsigniaSerializer(serializers.ModelSerializer):
    insignia = InsigniaSerializer(source='insignia_id')  # Aquí accedemos al campo insignia_id
    class Meta:
        model = Usuario_insignia
        fields = ['id_usuario_insignia', 'usuario', 'insignia', 'fecha_otorgada']

class LogroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logro
        fields = '__all__'

class UsuarioLogroSerializer(serializers.ModelSerializer):
    logro = LogroSerializer(source='logro_id', read_only=True)  
    class Meta:
        model = Usuario_logro
        fields = '__all__'
