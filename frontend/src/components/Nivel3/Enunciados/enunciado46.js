import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado46Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // Modal para el '+='
  const [showLessEqualModal, setShowLessEqualModal] = useState(false); // Modal para el '<='
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
    navigate('/Nivel3/memoria/46');
  };

  const handleAddClick = () => {
    setShowAddModal(true); // Muestra el modal de '+='
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false); // Cierra el modal de '+='
  };

  const handleLessEqualClick = () => {
    setShowLessEqualModal(true); // Muestra el modal de '<='
  };

  const handleCloseLessEqualModal = () => {
    setShowLessEqualModal(false); // Cierra el modal de '<='
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
                  Este programa cuenta cuántos números entre 1 y 100 son divisibles por 7. Utiliza un bucle while que recorre los números del 1 al 100 y un contador que se incrementa cada vez que un número es múltiplo de 7. Al finalizar, muestra la cantidad total de números divisibles por 7 en el rango especificado.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`i = 1`}
                      <br />
                      {`contador = 0`}
                      <br />
                      {`while i <= 100:`}
                      <br />
                      {`  if i % 7 == 0:`}
                      <br />
                      {`    contador `}<span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleAddClick}>+=</span> {` 1`}
                      <br />
                      {`  i `}<span style={{ color: '#00bfff', cursor: 'pointer' }} onClick={handleLessEqualClick}>&lt;=</span> {` 100`}
                      <br />
                      {`print("Cantidad de números divisibles por 7:", contador)`}
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
                    <img src="/GifNivel3/46.gif" alt="GIF" className="gif-image" />
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
                En este caso, <strong><code>contador += 1</code></strong> es equivalente a <strong><code>contador = contador + 1</code></strong>.
              </p>
              <button className="modal-close-button" onClick={handleCloseAddModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de '<=' */}
        {showLessEqualModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué es &lt;= en Python?</h2>
              <p>
                El operador <strong><code>&lt;=</code></strong> se utiliza para comparar dos valores, verificando si el valor a la izquierda es menor o igual al valor de la derecha.
                En este caso, <strong><code>i &lt;= 100</code></strong> asegura que el bucle se ejecute mientras <code>i</code> sea menor o igual a 100.
              </p>
              <button className="modal-close-button" onClick={handleCloseLessEqualModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado46Nivel3;
