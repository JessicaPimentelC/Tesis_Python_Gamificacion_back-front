import React, { useState, useEffect } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderInfo from '../../HeaderInfo';
import HeaderBody from '../../HeaderBody';

const Enunciado22 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();
  const [hoveredInsignia, setHoveredInsignia] = useState(null);
  
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/seleccion/22');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleString();
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleShowGif = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowContinue(true);
    }, 2000);
  };

  const handleContinueClick = () => {
    setShowModal(true);
  };

  const handleInsigniaClick = () => {
    navigate('/insignias');
  };

  const handleMouseEnter = (name) => {
    setHoveredInsignia(name);
  };

  const handleMouseLeave = () => {
    setHoveredInsignia(null);
  };

  return (
    <div className="nivel1-container">
      <Sidebar />
      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
          <div className="header-title">
            <h2>NIVEL 1</h2>
            <HeaderInfo></HeaderInfo>
            <div className="header-status">
              <span></span>
              <button className="icon-button" onClick={() => navigate('/dashboard')}>
                <img src="colombia.png" alt="Icono País" />
              </button>
              <button className="icon-button">
                <img src="persona.png" alt="Icono Perfil" />
              </button>
            </div>
          </div>

          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span>Cálculo de Conversión de Metros a Kilómetros</span>
            </div>
            <div className="nivel1-card-body">
              <p>
                En Python, podemos realizar cálculos de manera sencilla gracias a su sintaxis intuitiva.
                En esta actividad, crearás un programa que permita al usuario ingresar una distancia en metros y calcular el valor en kilómetros.
              </p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code">

                <code>
metros = float(input("Ingresa el valor en metros: ")){"\n"}
kilometros = metros / 1000{"\n"}
print("El valor en kilómetros es:", kilometros)
                </code>
                </pre>
              </div>

              {!showGif && (
                <div className="nivel1-card-button-container">
                  <button className="nivel1-card-button" onClick={handleShowGif}>
                    Ver Simulación
                  </button>
                </div>
              )}

              {showGif && (
                <div className="gif-container">
                  <img src="23.gif" alt="GIF" className="gif-image" />
                </div>
              )}

              {showContinue && (
                <div className="nivel1-card-button-container">
                  <button className="nivel1-card-button" onClick={handleContinueClick}>
                    Continuar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¡Bien hecho avanzando en Python!</h2>
            <p>
              🌟 ¡Estás progresando muy bien en tu aprendizaje de Python! 🚀 Ahora es el momento de poner en práctica
              tus conocimientos con un nuevo ejercicio. Prepárate para aplicar lo que has aprendido hasta ahora y seguir avanzando.
            </p>
            <img src="1FNJ.gif" alt="GIF de bienvenida" className="modal-gif" />
            <button className="modal-close-button" onClick={handleCloseModal}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enunciado22;
