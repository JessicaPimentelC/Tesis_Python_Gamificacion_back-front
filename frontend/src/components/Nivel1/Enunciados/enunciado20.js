import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado20 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Hook para la redirección
  const [numerosUsados, setNumerosUsados] = useState([]); // Almacena los números ya utilizados
  
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/basicos/20');
  };

  const handleShowGif = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowContinue(true);
    }, 2000); // Asume que el GIF tiene una duración de 2 segundos
  };

  const handleContinueClick = () => {
    setShowModal(true);
  };

  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">
      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>NIVEL 1</h2>
              <HeaderInfo></HeaderInfo>
            </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span>Ejercicio 9: Conversión de Temperatura</span>
            </div>
            <div className="nivel1-card-body">
              <p>
                En este ejercicio, aprenderás a convertir una temperatura de grados Fahrenheit a Celsius en Python.
              </p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code-content">
                  <code>
                    {`fahrenheit = float(input("Ingresa la temperatura en grados Fahrenheit: "))
celsius = (fahrenheit - 32) * 5/9
print("La temperatura en Celsius es:", celsius)
`}
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
                  <img src="gif20.gif" alt="GIF" className="gif-image" />
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
            <h2>¡Felicidades por completar los ejercicios!</h2>
            <p>
              🌟 ¡Excelente trabajo! 🚀 Has completado todos los ejercicios. Ahora puedes realizar el examen final para poner a prueba tus conocimientos. ¡Sigue así!
            </p>
            <img src="Aq.gif" alt="GIF de bienvenida" className="modal-gif" />
            <button className="modal-close-button" onClick={handleCloseModal}>
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Enunciado20;
