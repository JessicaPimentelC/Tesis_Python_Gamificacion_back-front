import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../config";
import { useNavigate } from "react-router-dom";


// Función mejorada para obtener CSRF token
export const getCSRFToken = () => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const csrfCookie = cookies.find(cookie => cookie.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
};

// Función para determinar el tipo de autenticación
const getAuthType = () => {
    return document.cookie.includes('sessionid') ? 'traditional' : 'jwt';
};

// Configuración dinámica de autenticación
export const getAuthConfig = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    };

    const authType = getAuthType();
    const authToken = localStorage.getItem('access_token');

    if (!authToken) {
        throw new Error('Usuario no autenticado');
    }

    if (authType === 'traditional') {
        const csrfToken = getCSRFToken();
        if (!csrfToken) {
            throw new Error('CSRF token requerido para autenticación tradicional');
        }
        config.headers['X-CSRFToken'] = csrfToken;
    } else {
        config.headers['Authorization'] = `Bearer ${authToken}`;
    }

    return config;
};

// Función mejorada para verificar logros
export const verificarYOtorgarLogro = async (usuario_id) => {
    try {
        const config = await getAuthConfig();
        const response = await axios.post(
            `${API_BASE_URL}/myapp/otorgar_logros/`,
            { usuario_id },
            config
        );

        // Caso 1: Logro otorgado (status 201)
        if (response.status === 201 && response.data.nuevo_logro) {
            await Swal.fire({
                title: "🎉 ¡Felicidades!",
                text: `Has desbloqueado: ${response.data.nuevo_logro.nombre}`,
                icon: "success",
            });
            return response.data;
        }

        // Caso 2: No hay logros nuevos (status 200)
        if (response.status === 200) {
            console.log(response.data.message); // "No se han cumplido los requisitos..."
            return response.data;
        }

        return response.data;

    } catch (error) {
        // Solo manejar errores reales (401, 403, 500, etc.)
        if (error.response?.status === 401 || error.response?.status === 403) {
            try {
                const newToken = await refreshAccessToken();
                localStorage.setItem('access_token', newToken);
                return await verificarYOtorgarLogro(usuario_id);
            } catch (refreshError) {
                localStorage.removeItem('access_token');
                window.location.href = '/';
                return null;
            }
        }

        console.error("Error en verificarYOtorgarLogro:", error);
        return null;
    }
};

export const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.post(
            `${API_BASE_URL}/myapp/token/refresh/`,
            { refresh: refreshToken },  
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.data.access) {
            throw new Error('Invalid token refresh response');
        }

        localStorage.setItem('access_token', response.data.access);
        return response.data.access;
    } catch (error) {
        console.error('Token refresh failed:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        throw error;
    }
};


    //Verificar nivel
    export const verificarNivel = async (nivelId, navigate) => {
        const csrfToken = getCSRFToken();

        try {
            const response = await axios.post(
                `${API_BASE_URL}/myapp/verificar_nivel_completado/`,
                { nivel_id: nivelId },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken, 
                    },
                }
            );
    
            if (response.status === 200 && response.data.mensaje) {
                console.log("Respuesta de la API de verificar nivel:", response.data);
                Swal.fire({
                    title: "¡Verificación de Nivel!",
                    text: response.data.mensaje,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#007bff",
                });
                if (response.data.mensaje.includes("Ejercicio del Nivel")) {
                    console.log("Nuevo ejercicio asignado.");
                }
                try {
                    const examenResponse = await axios.get(
                        `${API_BASE_URL}/myapp/verificar_examen?nivel_id=${nivelId}`,
                        { withCredentials: true }
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
    /**Guarda el ejercicio en la BD */
    export const guardarEjercicioEnBD = async (usuario_id, ejercicio_id) => {
    try {
        const response = await axios.post(
        `${API_BASE_URL}/myapp/guardar_ejercicio/`,
        {
            usuario_id: usuario_id,
            ejercicio_id: ejercicio_id,
            fecha_asignacion: new Date().toISOString().split("T")[0],
        },
        { withCredentials: true }
        );

        console.log("Respuesta del servidor:", response.data);
        return response.data;
    } catch (error) {
        console.error(
        "Error al guardar el ejercicio:",
        error.response ? error.response.data : error.message
        );
    }
};
//obtiene el id del ejercicio
export const obtenerEjercicioId = async () => {
    try {
    const response = await axios.get(`${API_BASE_URL}/myapp/ejercicio/`);
    console.log("Datos completos recibidos:", response.data);

    if (
        response.status === 200 &&
        Array.isArray(response.data.data) &&
            response.data.data.length > 0
        ) {
        return response.data.data[0].id_ejercicio;
        } else {
        console.error(
            "El array de ejercicios está vacío o no tiene la estructura esperada."
        );
        }
    } catch (error) {
        console.error("Error al obtener los ejercicios:", error);
    }
    return null;
};


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