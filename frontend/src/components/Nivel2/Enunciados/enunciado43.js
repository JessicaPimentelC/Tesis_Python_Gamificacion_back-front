import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado43Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false); // ✅ Modal para print()
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
    navigate('/Nivel2/memoria/43');
  };

  const handlePrintClick = () => {
    setShowPrintModal(true);
  };

  const handleClosePrintModal = () => {
    setShowPrintModal(false);
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
                <span>🔺 Identificación del Tipo de Triángulo según sus Lados</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  El programa pedirá al usuario que ingrese las longitudes de los tres lados de un triángulo. Luego, utilizando estructuras condicionales (if-elif-else), analizará los valores ingresados y determinará de qué tipo de triángulo se trata, mostrando el resultado en pantalla.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>
                      {`
lado1 = float(input("Ingresa la longitud del primer lado: "))
lado2 = float(input("Ingresa la longitud del segundo lado: "))
lado3 = float(input("Ingresa la longitud del tercer lado: "))

if lado1 == lado2 == lado3:
    `}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handlePrintClick}
                      >
                        print
                      </span>
                      {`("Es un triángulo equilátero.")
elif lado1 == lado2 or lado1 == lado3 or lado2 == lado3:
    `}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handlePrintClick}
                      >
                        print
                      </span>
                      {`("Es un triángulo isósceles.")
else:
    `}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handlePrintClick}
                      >
                        print
                      </span>
                      {`("Es un triángulo escaleno.")`}
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
                    <img src="/GifNivel2/43.gif" alt="GIF" className="gif-image" />
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
              <img src="/u.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* ✅ Modal para explicar print() */}
        {showPrintModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace la función print() en Python?</h2>
              <p>
                La función <strong>print()</strong> se utiliza para mostrar mensajes en la pantalla. Es una de las funciones más usadas en Python y sirve para ver resultados, mensajes o valores de variables mientras se ejecuta un programa.
              </p>
              <button className="modal-close-button" onClick={handleClosePrintModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado43Nivel2;
