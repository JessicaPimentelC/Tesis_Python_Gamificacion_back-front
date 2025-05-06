import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado22Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWhileModal, setShowWhileModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
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
    navigate('/Nivel3/intermedios/22');
  };

  const handleWhileClick = () => {
    setShowWhileModal(true);
  };

  const handleCloseWhileModal = () => {
    setShowWhileModal(false);
  };

  const handlePrintClick = () => {
    setShowPrintModal(true);
  };

  const handleClosePrintModal = () => {
    setShowPrintModal(false);
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
                <span>Suma de los Dígitos de un Número</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa solicita al usuario que ingrese un número entero positivo y luego calcula la suma de sus dígitos. Para ello, extrae cada dígito utilizando el operador módulo (%), lo suma a una variable acumuladora (suma), y luego elimina el dígito dividiendo el número entre 10 (//).
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      numero = int(input("Ingrese un número: ")){'\n'}
                      suma = 0{'\n'}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleWhileClick}
                      >
                        while
                      </span>{' '}
                      numero &gt; 0:{'\n'}
                      &nbsp;&nbsp;&nbsp;&nbsp;digito = numero % 10{'\n'}
                      &nbsp;&nbsp;&nbsp;&nbsp;suma += digito{'\n'}
                      &nbsp;&nbsp;&nbsp;&nbsp;numero //= 10{'\n\n'}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handlePrintClick}
                      >
                        print
                      </span>
                      (f"La suma de los dígitos es: {`{suma}`}")
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
                    <img src="/GifNivel3/22.gif" alt="GIF" className="gif-image" />
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

        {/* Modal explicativo de while */}
        {showWhileModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace while en Python?</h2>
              <p>
                <strong><code>while</code></strong> es una estructura de repetición que ejecuta un bloque de código mientras una condición sea verdadera.
              </p>
              <p>
                En este ejemplo, el bucle se ejecuta mientras <code>numero &gt; 0</code>, es decir, mientras queden dígitos por procesar.
              </p>
              <button className="modal-close-button" onClick={handleCloseWhileModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de print */}
        {showPrintModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Para qué sirve print?</h2>
              <p>
                <strong><code>print()</code></strong> es una función que muestra en pantalla el resultado o mensaje que tú le indiques.
              </p>
              <p>
                En este caso, muestra el texto: <code>"La suma de los dígitos es: X"</code>, siendo X el resultado de la suma.
              </p>
              <button className="modal-close-button" onClick={handleClosePrintModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado22Nivel3;
