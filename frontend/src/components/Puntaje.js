import axios from "axios";
import "../styles/Puntaje.css"; 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import useVidasStore from "./vidasStore";
import {getCSRFToken,refreshAccessToken } from "../utils/validacionesGenerales.js";
import Swal from 'sweetalert2';

const Puntaje = () => {
    const [score, setScore] = useState(0);
    const [username,setUsername] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false); // Estado para mostrar u ocultar el menú
    const navigate = useNavigate();
    const vidas = useVidasStore((state) => state.vidas);
    const setVidas = useVidasStore((state) => state.setVidas);
    
    useEffect(() => {
        const fetchUsuarioYVidas = async () => {
            
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
                const userResponse = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, {
                    headers,
                    withCredentials: true,
                });
                setUserInfo(userResponse.data);
                const usuario_id = userResponse.data.id;
                const vidasResponse = await axios.get(`${API_BASE_URL}/myapp/vidas/${usuario_id}/`, {
                    headers,
                    withCredentials: true,
                });
                console.log("Vidas iniciales desde la API:", vidasResponse.data.vidas_restantes); 
                const response = await axios.get(`${API_BASE_URL}/myapp/score/${usuario_id}/`, {
                    headers,
                    withCredentials: true
                })
                setVidas(vidasResponse.data.vidas_restantes);
                setScore(response.data.score); 
            } catch (error) {
                console.error("Error al obtener datos:", error);
                
                if (error.response?.status === 401) {
                    try {
                        const newToken = await refreshAccessToken();
                        
                        await fetchUsuarioYVidas();
                        return;
                    } catch (refreshError) {
                        console.error("Error al renovar token:", refreshError);
                        localStorage.removeItem('access_token');
                        navigate('/');
                        return;
                    }
                }
                
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar los datos del usuario',
                    icon: 'error'
                });
            }
        };
    
        fetchUsuarioYVidas();
    }, [setVidas, navigate]); 

    if (error) {
        return <div className="text-content"><p>{error}</p></div>;
    } 

       // Función para alternar el menú desplegable
    const toggleMenu = () => {
        console.log(menuVisible);  // Verifica el valor de menuVisible
        setMenuVisible(!menuVisible);
    };

    const dirigirPerfil = () => {
        navigate("/perfil"); // Asegúrate de que esta ruta esté definida en tu Router
    };

    return (
        <div className="player-info">
            <div className="icon-background" onClick={dirigirPerfil}>
                <img src="/empresario.png" alt="Icono Nombre" className="info-icon" />
            </div>
        
        <div className="text-content">
        <h3>¡Bienvenido!</h3>
        {userInfo ? (
            <div>
                <p><strong>{userInfo.username}</strong> </p>
            </div>
        ) : (
            <p>Cargando información del usuario...</p>
        )}
        </div>

        <div className="score-container">
        {/* Encabezado del puntaje */}
        <div className="score-header">
            <h3 className="score-title">PUNTAJE</h3>
        </div>

        {/* Contenedor de puntaje y vidas */}
        <div className="score-content">
            <div className="icon-text">
            <img
                src="/corazon.png"
                alt="Icono Diamante"
                className="info-icon"
            />
            <p className="score-value">{vidas}</p>
            </div>
            <div className="icon-text">
            <img src="/baa.png" alt="Icono Mundo" className="info-icon" />
            <p className="score-value">{score}</p>
            </div>
        </div>
        </div>
    </div>

    );
};
export default Puntaje;

