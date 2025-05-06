import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado13Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWhileModal, setShowWhileModal] = useState(false);
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
    navigate('/Nivel3/basicos/13');
  };

  const handleWhileClick = () => {
    setShowWhileModal(true);
  };

  const handleIfClick = () => {
    setShowIfModal(true);
  };

  const handleCloseWhileModal = () => {
    setShowWhileModal(false);
  };

  const handleCloseIfModal = () => {
    setShowIfModal(false);
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
                <span>Suma Acumulativa Hasta Ingresar Cero</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa solicita al usuario que ingrese números y los va sumando hasta que se ingrese el número 0. En ese momento, el programa finaliza y muestra la suma total de los números ingresados.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      suma = 0{'\n'}
                      numero = int(input("Ingrese un número: ")){'\n'}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleWhileClick}
                      >
                        while
                      </span>{' '}
                      numero != 0:{'\n'}
                      &nbsp;&nbsp;&nbsp;&nbsp;suma += numero{'\n'}
                      &nbsp;&nbsp;&nbsp;&nbsp;numero = int(input("Ingrese un número: ")){'\n'}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleIfClick}
                      >
                        if
                      </span>{' '}
                      (numero == 0):{'\n'}
                      &nbsp;&nbsp;&nbsp;&nbsp;print("Suma total:", suma)
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
                    <img src="/GifNivel3/13.gif" alt="GIF" className="gif-image" />
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
              <img src="/---.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de while */}
        {showWhileModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace el bucle while?</h2>
              <p>
                El bucle <strong>while</strong> repite un bloque de código **mientras se cumpla una condición**.
                En este caso, el programa sigue pidiendo números y sumándolos **hasta que el usuario escriba 0**.
              </p>
              <p>
                Es útil cuando no sabemos cuántas veces necesitaremos repetir la acción.
              </p>
              <button className="modal-close-button" onClick={handleCloseWhileModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de if */}
        {showIfModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace la condición if?</h2>
              <p>
                La instrucción <strong>if</strong> permite **verificar si se cumple una condición**. Si es verdadera,
                se ejecuta el bloque de código que le sigue.
              </p>
              <p>
                En este caso, se usa para **comprobar que el usuario haya ingresado 0** y así mostrar la suma total.
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

export default Enunciado13Nivel3;
