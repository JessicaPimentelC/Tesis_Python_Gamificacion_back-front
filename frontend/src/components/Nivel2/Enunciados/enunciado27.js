import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado27Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showElseModal, setShowElseModal] = useState(false); // Modal específico para 'else'
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
    navigate('/Nivel2/intermedios/27');
  };

  const handleElseClick = () => {
    setShowElseModal(true); // Mostrar modal al hacer click en 'else'
  };

  const handleCloseElseModal = () => {
    setShowElseModal(false); // Cerrar modal de 'else'
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
                <span> 🔢 Verificación de Múltiplos en Python</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  El programa solicita al usuario que ingrese dos números y, utilizando una estructura condicional (if-else), verifica si el primer número es múltiplo del segundo.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>{`
num1 = int(input("Ingresa el primer número: "))
num2 = int(input("Ingresa el segundo número: "))

if num1 % num2 == 0:
	print(f"{num1} es múltiplo de {num2}.")
`}</code>
                    <div
                      style={{
                        color: '#00bfff',
                        cursor: 'pointer',
                        display: 'inline',
                      }}
                      onClick={handleElseClick}
                    >
                      <code>else</code>
                    </div>
                    <code>{`
	print(f"{num1} no es múltiplo de {num2}.")
`}</code>
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
                    <img src="/GifNivel2/27.gif" alt="GIF" className="gif-image" />
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

        {showElseModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace "else" en Python?</h2>
              <p>
                La palabra clave <strong>else</strong> se utiliza en las estructuras condicionales para definir una acción que se ejecutará cuando ninguna de las condiciones anteriores (como <strong>if</strong> o <strong>elif</strong>) sea verdadera. En este caso, si el número no es múltiplo del segundo, se ejecutará el bloque de código dentro del <strong>else</strong>.
              </p>
              <button className="modal-close-button" onClick={handleCloseElseModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado27Nivel2;
