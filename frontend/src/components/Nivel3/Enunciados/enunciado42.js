import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado42Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWhileModal, setShowWhileModal] = useState(false); // Modal para el 'while'
  const [showPrintModal, setShowPrintModal] = useState(false); // Modal para el 'print'
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
    navigate('/Nivel3/memoria/42');
  };

  const handleWhileClick = () => {
    setShowWhileModal(true); // Muestra el modal de 'while'
  };

  const handleCloseWhileModal = () => {
    setShowWhileModal(false); // Cierra el modal de 'while'
  };

  const handlePrintClick = () => {
    setShowPrintModal(true); // Muestra el modal de 'print'
  };

  const handleClosePrintModal = () => {
    setShowPrintModal(false); // Cierra el modal de 'print'
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
                <span>Secuencia de Fibonacci hasta el décimo término</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa genera los primeros 10 números de la secuencia de Fibonacci utilizando un bucle{' '}
                  <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleWhileClick}>while</span>. La secuencia
                  comienza con 0 y 1, y cada número siguiente es la suma de los dos anteriores. Este algoritmo es ampliamente
                  utilizado en matemáticas y programación para modelar patrones de crecimiento y optimización.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`a, b = 0, 1`}
                      <br />
                      {`contador = 1`}
                      <br />
                      <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleWhileClick}>while</span> {` contador <= 10:`}
                      <br />
                      {`  `}
                      <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handlePrintClick}>print</span> {`(a, end=" ")`}
                      <br />
                      {`  a, b = b, a + b`}
                      <br />
                      {`  contador += 1`}
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
                    <img src="/GifNivel3/42.gif" alt="GIF" className="gif-image" />
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
              <img src="/+.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de 'while' */}
        {showWhileModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace while en Python?</h2>
              <p>
                El bucle <strong><code>while</code></strong> se ejecuta mientras la condición especificada sea verdadera.
                En este caso, el bucle continúa ejecutándose hasta que el contador sea mayor que 10.
              </p>
              <button className="modal-close-button" onClick={handleCloseWhileModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de 'print' */}
        {showPrintModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace print en Python?</h2>
              <p>
                La función <strong><code>print()</code></strong> en Python se utiliza para mostrar información en la consola.
                En este caso, muestra el valor de <strong><code>a</code></strong> en cada iteración del bucle.
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

export default Enunciado42Nivel3;
