import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado11Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showIntModal, setShowIntModal] = useState(false); // Nuevo estado para el modal de int
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
    navigate('/Nivel3/basicos/11');
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
              <h2>NIVEL 3</h2>
              <HeaderInfo />
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <span>Repetición de una Cadena de Texto Según un Número Ingresado</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa solicita al usuario que ingrese un número <strong>n</strong> y luego imprime la palabra "hola" esa cantidad de veces. Utiliza un bucle <code>for</code> que se ejecuta desde 0 hasta n-1, asegurando que la cadena se repita exactamente n veces.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      n=
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleIntClick}
                      >
                        int
                      </span>
                      (input("ingrese un numero: ")){'\n'}
                      for n in range(0,n):{'\n'}
                      &nbsp;&nbsp;&nbsp;&nbsp;print('hola')
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
                    <img src="/GifNivel3/11.gif" alt="GIF" className="gif-image" />
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

        {/* Modal de bienvenida */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¡Listo para comenzar!</h2>
              <p>
                🌟 ¡Estás a punto de comenzar una emocionante aventura en el aprendizaje de Python! 🚀
                Prepárate para explorar, descubrir y aprender. ¡Estamos emocionados de tenerte a bordo!
              </p>
              <img src="/-.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo para int */}
        {showIntModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace int() en Python?</h2>
              <p>
                La función <strong>int()</strong> convierte una cadena de texto (como la que se obtiene con <code>input()</code>) en un número entero.
              </p>
              <p>
                Por ejemplo: <code>int("5")</code> devuelve el número <code>5</code> como tipo entero.
              </p>
              <p>
                Es fundamental cuando necesitas realizar operaciones matemáticas con lo que el usuario ha escrito.
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

export default Enunciado11Nivel3;
