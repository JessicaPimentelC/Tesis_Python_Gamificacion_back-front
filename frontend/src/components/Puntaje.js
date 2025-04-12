import axios from "axios";
import "../styles/Puntaje.css"; 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const Puntaje = () => {
    const [score, setScore] = useState(0);
    const [username,setUsername] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false); // Estado para mostrar u ocultar el menú
    const navigate = useNavigate();
    const [vidas, setVidas] = useState(5);

    
    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const userResponse = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, {
                    withCredentials: true, // Incluir cookies en la petición
                });
                
                console.log("Usuario:", userResponse.data.username);
                const usuario_id = userResponse.data.id; // Ajusta según la respuesta de tu API
                
                if (!usuario_id) {
                    alert("Error: Usuario no identificado.");
                    return;
                }
                setUserInfo(userResponse.data); 
                // Llamar a fetchScore con el usuario_id
                fetchScore(usuario_id);
                fetchVidas(usuario_id);  // Llamada a la función para obtener vidas
    
            } catch (error) {
                console.error("Error al obtener usuario:", error);
            }
        };
    
        const fetchScore = async (usuario_id) => {
            try {
                const response = await axios.get(`${API_BASE_URL}/myapp/score/${usuario_id}`);
                setScore(response.data.score);
            } catch (error) {
                console.error("Error al obtener score:", error);
            }
        };
        const fetchVidas = async (usuario_id) => {
            try {
                const response = await axios.get(`${API_BASE_URL}/myapp/vidas/${usuario_id}`);
                setVidas(response.data.vidas); // Guardamos las vidas en el estado
            } catch (error) {
                console.error("Error al obtener vidas:", error);
            }
        };
    
        fetchUsuario();
    }, []); 

    const updateScore = async (tipoVoto) => {
        const usuario_id = userInfo.id;  // Obtener el ID del usuario logueado
        try {
            const response = await axios.post(`${API_BASE_URL}/myapp/votar_respuesta/`, {
                id_participacion_foro: 17, 
                resultado: tipoVoto, // 'like' o 'dislike'
            });

            if (response.data.success) {
                // Si el voto fue registrado correctamente, actualizamos el puntaje
                setScore(response.data.puntos_actualizados); // Actualiza el puntaje
            } else {
                alert("Hubo un problema al registrar el voto.");
            }
        } catch (error) {
            console.error("Error al registrar el voto:", error);
        }
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

