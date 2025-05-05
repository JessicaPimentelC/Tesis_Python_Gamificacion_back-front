import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado22Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showIfModal, setShowIfModal] = useState(false);
  const navigate = useNavigate();

  const handleShowGif = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowContinue(true);
    }, 2000);
  };

  const handleContinueClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/Nivel2/intermedios/22');
  };

  const handleIfClick = () => {
    setShowIfModal(true);
  };

  const handleCloseIfModal = () => {
    setShowIfModal(false);
  };

  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">
        <div className="content">
          <div className="white-background">
            <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>NIVEL 2</h2>
              <HeaderInfo></HeaderInfo>
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <span> 🎯 Clasificación por Categoría de Edad en Python</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Escribe un programa que solicite al usuario ingresar su edad y, con base en el valor ingresado, determine en qué etapa de la vida se encuentra.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>{`edad = int(input("Ingresa tu edad: "))
`}</code>
                    <span onClick={handleIfClick} style={{ color: '#00bfff', cursor: 'pointer', textDecoration: 'underline' }}>if</span>
                    <code>{` edad <= 12:
    categoría = "niño"
elif 13 <= edad <= 19:
    categoría = "adolescente"
else:
    categoría = "adulto"
print("Eres un", categoría)
`}</code>
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
                    <img src="/GifNivel2/22.gif" alt="GIF" className="gif-image" />
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
              <h2>¡Listo para comenzar!</h2>
              <p>
                🌟 ¡Estás a punto de comenzar una emocionante aventura en el aprendizaje de Python! 🚀
                Prepárate para explorar, descubrir y aprender. ¡Estamos emocionados de tenerte a bordo!
              </p>
              <img src="/y.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {showIfModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace "if" en Python?</h2>
              <p>
                La palabra clave <strong>if</strong> se utiliza para hacer una condición: si algo es verdadero, el bloque de código indentado se ejecutará. Es fundamental para tomar decisiones lógicas dentro de un programa.
              </p>
              <button className="modal-close-button" onClick={handleCloseIfModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Enunciado22Nivel2;
