import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado44Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSumModal, setShowSumModal] = useState(false); // ✅ Modal para sum()
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
    navigate('/Nivel2/memoria/44');
  };

  const handleSumClick = () => {
    setShowSumModal(true);
  };

  const handleCloseSumModal = () => {
    setShowSumModal(false);
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
                <span>🔢 Verificación de Números de Armstrong</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  El programa pedirá al usuario que ingrese un número y determinará si es un número de Armstrong. Un número de Armstrong (o número narcisista) es aquel cuya suma de sus dígitos elevados a la potencia de la cantidad total de dígitos es igual al mismo número.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>
                      {`
numero = input("Ingresa un número: ")
longitud = len(numero)
suma = `}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleSumClick}
                      >
                        sum
                      </span>
                      {`(int(digito) ** longitud for digito in numero)
if suma == int(numero):
    print(f"{numero} es un número de Armstrong.")
else:
    print(f"{numero} no es un número de Armstrong.")`}
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
                    <img src="/GifNivel2/44.gif" alt="GIF" className="gif-image" />
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

        {/* ✅ Modal para explicar sum() */}
        {showSumModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace la función <code>sum()</code> en Python?</h2>
              <p>
                La función <strong>sum()</strong> se utiliza para sumar todos los elementos de una secuencia, como una lista o un generador.
                <br /><br />
                En este caso, está sumando los valores resultantes de elevar cada dígito del número ingresado a la potencia de la cantidad de dígitos.
              </p>
              <button className="modal-close-button" onClick={handleCloseSumModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado44Nivel2;
