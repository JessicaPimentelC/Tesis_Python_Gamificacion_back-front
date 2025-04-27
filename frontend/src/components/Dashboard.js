import React, { useState, useEffect} from "react";
import "../styles/Dashboard.css";
import API_BASE_URL from "../config";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {getCSRFToken,refreshAccessToken } from "../utils/validacionesGenerales.js";
import { redirigirAEnunciado } from "../utils/utils";
import axios from "axios";

const Dashboard = () => {
  const [loadingProgress2, setLoadingProgress2] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // Estado para el paso actual del recorrido
  const [showPenguinModal, setShowPenguinModal] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [ejercicios, setEjercicios] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  React.useEffect(() => {
    const interval2 = setInterval(() => {
      setLoadingProgress2((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval2);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(interval2);
    };
  }, []);

  const steps = [
    {
      content:
        "Aquí puedes navegar a las diferentes secciones de la aplicación.",
      icon: "icon1.png", // Ruta al icono correspondiente
    },
    {
      content: "Este es el encabezado donde puedes ver opciones generales.",
      icon: "icon2.png", // Ruta al icono correspondiente
    },
    {
      content: "¡Haz clic aquí para obtener ayuda del Pingüino!",
      icon: "icon3.png", // Ruta al icono correspondiente
    },
    {
      content:
        "Aquí puedes comenzar con el Nivel 1 para aprender los fundamentos.",
      icon: "icon4.png", // Ruta al icono correspondiente
    },
    {
      content: "En esta sección, puedes ver tu posición entre otros usuarios.",
      icon: "icon5.png", // Ruta al icono correspondiente
    },
    {
      content: "Empecemos!.",
      icon: "icon6.png", // Ruta al icono correspondiente
      action: (navigate) => navigate("/1"), // Define una función para la acción
    },
  ];
  const handleCerrarSesionClick = () => {
    setShowModal(true);
  };

  const handleConfirmCerrarSesion = () => {
    // Logic to log out
    setShowModal(false);
    window.location.href = `${API_BASE_URL}/myapp/login/`; // Redirect to login page
  };
  //"http://localhost:8000/myapp/login/",

  const handleCancelCerrarSesion = () => {
    setShowModal(false);
  };

  const handlePositionsClick = () => {
    // Logic to handle click on positions box
    navigate("/ranking");
  };

  const handlePythonIconClick = () => {
    navigate("/lecciones");
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  /*FUNCIONES PARA ESPIRAL */
  useEffect(() => {
    const fetchUsuario = async () => {
        try {
            const csrfToken = getCSRFToken();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                withCredentials: true
            };

            const googleToken = localStorage.getItem("access_token");
            if (googleToken) {
                config.headers.Authorization = `Bearer ${googleToken}`;
            }

            const response = await axios.get(
                `${API_BASE_URL}/myapp/usuario-info/`,
                config
            );

            setUserInfo(response.data);
            console.log("Usuario recibido:", response.data);
            
        } catch (error) {
            console.error("Error al obtener el usuario:", error.response?.data || error.message);
            
            if (error.response?.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("user");
                navigate('/');
            }
        }
    };

    const hasSession = document.cookie.includes('sessionid') || localStorage.getItem("access_token");
    if (hasSession) {
        fetchUsuario();
    } else {
        navigate('/');
    }
}, [navigate]); 
  // Cargar ejercicios cuando userInfo esté disponible
  useEffect(() => {
      if (userInfo) {
          const obtenerEjerciciosDesdeBD = async () => {
              try {
                  const response = await axios.get(`${API_BASE_URL}/myapp/ejercicios_usuario/${userInfo.id}/`);
                  setEjercicios(response.data.ejercicios);
              } catch (error) {
                  console.error("Error al obtener ejercicios:", error);
              }
          };

          obtenerEjerciciosDesdeBD();
      }
  }, [userInfo]); 


const generarEspiralVertical = (numElementos, centroX, centroY, radioInicial, factorExp) => {
    return Array.from({ length: numElementos }, (_, i) => {
        const angle = i * 0.6; 
        const radio = radioInicial + factorExp * i; 

        return {
            top: centroY + i * 70, 
            left: centroX + Math.sin(angle) * 100, 
            icon: `/mapa/${(i % 10) + 1}.png`
        };
    });
};

const positions = generarEspiralVertical(20, 100, 20, 20, 15);

  return (
    <div className="dashboard-container">
        <Sidebar />
        <Header />

            <div className="dashboard-niveles">
            <div
              className="dashboard-left"
              onClick={() => navigate("/lecciones")}
            >
            </div>
        </div>
            <div className="dashboard-content">
                {showWelcomeMessage && (
                    <div className="welcome-message">
                        <p>Hola {userInfo?.username || "Usuario"}, Bienvenido a nuestra app</p>
                    </div>
                )}
                
                <div className="niveles-container">
                    {/* Nivel 1 con espiral */}
                    <div className="nivel-container nivel-1">
                        <div className="nivel-header">
                            <h2>NIVEL 1</h2>
                            <p>Programa tu futuro hoy mismo</p>
                        </div>
                        
                        <div className="espiral-container">
                            {positions.map((pos, index) => {
                                const ejercicio = ejercicios[index];
                                return (
                                    <div
                                        key={`nivel1-${index}`}
                                        className="map-circle circle-nivel1"
                                        style={{
                                            top: `${pos.top}px`,
                                            left: `${pos.left}px`,
                                            cursor: ejercicio ? "pointer" : "default",
                                        }}
                                        onClick={() => ejercicio && redirigirAEnunciado(ejercicio, navigate)}
                                    >
                                        <img 
                                            src={pos.icon} 
                                            alt={`${index + 1}`} 
                                            className="map-icon"
                                        />
                                      {/*  <span className="ejercicio-indice">{index + 1}</span>*/}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Nivel 2 (sin ejercicios aún) */}
                    <div className="nivel-container nivel-2">
                        <div className="nivel-header">
                            <h2>NIVEL 2</h2>
                            <p>Programa tu futuro hoy mismo</p>
                        </div>
                        <div className="nivel-placeholder">
                            <p>Disponible pronto</p>
                        </div>
                    </div>

                    {/* Nivel 3 (sin ejercicios aún) */}
                    <div className="nivel-container nivel-3">
                        <div className="nivel-header">
                            <h2>NIVEL 3</h2>
                            <p>Programa tu futuro hoy mismo</p>
                        </div>
                        <div className="nivel-placeholder">
                            <p>Disponible pronto</p>
                        </div>
                    </div>
                </div>
            </div>

        {showModal && (
          <div className="modal-overlay" onClick={handleCancelCerrarSesion}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>¿Cerrar sesión?</h2>
              <p>¿Estás seguro de que deseas cerrar sesión?</p>
              <button onClick={handleConfirmCerrarSesion}>Sí</button>
              <button onClick={handleCancelCerrarSesion}>No</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default Dashboard;
