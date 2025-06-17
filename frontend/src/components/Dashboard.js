import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import API_BASE_URL from "../config";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import { getCSRFToken, verificarDesafioHabilitado } from "../utils/validacionesGenerales";
import { redirigirAEnunciado } from "../utils/utils";
import { fetchUserInfo } from "../utils/userService";

const Dashboard = () => {
  const [loadingProgress2, setLoadingProgress2] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPenguinModal, setShowPenguinModal] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [ejercicios, setEjercicios] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [desafioHabilitado, setDesafioHabilitado] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // Inicialización del modal de bienvenida
  const [showWelcomeModal, setShowWelcomeModal] = useState(() => {
    return !localStorage.getItem("hasSeenWelcomeModal");
  });

  // Efecto para la barra de progreso
  useEffect(() => {
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
    return () => clearInterval(interval2);
  }, []);
  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenWelcomeModal");

    if (!hasSeenModal) {
      setShowWelcomeModal(true); // o el estado que uses para abrir el modal
      localStorage.setItem("hasSeenWelcomeModal", "true"); // lo marca como mostrado
    }
  }, []);

  // Efecto para obtener información del usuario
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserInfo();
        setUserInfo(userData);
        console.log("Usuario:", userData);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };
    loadUser();
  }, []);

  // Efecto para verificar desafío cuando userInfo cambia
  useEffect(() => {
    if (userInfo?.id) {
      const verificarDesafio = async () => {
        const habilitado = await verificarDesafioHabilitado(userInfo.id);
        setDesafioHabilitado(habilitado);
      };
      
      verificarDesafio();
    }
  }, [userInfo]);

  // Efecto para cargar ejercicios cuando userInfo esté disponible
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

  // Handlers y funciones auxiliares
  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    localStorage.setItem("hasSeenWelcomeModal", "true");
  };

  const handlePenguinClick = () => {
    setShowPenguinModal(true);
    setShowWelcomeMessage(true);
    setCurrentStep(0);
    setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 3000);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowPenguinModal(false);
    }
  };

  const handleCerrarSesionClick = () => {
    setShowModal(true);
  };

  const handleConfirmCerrarSesion = () => {
    setShowModal(false);
    window.location.href = "http://localhost:8000/myapp/login/";
  };

  const handleCancelCerrarSesion = () => {
    setShowModal(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Pasos del recorrido
  const steps = [
    { content: "Aquí puedes navegar a las diferentes secciones de la aplicación.", icon: "icon1.png" },
    { content: "Este es el encabezado donde puedes ver opciones generales.", icon: "icon2.png" },
    { content: "¡Haz clic aquí para obtener ayuda del Pingüino!", icon: "icon3.png" },
    { content: "Aquí puedes comenzar con el Nivel 1 para aprender los fundamentos.", icon: "icon4.png" },
    { content: "En esta sección, puedes ver tu posición entre otros usuarios.", icon: "icon5.png" },
    { content: "Empecemos!.", icon: "icon6.png", action: (navigate) => navigate("/1") },
  ];

  // Generar espiral vertical
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
      {showWelcomeModal && (
        <div className="welcome-modal">
          <div className="modal-content">
            <h2>🎉 ¡Bienvenido a PythonGo! 🚀</h2>
            <p>
              ¡Estás a punto de comenzar una aventura única para aprender a programar en Python de forma divertida y emocionante!<br /><br />
              Nuestra aplicación combina el poder del aprendizaje con la emoción del juego: ¡aprenderás mientras juegas! 🕹️💡
            </p>
            <ul>
              <li>🧩 El juego está dividido en 3 niveles, y en cada uno encontrarás:</li>
              <li>📘 Una explicación clara y sencilla del tema.</li>
              <li>🧠 20 ejercicios prácticos aleatorios para reforzar lo aprendido.</li>
              <li>⭐ Puntuación por cada ejercicio correcto.</li>
              <li>❤️ ¡Tienes 5 vidas para completar cada nivel!</li>
            </ul>
            <p>
              Cada paso que des te acercará a convertirte en un verdadero experto en Python.
              ¡Supera los retos, gana puntos y demuestra tu lógica como nunca antes!
            </p>
            <h3>¿Listo para comenzar? Tu camino hacia la programación comienza ahora. 💻🔥</h3>
            <button onClick={handleCloseWelcomeModal}>Comenzar</button>
          </div>
        </div>
      )}

      <Sidebar />
      <Header />
      <div className="dashboard-content">
        {showWelcomeMessage && (
          <div className="welcome-message">
            <p>Hola {userInfo?.username || "Usuario"}, Bienvenido a nuestra app</p>
          </div>
        )}

        <div className="desafio-container">
          {desafioHabilitado ? (
            <button className="btn-desafio" onClick={() => navigate("/desafionivel1")}>
              ¡Desafío Disponible!
            </button>
          ) : (
            <p>Completa 10 ejercicios para desbloquear un desafío</p>
          )}
        </div>

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
                const isAssigned = Boolean(ejercicio);
                return (
                  <div
                    key={`nivel1-${index}`}
                    className={`map-circle circle-nivel1 ${
                      !isAssigned ? 'circle-disabled' : ''
                    }`}
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Niveles 2 y 3 */}
          {[2, 3].map(nivel => (
  <div key={`nivel-${nivel}`} className={`nivel-container nivel-${nivel}`}>
    <div className="nivel-header">
      <h2>NIVEL {nivel}</h2>
      <p>Programa tu futuro hoy mismo</p>
    </div>

          {userInfo?.nivel_actual >= nivel ? (
            <div className="nivel-ejercicios">
              {generarEspiralVertical(10, 100, 20, 20, 15).map((pos, i) => (
                <img key={i} src={pos.icon} style={{ position: "absolute", top: pos.top, left: pos.left }} />
              ))}
            </div>
          ) : (
            <div className="nivel-placeholder">
              <p>Disponible pronto</p>
            </div>
          )}
        </div>
      ))}

        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCancelCerrarSesion}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>¿Cerrar sesión?</h2>
            <p>¿Estás seguro de que deseas cerrar sesión?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmCerrarSesion}>Sí</button>
              <button onClick={handleCancelCerrarSesion}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;