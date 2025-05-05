import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado15Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showElifModal, setShowElifModal] = useState(false); // ✅ Estado para el modal de elif
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
    navigate('/Nivel2/basicos/15');
  };

  const handleElifClick = () => {
    setShowElifModal(true);
  };

  const handleCloseElifModal = () => {
    setShowElifModal(false);
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
                <span>🕒 Asignación de Turnos según la Hora en Python</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  El programa pedirá al usuario que ingrese una hora en formato de 24 horas (de 0 a 23) y determinará a qué turno pertenece.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>
                      {`hora = int(input("Ingresa la hora (0-23): "))

if 6 <= hora < 12:
    print("Turno de la mañana.")
`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleElifClick}
                      >
                        elif
                      </span>
                      {` 12 <= hora < 18:
    print("Turno de la tarde.")
elif 18 <= hora <= 23 or 0 <= hora < 6:
    print("Turno de la noche.")
else:
    print("Hora no válida.")`}
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
                    <img src="/GifNivel2/15.gif" alt="GIF" className="gif-image" />
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
              <img src="/r.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* ✅ Modal explicativo para elif */}
        {showElifModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué significa elif en Python?</h2>
              <p>
                La palabra clave <strong>elif</strong> significa "else if", y se usa para agregar una condición adicional si la condición anterior (<code>if</code>) no se cumple.
              </p>
              <p>
                Permite encadenar múltiples condiciones sin necesidad de usar varios <code>if</code> separados. Esto mejora la legibilidad y eficiencia del código.
              </p>
              <button className="modal-close-button" onClick={handleCloseElifModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado15Nivel2;
