import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../config";
import { useNavigate } from "react-router-dom";

// Configuración de autenticación con JWT
export const getAuthConfig = async () => {
    const authToken = localStorage.getItem('access_token');
    if (!authToken) {
        throw new Error('Usuario no autenticado');
    }

    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        }
    };
};

// Verificar y otorgar logro
export const verificarYOtorgarLogro = async (usuario_id) => {
    try {
        const config = await getAuthConfig();
        const response = await axios.post(
            `${API_BASE_URL}/myapp/otorgar_logros/`,
            { usuario_id },
            config
        );

        if (response.status === 201 && response.data.nuevo_logro) {
            await Swal.fire({
                title: "🎉 ¡Felicidades!",
                text: `Has desbloqueado un logro: ${response.data.nuevo_logro.nombre}`,
                icon: "success",
            });
        }

        return response.data;
    } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            try {
                const newToken = await refreshAccessToken();
                localStorage.setItem('access_token', newToken);
                return await verificarYOtorgarLogro(usuario_id);
            } catch {
                localStorage.removeItem('access_token');
                window.location.href = '/';
            }
        }
        console.error("Error en verificarYOtorgarLogro:", error);
        return null;
    }
};

// Refrescar token JWT
export const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token available');

        const response = await axios.post(
            `${API_BASE_URL}/myapp/token/refresh/`,
            { refresh: refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (!response.data.access) throw new Error('Invalid token refresh response');

        localStorage.setItem('access_token', response.data.access);
        return response.data.access;
    } catch (error) {
        console.error('Token refresh failed:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        throw error;
    }
};

// Verificar nivel completado
export const verificarNivel = async (nivelId, navigate) => {
    try {
        const config = await getAuthConfig();
        const response = await axios.post(
            `${API_BASE_URL}/myapp/verificar_nivel_completado/`,
            { nivel_id: nivelId },
            config
        );

        if (response.status === 200 && response.data.mensaje) {
            const mensaje = response.data.mensaje;
            console.log("Respuesta de la API de verificar nivel:", mensaje);

            if (mensaje.includes("¡Felicidades!") || mensaje.includes("has sido asignado")) {
                Swal.fire({
                    title: "¡Nivel completado!",
                    text: mensaje,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#007bff",
                });
            }

            if (mensaje.includes("Ejercicio del Nivel")) {
                console.log("Nuevo ejercicio asignado.");
            }

            try {
                const examenResponse = await axios.get(
                    `${API_BASE_URL}/myapp/verificar_examen?nivel_id=${nivelId}`,
                    config
                );
                if (examenResponse.data.mostrar_desafio) {
                    navigate(`/examennivel${nivelId}`);
                }
            } catch (ex) {
                console.error("Error al verificar si mostrar el examen:", ex);
            }
        }
    } catch (error) {
        console.error("Error al verificar el nivel:", error);
    }
};

// Guardar ejercicio
export const guardarEjercicioEnBD = async (usuario_id, ejercicio_id) => {
    try {
        const config = await getAuthConfig();
        const response = await axios.post(
            `${API_BASE_URL}/myapp/guardar_ejercicio/`,
            {
                usuario_id,
                ejercicio_id,
                fecha_asignacion: new Date().toISOString().split("T")[0],
            },
            config
        );
        console.log("Respuesta del servidor:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al guardar el ejercicio:", error.response?.data || error.message);
    }
};

// Obtener ejercicio ID
export const obtenerEjercicioId = async () => {
    try {
        const config = await getAuthConfig();
        const response = await axios.get(`${API_BASE_URL}/myapp/ejercicio/`, config);
        console.log("Datos completos recibidos:", response.data);

        if (
            response.status === 200 &&
            Array.isArray(response.data.data) &&
            response.data.data.length > 0
        ) {
            return response.data.data[0].id_ejercicio;
        } else {
            console.error("El array de ejercicios está vacío o mal estructurado.");
        }
    } catch (error) {
        console.error("Error al obtener los ejercicios:", error);
    }
    return null;
};

// Verificar si desafío está habilitado
export const verificarDesafioHabilitado = async (usuario_id) => {
    try {
        const config = await getAuthConfig();
        const response = await axios.get(
            `${API_BASE_URL}/myapp/verificar_desafio/`,
            config
        );
        return response.data.mostrar_desafio;
    } catch (error) {
        console.error("Error verificando estado de desafío:", error);
        return false;
    }
};
export const getCSRFToken = () => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const csrfCookie = cookies.find(cookie => cookie.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
};