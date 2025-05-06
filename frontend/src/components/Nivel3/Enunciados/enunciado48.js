import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado48Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMinusAssignModal, setShowMinusAssignModal] = useState(false); // Modal para '-='
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
    navigate('/Nivel3/memoria/48');
  };

  const handleMinusAssignClick = () => {
    setShowMinusAssignModal(true); // Muestra el modal de '-='
  };

  const handleCloseMinusAssignModal = () => {
    setShowMinusAssignModal(false); // Cierra el modal de '-='
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
                <span>Cuenta regresiva del 10 al 1</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa imprime una cuenta regresiva desde 10 hasta 1 utilizando un bucle while. En cada iteración, el valor de i se reduce en 1 hasta que alcanza 0, momento en el que el ciclo finaliza.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`i = 10`}
                      <br />
                      {`while i > 0:`}
                      <br />
                      {`    print(i)`}
                      <br />
                      <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleMinusAssignClick}>i -= 1</span>
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
                    <img src="/GifNivel3/48.gif" alt="GIF" className="gif-image" />
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

        {/* Modal explicativo de '-=' */}
        {showMinusAssignModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace '-=' en Python?</h2>
              <p>
                El operador <strong><code>-=</code></strong> es un operador de asignación compuesto. En lugar de escribir <strong><code>i = i - 1</code></strong>, podemos escribir <strong><code>i -= 1</code></strong>, lo que tiene el mismo efecto de restar 1 a la variable <strong><code>i</code></strong>.
              </p>
              <button className="modal-close-button" onClick={handleCloseMinusAssignModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default Enunciado48Nivel3;
