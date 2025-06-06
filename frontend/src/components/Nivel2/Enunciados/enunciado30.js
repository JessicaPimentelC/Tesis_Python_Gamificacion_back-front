import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado30Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false); // Modal específico para 'input'
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
    navigate('/Nivel2/intermedios/30');
  };

  const handleInputClick = () => {
    setShowInputModal(true); // Mostrar modal al hacer click en 'input'
  };

  const handleCloseInputModal = () => {
    setShowInputModal(false); // Cerrar modal de 'input'
  };

  return (
    <div className="nivel1-page">
      <Sidebar />
      <div className="nivel1-container">
        <div className="content">
          <div className="white-background">
            <HeaderBody />
            <div className="header-title">
              <h2>NIVEL 2</h2>
              <HeaderInfo />
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <span> 🔢 Verificación de Divisibilidad en Python</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  El programa solicita al usuario que ingrese un número y, utilizando una estructura condicional (if-else), verifica si el número cumple la siguiente condición:
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>{`
numero = int(`}
                      <span
                        style={{
                          color: '#00bfff',
                          cursor: 'pointer',
                        }}
                        onClick={handleInputClick}
                      >
                        input
                      </span>
                      {`("Ingresa un número: "))
if numero % 4 == 0 and numero % 6 != 0:
  print("El número es divisible por 4 pero no por 6.")
else:
  print("El número no cumple la condición.")
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
                    <img src="/GifNivel2/30.gif" alt="GIF" className="gif-image" />
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
              <img src="/d.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {showInputModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace "input" en Python?</h2>
              <p>
                La función <strong>input()</strong> se utiliza para capturar la entrada del usuario desde el teclado. En este caso, se solicita al usuario que ingrese un número, que luego es convertido a un entero usando <strong>int()</strong>. Es muy útil cuando necesitas que el usuario proporcione datos para que el programa los procese.
              </p>
              <button className="modal-close-button" onClick={handleCloseInputModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado30Nivel2;
