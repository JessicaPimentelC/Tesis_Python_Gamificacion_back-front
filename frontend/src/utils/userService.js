import { useNavigate } from 'react-router-dom'; // Importar navigate desde react-router-dom
import axios from 'axios';
import { getCSRFToken, refreshAccessToken } from '../utils/validacionesGenerales';
import API_BASE_URL from '../config';

export const fetchUserInfo = async () => {
  try {
    const csrfToken = getCSRFToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      withCredentials: true,
    };

    // Añadir JWT si existe (para autenticación con Google)
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, config);
    return response.data;

  } catch (error) {
    console.error('Error fetching user:', error);

    // Manejo de token expirado (opcional)
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshAccessToken();
        localStorage.setItem('access_token', newToken);

        // Intentar hacer la solicitud de nuevo con el nuevo token
        const retryResponse = await fetchUserInfo(); 
        return retryResponse; 
      } catch (refreshError) {
        // Si no se puede refrescar el token, eliminar los tokens y redirigir al login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';  // Redirección usando window.location
        throw refreshError;
      }
    }

    throw error; // Propagar el error para manejo específico
  }
};
