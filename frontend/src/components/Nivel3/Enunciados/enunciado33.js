import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado33Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showIfModal, setShowIfModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const navigate = useNavigate();

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
    navigate('/Nivel3/intermedios/33');
  };

  const handleIfClick = () => {
    setShowIfModal(true);
  };

  const handleCloseIfModal = () => {
    setShowIfModal(false);
  };

  const handleBreakClick = () => {
    setShowBreakModal(true);
  };

  const handleCloseBreakModal = () => {
    setShowBreakModal(false);
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
                <span>Suma de números ingresados hasta ingresar 0</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa permite al usuario ingresar números de manera indefinida y los va sumando en una variable acumuladora llamada suma. El ciclo while se ejecuta hasta que el usuario ingrese el número 0, momento en el cual el programa se detiene y muestra el resultado total de la suma. Esta lógica permite sumar múltiples valores sin necesidad de especificar previamente cuántos números se ingresarán.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`
suma = 0
while True:
    numero = float(input("Ingresa un número (0 para terminar): "))
    `}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleIfClick}
                      >
                        if
                      </span>
                      {` numero == 0:`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleBreakClick}
                      >
                        break
                      </span>
                      {`
    suma += numero
print(f"La suma de los números ingresados es: {suma}")
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
                    <img src="/GifNivel3/33.gif" alt="GIF" className="gif-image" />
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
              <img src="/+++++++.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de if */}
        {showIfModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace if en Python?</h2>
              <p>
                <strong><code>if</code></strong> es una estructura condicional que ejecuta un bloque de código si una condición se cumple. En este caso, el programa verifica si el número ingresado es igual a 0.
              </p>
              <button className="modal-close-button" onClick={handleCloseIfModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de break */}
        {showBreakModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Para qué sirve break?</h2>
              <p>
                <strong><code>break</code></strong> se utiliza para salir de un bucle antes de que termine. En este caso, si el número ingresado es 0, se interrumpe el ciclo <code>while</code>.
              </p>
              <button className="modal-close-button" onClick={handleCloseBreakModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado33Nivel3;
