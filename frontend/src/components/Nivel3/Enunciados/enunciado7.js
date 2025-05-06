import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado7Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWhileModal, setShowWhileModal] = useState(false); // Estado para el modal de while
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
    navigate('/Nivel3/basicos/7');
  };

  const handleWhileClick = () => {
    setShowWhileModal(true);
  };

  const handleCloseWhileModal = () => {
    setShowWhileModal(false);
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
                <span>Lectura de Números hasta Ingresar Cero</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa solicita al usuario que ingrese números de manera repetida hasta que ingrese el número 0. Utiliza un bucle <code>while</code> que sigue ejecutándose mientras el número ingresado sea diferente de 0.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`num = int(input("Ingrese un número (0 para salir): "))\n`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleWhileClick}
                      >
                        while
                      </span>
                      {` num != 0:\n    num = int(input("Ingrese otro número (0 para salir): "))\n`}
                      {`print("Programa terminado.")\n`}
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
                    <img src="/GifNivel3/7.gif" alt="GIF" className="gif-image" />
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
              <img src="/nivel33.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de `while` */}
        {showWhileModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué es while en Python?</h2>
              <p>
                El bucle <strong>while</strong> permite repetir un bloque de código <strong>mientras una condición sea verdadera</strong>.
              </p>
              <p>
                En este caso, el programa sigue pidiendo un número <strong>mientras</strong> el número ingresado sea diferente de 0.
              </p>
              <p>
                Si en algún momento el usuario ingresa 0, la condición <code>num != 0</code> se vuelve falsa y el bucle se detiene.
              </p>
              <button className="modal-close-button" onClick={handleCloseWhileModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado7Nivel3;
