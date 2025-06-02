import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeaderBody.css';
import axios from "axios";
import Swal from 'sweetalert2';
import API_BASE_URL from "../config";
import {getCSRFToken,refreshAccessToken } from "../utils/validacionesGenerales.js";

const HeaderBody = () => {
    const [currentTime, setCurrentTime] = useState('');
    const navigate = useNavigate(); // Hook para la redirección
    const [showModal, setShowModal] = React.useState(false);
    const [hoveredInsignia, setHoveredInsignia] = useState(null);
    const [insignias, setInsignias] = useState([]);  // Asegurar que es un array
    const [error, setError] = useState(null);
    const handleControlPanelClick = () => {
        // Logic for the control panel
    };
    
    const handleCerrarSesionClick = () => {
        setShowModal(true);
    };

    useEffect(() => {
        const fetchInsignias = async () => {
            try {
            const headers = {
                'Content-Type': 'application/json'
            };
            const csrfToken = getCSRFToken();
            if (csrfToken) {
                headers['X-CSRFToken'] = csrfToken;
            }
            const token = localStorage.getItem('access_token');
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            const response = await axios.get(
                `${API_BASE_URL}/myapp/insignias/`,
                {
                    headers,
                    withCredentials: true
                }
            );
    
            console.log("Insignias obtenidas:", response.data);
            setInsignias(response.data.insignias);
                if (response.data.mensaje) {
                await Swal.fire({
                    title: "🏅 ¡Nueva insignia!",
                    text: response.data.mensaje,
                    icon: "success"
                });
            }
            } catch (error) {
                console.error("Error al obtener insignias:", error);

                if (error.response?.status === 401) {
                    // Si la respuesta es 401 (token expirado), intentar renovar el token
                    try {
                        const newToken = await refreshAccessToken();
                        localStorage.setItem('access_token', newToken);
                        // Reintentar la solicitud con el nuevo token
                        const retryResponse = await axios.get(
                            `${API_BASE_URL}/myapp/insignias/`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${newToken}`,
                                    'Content-Type': 'application/json',
                                    'X-CSRFToken': getCSRFToken()
                                },
                                withCredentials: true
                            }
                        );

                        setInsignias(retryResponse.data.insignias);
                        if (retryResponse.data.mensaje) {
                        await Swal.fire({
                            title: "🏅 ¡Nueva insignia!",
                            text: retryResponse.data.mensaje,
                            icon: "success"
                        });
                    }
                    } catch (refreshError) {
                        console.error("Error al renovar token:", refreshError);
                        // Redirigir a login si no se puede renovar el token
                        navigate('/');
                    }
                } else {
                    setError('No se pudieron cargar las insignias. Intenta recargar la página.');
                }
            }
        };
        
        fetchInsignias();

        const interval = setInterval(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleString());
        }, 1000); // Actualiza cada segundo

        return () => clearInterval(interval);

    }, 
    
    [navigate]);
    // Función para manejar el click en una insignia (si necesitas alguna acción)

    const handleInsigniaClick = (insignia) => {
    Swal.fire({
        title: `🏅 ${insignia.nombre}`,
        text: insignia.descripcion,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#007bff"
    });
    };
    const handleMouseEnter = (insigniaNombre) => {
        setHoveredInsignia(insigniaNombre);
    };
    
    const handleMouseLeave = () => {
        setHoveredInsignia(null);
    };  
    const handleConfirmCerrarSesion = () => {
    // Logic to log out
    setShowModal(false);
    window.location.href = `${API_BASE_URL}/myapp/login/`;
    };

    const handleCancelCerrarSesion = () => {
    setShowModal(false);
    };
    
    return (
        <div className="header">
            <div className="insignias-container">
                {insignias.map((item, index) => (
                <div key={index} className="circular-icon-container">
                    <button
                    className="circular-icono"
                    onClick={() => handleInsigniaClick(item.insignia)}
                    >
                    <img
                        src={`/insignias/${item.insignia.nombre.toLowerCase()}.png`}
                        alt={item.insignia.nombre}
                    />
                    </button>
                    {hoveredInsignia === item.insignia.nombre && (
                    <p className="hovered-insignia">{item.insignia.nombre}</p>
                )}
                </div>
                ))}
            </div>
            </div>
        );
    
};

export default HeaderBody;
