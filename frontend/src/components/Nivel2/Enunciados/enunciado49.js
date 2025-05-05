import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado49Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showIntModal, setShowIntModal] = useState(false); // ✅ Modal para int()
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
    navigate('/Nivel2/memoria/49');
  };

  const handleIntClick = () => {
    setShowIntModal(true);
  };

  const handleCloseIntModal = () => {
    setShowIntModal(false);
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
                <span>🔢 Identificador de Números: ¿Es Impar y Negativo?</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa verifica si un número ingresado por el usuario cumple con dos condiciones al mismo tiempo.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>
                      {`numero = `}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleIntClick}
                      >
                        int
                      </span>
                      {`(input("Ingresa un número: "))
if numero % 2 != 0 and numero < 0:
    print("El número es impar y negativo.")
else:
    print("El número no cumple ambas condiciones.")`}
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
                    <img src="/GifNivel2/49.gif" alt="GIF" className="gif-image" />
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

        {/* Modal final de bienvenida */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¡Listo para comenzar!</h2>
              <p>
                🌟 ¡Estás a punto de comenzar una emocionante aventura en el aprendizaje de Python! 🚀
                Prepárate para explorar, descubrir y aprender. ¡Estamos emocionados de tenerte a bordo!
              </p>
              <img src="/i.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* ✅ Modal para explicar int() */}
        {showIntModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace la función int() en Python?</h2>
              <p>
                La función <strong>int()</strong> convierte una cadena de texto (como la que devuelve <code>input()</code>) en un número entero.
                <br /><br />
                Por ejemplo: <code>int("5")</code> se convierte en el número <code>5</code> (tipo <em>int</em>).
              </p>
              <button className="modal-close-button" onClick={handleCloseIntModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado49Nivel2;
