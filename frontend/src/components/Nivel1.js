import React, { useState } from 'react';
import '../styles/Nivel1.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import HeaderBody from './HeaderBody';
import HeaderInfo from './HeaderInfo';

const Nivel1 = ({ toggleView }) => {
  const [showNext, setShowNext] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate(); // Hook para la redirección

  const handleNextClick = () => {
    setShowNext(true);
  };

  const handleContinueClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmYes = () => {
    navigate('/enunciado1'); // Cambia la vista al módulo enunciado1
  };

  const handleConfirmNo = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="nivel1-container">
      <Sidebar></Sidebar>
      <div className="content">
        <div className="white-background">
        <div className="header">
                <HeaderInfo></HeaderInfo>
                </div>
                <div className="header-title">
                    <h2>NIVEL 1</h2>
                </div>          
                <p>¡𝙀𝙡 𝙥𝙧𝙞𝙢𝙚𝙧 𝙥𝙖𝙨𝙤 𝙚𝙨𝙩á 𝙙𝙖𝙙𝙤, 𝙘𝙤𝙢𝙚𝙣𝙘𝙚𝙢𝙤𝙨 𝙟𝙪𝙣𝙩𝙤𝙨 𝙚𝙨𝙩𝙚 𝙣𝙞𝙫𝙚𝙡!</p>
          <div className={`nivel1-card ${showNext ? 'fade-out' : ''}`}>
            <div className="nivel1-card-header">
              <span>Python: Un Lenguaje de Programación Innovador y Versátil</span>
            </div>
            <div className="nivel1-card-body">
              <p>
              Python es un lenguaje de programación de alto nivel, conocido por su simplicidad y claridad. Facilita el desarrollo de soluciones eficientes y es ampliamente utilizado en áreas como desarrollo web e inteligencia artificial, gracias a su versatilidad y una comunidad activa que impulsa su evolución.
              </p>
              <div className="nivel1-card-button-container">
                {!showNext && (
                  <button className="nivel1-card-button" onClick={handleNextClick}>
                    Siguiente
                  </button>
                )}
              </div>
            </div>
          </div>
          {showNext && !showConfirmation && (
            <div className="nivel1-next-section show">
              <h2>¿Por qué aprender Python?</h2>
              <p>
              Python es un lenguaje de programación popular y versátil, conocido por su sintaxis sencilla y fácil de leer, ideal tanto para principiantes como para expertos. Se utiliza en diversos campos como desarrollo web, ciencia de datos, inteligencia artificial y automatización. Aprender Python abre muchas oportunidades laborales y facilita el aprendizaje de otros lenguajes. Además, su amplia comunidad y recursos lo hacen accesible y práctico para todo tipo de proyectos.
              </p>
              <div className="nivel1-next-button-container">
                <button className="nivel1-next-button" onClick={handleContinueClick}>Continuar</button>
              </div>
            </div>
          )}
          {showConfirmation && (
            <div className="confirmation-popup">
              <p>¿Estás listo para empezar esta aventura de la programación?</p>
              <div className="confirmation-buttons">
                <button className="confirmation-button" onClick={handleConfirmYes}>Sí</button>
                <button className="confirmation-button" onClick={handleConfirmNo}>No</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nivel1;
