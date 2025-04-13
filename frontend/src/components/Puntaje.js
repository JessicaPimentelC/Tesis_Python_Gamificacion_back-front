import axios from "axios";
import "../styles/Puntaje.css"; 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import useVidasStore from "./vidasStore";

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
                const csrfToken = getCSRFToken();
                const userResponse = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, {
                    headers: {
                    "X-CSRFToken": csrfToken,
                },
                    withCredentials: true,
                });
                setUserInfo(userResponse.data);
                const usuario_id = userResponse.data.id;
                const vidasResponse = await axios.get(`${API_BASE_URL}/myapp/vidas/${usuario_id}/`, {
                    withCredentials: true,
                });
                console.log("Vidas iniciales desde la API:", vidasResponse.data.vidas_restantes); // Verificamos el valor de las vidas
                const response = await axios.get(`${API_BASE_URL}/myapp/score/${usuario_id}/`);
                setVidas(vidasResponse.data.vidas_restantes);
                setScore(response.data.score); // Asumiendo que también devuelves el puntaje desde la API
            } catch (error) {
                console.error("Error al obtener usuario o vidas:", error);
            }
        };
        fetchUsuarioYVidas();
    }, [setVidas]); // Asegúrate de que el useEffect se ejecute solo una vez al montar el componente

    const getCSRFToken = () => {
        const cookies = document.cookie.split("; ");
        const csrfCookie = cookies.find((cookie) => cookie.startsWith("csrftoken="));
        return csrfCookie ? csrfCookie.split("=")[1] : "";
        };

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

