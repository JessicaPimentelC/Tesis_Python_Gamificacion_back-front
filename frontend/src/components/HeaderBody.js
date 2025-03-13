import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeaderBody.css';
import axios from "axios";
import Swal from 'sweetalert2';

const HeaderBody = () => {
    const [currentTime, setCurrentTime] = useState('');
    const navigate = useNavigate(); // Hook para la redirección
    const [showModal, setShowModal] = React.useState(false);
    const [hoveredInsignia, setHoveredInsignia] = useState(null);
    const [insignias, setInsignias] = useState([]);  // Asegurar que es un array

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
                    withCredentials: true,
                });
    
                console.log("Insignias obtenidas:", response.data);
                
                // Verificar que la respuesta contenga 'insignias'
                if (response.data && Array.isArray(response.data.insignias)) {
                    setInsignias(response.data.insignias);
                } else {
                    setInsignias([]);  // Evitar errores si la API no devuelve un array
                }
    
                // Mostrar mensaje si hay una nueva insignia
                if (response.status === 200 && response.data.nuevas_insignias && response.data.mensaje) {
                    Swal.fire({
                        title: "¡Nueva Insignia!",
                        text: response.data.mensaje, 
                        icon: "success",
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#007bff"
                    });
                }
            } catch (error) {
                console.error("Error al obtener las insignias:", error);
                setInsignias([]);  // Evita que el estado quede como 'undefined'
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

    const handleInsigniaClick = (insignia) => {
        console.log("Datos de la insignia clickeada:", insignia);
        Swal.fire({
            title: insignia.nombre,
            text: insignia.descripcion,
            icon: "info",
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
                    onClick={() => handleInsigniaClick(item.insignia)}
                    onMouseEnter={() => handleMouseEnter(item.insignia)}
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
