import React, { useState, useEffect } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado25 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();
  const [hoveredInsignia, setHoveredInsignia] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/seleccion/25');
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

  const handleMouseLeave = () => {};

  return (
    <div className="nivel1-container">
      <Sidebar />
      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
          <div className="header-title">
                <h2>NIVEL 1</h2>
                <HeaderInfo></HeaderInfo>
              </div>
          <div className="nivel1-card">
          <div className="nivel1-card-header">
  <span>Cálculo de Potencia</span>
</div>
<div className="nivel1-card-body">
  <p>
    En Python, podemos calcular el resultado de elevar un número a una potencia de forma sencilla. En esta actividad,
    crearás un algoritmo que solicite al usuario ingresar una base y un exponente, y luego mostrará el resultado de 
    elevar la base al exponente.
  </p>
  <div className="code-box">
    <div className="code-header">Python</div>
    <pre className="code">

    <code>
base = int(input("Ingrese la base: ")){"\n"}
exponente = int(input("Ingrese el exponente: ")){"\n"}
resultado = base ** exponente{"\n"}
print("El resultado es:", resultado)
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
                  <img src="25.gif" alt="GIF" className="gif-image" />
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
              🌟 ¡Estás progresando muy bien en tu aprendizaje de Python! 🚀 Ahora es el momento de poner en práctica tus
              conocimientos con un nuevo ejercicio. Prepárate para aplicar lo que has aprendido hasta ahora y seguir
              avanzando.
            </p>
            <img src="1111.gif" alt="GIF de bienvenida" className="modal-gif" />
            <button className="modal-close-button" onClick={handleCloseModal}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enunciado25;
