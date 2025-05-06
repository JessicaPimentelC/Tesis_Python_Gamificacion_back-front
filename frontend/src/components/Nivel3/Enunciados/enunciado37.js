import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado37Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWhileModal, setShowWhileModal] = useState(false);  // Modal para el 'while'
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
    navigate('/Nivel3/seleccion/37');
  };

  const handleWhileClick = () => {
    setShowWhileModal(true); // Muestra el modal de 'while'
  };

  const handleCloseWhileModal = () => {
    setShowWhileModal(false); // Cierra el modal de 'while'
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
                <span>Conteo del 1 al 50 usando un bucle while</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa utiliza un buclewhile para imprimir los números del 1 al 50 de manera secuencial. La variable <strong>i</strong> comienza en 1 y se incrementa en cada iteración hasta alcanzar 50. Esto permite recorrer y mostrar todos los números dentro del rango especificado.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`i = 1`}
                      <br />
                      <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleWhileClick}>while</span> {` i <= 50:`}
                      <br />
                      {`  print(i)`}
                      <br />
                      {`  i += 1`}
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
                    <img src="/GifNivel3/37.gif" alt="GIF" className="gif-image" />
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

        {/* Modal explicativo del 'while' */}
        {showWhileModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace while en Python?</h2>
              <p>
                El <strong><code>while</code></strong> es una estructura de control que ejecuta un bloque de código mientras la condición sea verdadera. En este caso, el bucle se ejecuta mientras <code>i &lt;= 50</code>.
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

export default Enunciado37Nivel3;
