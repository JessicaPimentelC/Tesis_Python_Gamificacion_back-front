import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado47Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForModal, setShowForModal] = useState(false); // Modal para el 'for'
  const [showAssignModal, setShowAssignModal] = useState(false); // Modal para el '='
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
    navigate('/Nivel3/memoria/47');
  };

  const handleForClick = () => {
    setShowForModal(true); // Muestra el modal de 'for'
  };

  const handleCloseForModal = () => {
    setShowForModal(false); // Cierra el modal de 'for'
  };

  const handleAssignClick = () => {
    setShowAssignModal(true); // Muestra el modal de '='
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false); // Cierra el modal de '='
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
                <span>Impresión de caracteres de una palabra</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa toma una palabra predefinida, en este caso "Python", y muestra cada una de sus letras en una línea diferente. Utiliza un bucle <strong>for</strong> para recorrer la cadena de texto y mostrar cada carácter por separado.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`palabra `}<span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleAssignClick}>=</span> {` "Python"`}
                      <br />
                      <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleForClick}>for</span> {` letra in palabra:`}
                      <br />
                      {`    print(letra)`}
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
                    <img src="/GifNivel3/47.gif" alt="GIF" className="gif-image" />
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

        {/* Modal explicativo de 'for' */}
        {showForModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace 'for' en Python?</h2>
              <p>
                El bucle <strong><code>for</code></strong> se utiliza para iterar sobre una secuencia (como una lista, una cadena o un rango de números). En este caso, <strong><code>for letra in palabra:</code></strong> recorre cada carácter de la cadena de texto <strong><code>palabra</code></strong> y lo asigna a la variable <strong><code>letra</code></strong> en cada iteración.
              </p>
              <button className="modal-close-button" onClick={handleCloseForModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de '=' */}
        {showAssignModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace '=' en Python?</h2>
              <p>
                El operador <strong><code>=</code></strong> se utiliza para asignar un valor a una variable. En este caso, <strong><code>palabra = "Python"</code></strong> asigna el valor de la cadena de texto <strong><code>"Python"</code></strong> a la variable <strong><code>palabra</code></strong>.
              </p>
              <button className="modal-close-button" onClick={handleCloseAssignModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado47Nivel3;
