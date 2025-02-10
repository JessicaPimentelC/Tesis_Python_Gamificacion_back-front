import axios from "axios";
import "../styles/Puntaje.css"; 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Puntaje = () => {
    const [score, setScore] = useState(0);
    const [username,setUsername] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false); // Estado para mostrar u ocultar el menú
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScore = async () => {
            try {
                const response = await axios.get(
                "http://localhost:8000/myapp/score/1"
                ); // Reemplaza "1" con el ID del usuario actual
                setScore(response.data.score);
            } catch (error) {
                console.error("Error al obtener score:", error);
            }
        };
        fetchScore();
        const fetchUsuario = async () => {
            try {
                const response = await axios.get('http://localhost:8000/myapp/usuario-info/', {
                    withCredentials: true, // Asegura que las cookies se incluyan en las solicitudes
                });
                setUserInfo(response.data); 
                console.log("Usuario recibido:", response.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error.response?.data || error.message);
            }
        };
                
        fetchUsuario();

    }, [username]);   
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
            <p>Vidas</p>
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

