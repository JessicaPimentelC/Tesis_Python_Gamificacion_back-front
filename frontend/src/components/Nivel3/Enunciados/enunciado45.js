import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado45Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // Modal para el '+='
  const [showBModal, setShowBModal] = useState(false); // Modal para la variable 'b'
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
    navigate('/Nivel3/memoria/45');
  };

  const handleAddClick = () => {
    setShowAddModal(true); // Muestra el modal de '+='
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false); // Cierra el modal de '+='
  };

  const handleBClick = () => {
    setShowBModal(true); // Muestra el modal de 'b'
  };

  const handleCloseBModal = () => {
    setShowBModal(false); // Cierra el modal de 'b'
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
                <span>Multiplicación mediante sumas sucesivas</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa realiza la multiplicación de dos números enteros utilizando sumas sucesivas en lugar del operador
                  de multiplicación (*). Se toma un número <code>a</code> y se le suma repetidamente a una variable <code>resultado</code>, tantas
                  veces como indique el valor de <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleBClick}>b</span>.
                  Un contador <span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleBClick}>i</span> controla el número de repeticiones
                  en un bucle while. Finalmente, se muestra el resultado de la multiplicación.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`a = 7`}
                      <br />
                      {`b = 5`}
                      <br />
                      {`resultado = 0`}
                      <br />
                      {`i = 0`}
                      <br />
                      {`while i < b:`}
                      <br />
                      {`  resultado `}<span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleAddClick}>+=</span> {` a`}
                      <br />
                      {`  i += 1`}
                      <br />
                      {`print("Multiplicación:", resultado)`}
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
                    <img src="/GifNivel3/45.gif" alt="GIF" className="gif-image" />
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

        {/* Modal explicativo de '+=' */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace  += en Python?</h2>
              <p>
                El operador <strong><code>+=</code></strong> es una forma abreviada de sumar un valor a una variable existente.
                En este caso, <strong><code>resultado += a</code></strong> es equivalente a <strong><code>resultado = resultado + a</code></strong>.
              </p>
              <button className="modal-close-button" onClick={handleCloseAddModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de 'b' */}
        {showBModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué es <span style={{ color: '#00bfff' }}>b</span> en Python?</h2>
              <p>
                La variable <strong><code>b</code></strong> representa el número de repeticiones del bucle. En este caso, es el número
                que indica cuántas veces se sumará el valor de <strong><code>a</code></strong> a <strong><code>resultado</code></strong>.
              </p>
              <button className="modal-close-button" onClick={handleCloseBModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado45Nivel3;
