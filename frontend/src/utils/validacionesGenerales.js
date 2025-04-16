import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../config";

//verificarlogros
export const verificarYOtorgarLogro = async (usuario_id) => {
    try {
    const csrfToken = getCSRFToken();
    const response = await axios.post(
        `${API_BASE_URL}/myapp/otorgar_logros/`,
        { usuario_id },
        {
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
        }
    );

    console.log("Logros verificados:", response.data);

    if (response.data.nuevo_logro) {
        Swal.fire({
        title: "🎉 ¡Felicidades!",
        text: `Has desbloqueado un nuevo logro: ${response.data.nuevo_logro.nombre}`,
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#007bff",
        });
        }
    } catch (error) {
        console.error("Error al verificar logros:", error.response?.data || error.message);
    }
};
//obetener token
export const getCSRFToken = () => {
    const cookies = document.cookie.split("; ");
    const csrfCookie = cookies.find((cookie) => cookie.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : "";
};

//Verificar nivel
export const verificarNivel = async (nivelId) => {
        const csrfToken = getCSRFToken(); // Obtener el token dinámico

    try {
        const response = await axios.post(
            `${API_BASE_URL}/myapp/verificar_nivel_completado/`,
            { nivel_id: nivelId },
            { 
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken, // Se obtiene dinámicamente
                },  
            }
        );
        if (response.status === 200 && response.data.mensaje) {
            console.log("Respuesta de la api de verificar nivel:", response.data); 
            Swal.fire({
            title: "¡Verificación de Nivel!",
            text: response.data.mensaje,  // Mensaje que viene del backend
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#007bff" 
            });
        }
    
    } catch (error) {
        console.error("Error al verificar nivel:", error);
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
        console.error("Error al guardar el ejercicio:", error.response ? error.response.data : error.message);
    }
};
//obtiene el id del ejercicio
export const obtenerEjercicioId = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/myapp/ejercicio/`);
        console.log("Datos completos recibidos:", response.data);
    
        if (response.status === 200 && Array.isArray(response.data.data) && response.data.data.length > 0) {
            return response.data.data[0].id_ejercicio; 
        } else {
            console.error("El array de ejercicios está vacío o no tiene la estructura esperada.");
        }
        } catch (error) {
        console.error("Error al obtener los ejercicios:", error);
        }
        return null;
    };