import axios from 'axios';
import { getCSRFToken, refreshAccessToken, navigate } from '../utils/validacionesGenerales';
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
        return await fetchUserInfo(); // Reintentar
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        window.location.href = '/login'; // Redirección directa
        throw refreshError;
      }
    }
    
    throw error; // Propagar el error para manejo específico
  }
};