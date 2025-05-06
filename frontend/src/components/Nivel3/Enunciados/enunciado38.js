import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado38Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showIfModal, setShowIfModal] = useState(false); // Modal para el 'if'
  const [showForModal, setShowForModal] = useState(false); // Modal para el 'for'
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
    navigate('/Nivel3/seleccion/38');
  };

  const handleIfClick = () => {
    setShowIfModal(true); // Muestra el modal de 'if'
  };

  const handleCloseIfModal = () => {
    setShowIfModal(false); // Cierra el modal de 'if'
  };

  const handleForClick = () => {
    setShowForModal(true); // Muestra el modal de 'for'
  };

  const handleCloseForModal = () => {
    setShowForModal(false); // Cierra el modal de 'for'
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
                <span>Conteo de múltiplos de 3 o 5 en un rango numérico</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa cuenta cuántos números entre 1 y 50 son múltiplos de 3 o de 5. Para ello, utiliza un bucle{' '}
                  <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleForClick}>for</span> que recorre el rango
                  del 1 al 50 y verifica si cada número es divisible por 3 o por 5 utilizando una sentencia <span
                    style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleIfClick}>if</span>. Si cumple con la
                  condición, se incrementa un contador. Al finalizar el recorrido, se muestra la cantidad total de múltiplos
                  encontrados.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`numero = 50`}
                      <br />
                      {`contador = 0`}
                      <br />
                      <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleForClick}>for</span> {` i in range(1, numero + 1):`}
                      <br />
                      {`  `}
                      <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleIfClick}>if</span> {` i % 3 == 0 or i % 5 == 0:`}
                      <br />
                      {`    contador += 1`}
                      <br />
                      {`print("Cantidad de múltiplos de 3 o 5:", contador)`}
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
                    <img src="/GifNivel3/38.gif" alt="GIF" className="gif-image" />
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

        {/* Modal explicativo de 'if' */}
        {showIfModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace <span style={{ color: '#00bfff' }}>if</span> en Python?</h2>
              <p>
                La sentencia <strong><code>if</code></strong> en Python se utiliza para tomar decisiones. Si la condición que
                sigue a la palabra <strong><code>if</code></strong> es verdadera, se ejecuta el bloque de código correspondiente.
                En este caso, verifica si el número es divisible por 3 o 5.
              </p>
              <button className="modal-close-button" onClick={handleCloseIfModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de 'for' */}
        {showForModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace <span style={{ color: '#00bfff' }}>for</span> en Python?</h2>
              <p>
                El bucle <strong><code>for</code></strong> en Python se utiliza para iterar sobre una secuencia (como una lista,
                un rango, etc.). En este caso, recorre el rango de 1 a 50.
              </p>
              <button className="modal-close-button" onClick={handleCloseForModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado38Nivel3;
