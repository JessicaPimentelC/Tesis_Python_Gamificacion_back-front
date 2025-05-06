import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado6Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRangeModal, setShowRangeModal] = useState(false); // Estado para el modal de range
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
    navigate('/Nivel3/basicos/6');
  };

  const handleRangeClick = () => {
    setShowRangeModal(true);
  };

  const handleCloseRangeModal = () => {
    setShowRangeModal(false);
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
                <span>Conteo Descendente con un Bucle for</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa utiliza un bucle <code>for</code> en Python para contar del 10 al 1 en orden descendente. La función <code>range(10, 0, -1)</code> genera una secuencia que comienza en 10 y disminuye en 1 en cada iteración, hasta llegar a 1.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`for i in `}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleRangeClick}
                      >
                        range
                      </span>
                      {`(10, 0, -1):\n    print(i)\n`}
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
                    <img src="/GifNivel3/6.gif" alt="GIF" className="gif-image" />
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

        {/* Modal explicativo de `range` */}
        {showRangeModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace range()en Python?</h2>
              <p>
                La función <strong>range(inicio, fin, paso)</strong> genera una secuencia de números enteros.
              </p>
              <ul>
                <li><strong>Inicio:</strong> el número desde donde comienza la secuencia (10).</li>
                <li><strong>Fin:</strong> el número hasta donde llega sin incluirlo (0 no se incluye).</li>
                <li><strong>Paso:</strong> cuánto se incrementa o decrementa (en este caso, -1).</li>
              </ul>
              <p>
                En <code>range(10, 0, -1)</code>, se genera: <code>10, 9, 8, ..., 1</code>
              </p>
              <button className="modal-close-button" onClick={handleCloseRangeModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado6Nivel3;
