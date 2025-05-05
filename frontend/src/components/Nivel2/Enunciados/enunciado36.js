import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado36Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMathModal, setShowMathModal] = useState(false); // ✅ modal para "math"
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
    navigate('/Nivel2/seleccion/33');
  };

  const handleMathClick = () => {
    setShowMathModal(true);
  };

  const handleCloseMathModal = () => {
    setShowMathModal(false);
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
                <span>📏 Verificación de un Cuadrado Perfecto en Python</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  El programa solicita al usuario que ingrese un número entero y verifica si es un cuadrado perfecto. Un número es un cuadrado perfecto si su raíz cuadrada es un número entero.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>
                      {`import `}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleMathClick}
                      >
                        math
                      </span>
                      {`
numero = int(input("Ingresa un número: "))
raiz_cuadrada = math.isqrt(numero)
if raiz_cuadrada ** 2 == numero:
    print(f"{numero} es un cuadrado perfecto.")
else:
    print(f"{numero} no es un cuadrado perfecto.")
("Contraseña incorrecta. Acceso denegado.")
`}
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
                    <img src="/GifNivel2/36.gif" alt="GIF" className="gif-image" />
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

        {/* Modal general de bienvenida */}
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

        {/* ✅ Modal informativo para 'math' */}
        {showMathModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué es el  math en Python?</h2>
              <p>
                El módulo <strong>math</strong> en Python proporciona funciones matemáticas como raíces cuadradas, potencias, logaritmos y funciones trigonométricas. En este caso, se utiliza <code>math.isqrt()</code> para obtener la raíz cuadrada entera de un número.
              </p>
              <button className="modal-close-button" onClick={handleCloseMathModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado36Nivel2;
