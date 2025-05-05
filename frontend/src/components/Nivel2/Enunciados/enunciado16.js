import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado16Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showIfModal, setShowIfModal] = useState(false); // ✅ Estado para modal de `if`
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
    navigate('/Nivel2/intermedios/16');
  };

  const handleIfClick = () => {
    setShowIfModal(true);
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
              <h2>NIVEL 2</h2>
              <HeaderInfo />
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <span>📅 Identificación del Día de la Semana en Python</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  El programa solicitará al usuario que ingrese un número del 1 al 7 y mostrará el día de la semana correspondiente. Si el usuario ingresa un número fuera de este rango, el programa indicará que la entrada no es válida.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>
                      {`numero = int(input("Ingresa un número: "))\n`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleIfClick}
                      >
                        if
                      </span>
                      {` (numero == 1):\n    print("Es lunes")\n`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleIfClick}
                      >
                        if
                      </span>
                      {` (numero == 2):\n    print("Es martes")\n`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleIfClick}
                      >
                        if
                      </span>
                      {` (numero == 3):\n    print("Es miércoles")\n`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleIfClick}
                      >
                        if
                      </span>
                      {` (numero == 4):\n    print("Es jueves")\n`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleIfClick}
                      >
                        if
                      </span>
                      {` (numero == 5):\n    print("Es viernes")\n`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleIfClick}
                      >
                        if
                      </span>
                      {` (numero == 6):\n    print("Es sábado")\n`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleIfClick}
                      >
                        if
                      </span>
                      {` (numero == 7):\n    print("Es domingo")\n`}
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
                    <img src="/GifNivel2/16.gif" alt="GIF" className="gif-image" />
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
              <img src="/ttt.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* ✅ Modal explicativo para `if` */}
        {showIfModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué es <code>if</code> en Python?</h2>
              <p>
                La palabra clave <strong>if</strong> se usa para realizar una evaluación condicional en Python.
              </p>
              <p>
                Si la condición dentro del <code>if</code> se cumple (es decir, es verdadera), entonces se ejecuta el bloque de código que está indentado justo debajo.
              </p>
              <p>
                Es la base de la toma de decisiones en programación.
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

export default Enunciado16Nivel2;
