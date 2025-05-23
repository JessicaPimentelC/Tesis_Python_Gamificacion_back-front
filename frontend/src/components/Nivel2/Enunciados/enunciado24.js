import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado24Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForModal, setShowForModal] = useState(false); // Modal específico para 'for'
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
    navigate('/Nivel2/intermedios/24');
  };

  const handleForClick = () => {
    setShowForModal(true); // Mostrar modal al hacer click en 'for'
  };

  const handleCloseForModal = () => {
    setShowForModal(false); // Cerrar modal de 'for'
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
                <span> 🔺 Clasificación de un Triángulo según sus Lados en Python</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  El programa pedirá al usuario que ingrese las longitudes de los tres lados de un triángulo.
                  Luego, analizará las medidas ingresadas y determinará qué tipo de triángulo es, según las siguientes clasificaciones.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>{`
numero = int(input("Ingresa un número: "))
suma_divisores = 0
`}</code>
                    <div
                      style={{
                        color: '#00bfff',
                        cursor: 'pointer',
                        display: 'inline',
                      }}
                      onClick={handleForClick}
                    >
                      <code>for</code>
                    </div>
                    <code>{` i in range(1, numero):`}</code>
                    <code>{`
    if numero % i == 0:
        suma_divisores += i

if suma_divisores == numero:
    print(f"{numero} es un número perfecto.")
else:
    print(f"{numero} no es un número perfecto.")
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
                    <img src="/GifNivel2/24.gif" alt="GIF" className="gif-image" />
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
              <img src="/yy.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {showForModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace "for" en Python?</h2>
              <p>
                La palabra clave <strong>for</strong> se utiliza para crear un bucle que itera sobre una secuencia (como una lista, un rango, etc.).
                Es fundamental para repetir un bloque de código varias veces.
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

export default Enunciado24Nivel2;
