import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import Lesson from "./Lesson";
import Positions from "./Positions";
import Challenges from "./Challenges";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PinguinoModal from "./PinguinoModal";
import Ruleta from "./Ruleta";
import MediaQuery from "react-responsive";
import Chatbot from "./Chatbot";

const Dashboard = () => {
  const [loadingProgress2, setLoadingProgress2] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true); // NUEVO
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPenguinModal, setShowPenguinModal] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

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

  const handlePenguinClick = () => {
    setShowPenguinModal(true);
    setShowWelcomeMessage(true);
    setCurrentStep(0);
    setTimeout(() => setShowWelcomeMessage(false), 3000);
  };

  const steps = [
    { content: "Aquí puedes navegar a las diferentes secciones de la aplicación.", icon: "icon1.png" },
    { content: "Este es el encabezado donde puedes ver opciones generales.", icon: "icon2.png" },
    { content: "¡Haz clic aquí para obtener ayuda del Pingüino!", icon: "icon3.png" },
    { content: "Aquí puedes comenzar con el Nivel 1 para aprender los fundamentos.", icon: "icon4.png" },
    { content: "En esta sección, puedes ver tu posición entre otros usuarios.", icon: "icon5.png" },
    { content: "Empecemos!.", icon: "icon6.png", action: (navigate) => navigate("/1") },
  ];

  const handleCerrarSesionClick = () => setShowModal(true);
  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else setShowPenguinModal(false);
  };
  const handleConfirmCerrarSesion = () => {
    setShowModal(false);
    window.location.href = "http://localhost:8000/myapp/login/";
  };
  const handleCancelCerrarSesion = () => setShowModal(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLessonClick = () => navigate("/lesson");
  const handlePositionsClick = () => navigate("/posiciones");
  const handleChallengesClick = () => navigate("/challenges");
  const handlePythonIconClick = () => navigate("/lecciones");
  const handleForoIconClick = () => navigate("/foro");
  const handleProgreso = () => navigate("/progreso");
  const handleMouseEnter = () => setDropdownOpen(true);
  const handleMouseLeave = () => setDropdownOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

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
            <button onClick={() => setShowWelcomeModal(false)}>Comenzar</button>
          </div>
        </div>
      )}

      <MediaQuery minWidth={1224}>
        <Sidebar />
        <Header />
        <div className="dashboard-content">
          {showWelcomeMessage && (
            <div className="welcome-message">
              <p>Hola Usuario, Bienvenido a nuestra app</p>
            </div>
          )}
          {/* CONTINÚA TU CÓDIGO ORIGINAL SIN CAMBIOS AQUÍ... */}

            <div className="dashboard-niveles">
            <div
              className="dashboard-left"
              onClick={() => navigate("/lecciones")}
            >
              <button className="info-box-lesson lesson-box">
                <h1>NIVEL 1</h1>
                Programa tu futuro hoy mismo
              </button>
              <div className="button-route">
                <button
                  className={`route-button ${
                    currentStep === 0 ? "active" : ""
                  }`}
                  onClick={handlePythonIconClick}
                >
                  <img
                    src="python1.png"
                    alt="Python Icon"
                    className="icon-img"
                  />
                </button>
                <button
                  className={`route-button ${
                    currentStep === 1 ? "active" : ""
                  }`}
                >
                  <img src="libero.png" alt="Book Icon" className="icon-img" />
                </button>
                <button
                  className={`route-button ${
                    currentStep === 2 ? "active" : ""
                  }`}
                >
                  <img
                    src="bombillo.png"
                    alt="Star Icon"
                    className="icon-img"
                  />
                </button>
                <button
                  className={`route-button ${
                    currentStep === 3 ? "active" : ""
                  }`}
                >
                  <img
                    src="cohetee.png"
                    alt="Rocket Icon"
                    className="icon-img"
                  />
                </button>
                <button
                  className={`route-button ${
                    currentStep === 4 ? "active" : ""
                  }`}
                >
                  <img
                    src="cofre.png"
                    alt="Treasure Icon"
                    className="icon-img"
                  />
                </button>
              </div>
            </div>
            <div
              className="dashboard-left"
              onClick={() => navigate("/lecciones")}
            >
              <button className="info-box-lesson lesson-box">
                <h1>NIVEL 2</h1>
                Programa tu futuro hoy mismo
              </button>
              <div className="button-route">
                <button
                  className={`route-button ${
                    currentStep === 0 ? "active" : ""
                  }`}
                  onClick={handlePythonIconClick}
                >
                  <img
                    src="python1.png"
                    alt="Python Icon"
                    className="icon-img"
                  />
                </button>
                <button
                  className={`route-button ${
                    currentStep === 1 ? "active" : ""
                  }`}
                >
                  <img src="libero.png" alt="Book Icon" className="icon-img" />
                </button>
                <button
                  className={`route-button ${
                    currentStep === 2 ? "active" : ""
                  }`}
                >
                  <img
                    src="bombillo.png"
                    alt="Star Icon"
                    className="icon-img"
                  />
                </button>
                <button
                  className={`route-button ${
                    currentStep === 3 ? "active" : ""
                  }`}
                >
                  <img
                    src="cohetee.png"
                    alt="Rocket Icon"
                    className="icon-img"
                  />
                </button>
                <button
                  className={`route-button ${
                    currentStep === 4 ? "active" : ""
                  }`}
                >
                  <img
                    src="cofre.png"
                    alt="Treasure Icon"
                    className="icon-img"
                  />
                </button>
              </div>
            </div>
            </div>
            <div className="dashboard-right">
            <button
              className="info-box-lesson lesson-box"
              onClick={handlePositionsClick}
            >
              <div className="icon-container">
                <img src="personas.png" alt="Icono" className="icon" />
              </div>
              <h2>Posiciones</h2>
              <p>Aspira a sobresalir entre nuestros usuarios destacados</p>
            </button>

            <button className="info-box-lesson lesson-box">
              <h2>Progreso</h2>
              <ProgressBar />
            </button>

          {/* <Ruleta></Ruleta>*/}
          </div>
        </div>
           {/* Integración del Chatbot */}
        <Chatbot />

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
      </MediaQuery>
    </div>
  );
};

export default Dashboard;
