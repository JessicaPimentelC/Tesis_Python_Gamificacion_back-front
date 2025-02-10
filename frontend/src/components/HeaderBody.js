import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeaderBody.css';
import axios from "axios";

const HeaderBody = () => {
    const [currentTime, setCurrentTime] = useState('');
    const navigate = useNavigate(); // Hook para la redirección
    const [showModal, setShowModal] = React.useState(false);
    const [hoveredInsignia, setHoveredInsignia] = useState(null);
    const [insignias, setInsignias] = useState([]); // Insignias dinámicas

    const handleControlPanelClick = () => {
        // Logic for the control panel
    };
    
    const handleCerrarSesionClick = () => {
        setShowModal(true);
    };

    useEffect(() => {
        const fetchInsignias = async () => {
            try {
                const response = await axios.get('http://localhost:8000/myapp/insignias/', {
                    withCredentials: true, // Para incluir cookies si las usas

                });
                console.log("insignias obtenidas", response.data);
                setInsignias(response.data);
            } catch (error) {
                console.error("Error al obtener las insignias:", error);
            }
        };
        fetchInsignias();

        const interval = setInterval(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleString());
        }, 1000); // Actualiza cada segundo

        return () => clearInterval(interval);

    }, 
    
    []);
    // Función para manejar el click en una insignia (si necesitas alguna acción)
    const handleInsigniaClick = (insigniaNombre) => {
        console.log(`Insignia clickeada: ${insigniaNombre}`);
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
    window.location.href = '"http://localhost:8000/myapp/login/';
    };

    const handleCancelCerrarSesion = () => {
    setShowModal(false);
    };
    
    return (
        <div className="header">
            <div className="icons-container" style={{ display: 'flex', gap: '20px' }}>
                {insignias.map((item, index) => (
                <div key={index} className="circular-icon-container">
                    <button
                    className="circular-icon"
                    onClick={() => handleInsigniaClick(item.insignia.nombre)}
                    onMouseEnter={() => handleMouseEnter(item.insignia.nombre)}
                    onMouseLeave={handleMouseLeave}
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
