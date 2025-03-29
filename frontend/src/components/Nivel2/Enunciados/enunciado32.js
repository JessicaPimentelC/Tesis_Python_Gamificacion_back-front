import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado32Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Hook para la redirección

  const handleShowGif = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowContinue(true);
    }, 2000); // Asume que el GIF tiene una duración de 2 segundos
  };

  const handleContinueClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/Nivel2/seleccion/32');
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
              <span> 🔐 Verificación de Contraseña en Python


</span>
            </div>
            <div className="nivel1-card-body">
            <p>
            El programa solicita al usuario que ingrese una contraseña y, utilizando una estructura de decisión (if-else), verifica si la contraseña ingresada coincide con la contraseña predefinida.    </p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code-area">
                  <code>{`
contraseña_correcta = "python123"
contraseña = input("Ingresa la contraseña: ")

if contraseña == contraseña_correcta:
    print("Contraseña correcta. Acceso concedido.")
else:
    print("Contraseña incorrecta. Acceso denegado.")

`} </code>
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
                  <img src="/GifNivel2/32.gif" alt="GIF" className="gif-image" />
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
            <img src="/X3PR.gif" alt="GIF de bienvenida" className="modal-gif" />
            <button className="modal-close-button" onClick={handleCloseModal}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Enunciado32Nivel2;
