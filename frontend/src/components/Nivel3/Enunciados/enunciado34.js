import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado34Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showComillasModal, setShowComillasModal] = useState(false);
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
    navigate('/Nivel3/seleccion/34');
  };

  const handleInputClick = () => {
    setShowInputModal(true);
  };

  const handleCloseInputModal = () => {
    setShowInputModal(false);
  };

  const handleComillasClick = () => {
    setShowComillasModal(true);
  };

  const handleCloseComillasModal = () => {
    setShowComillasModal(false);
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
                <span>Suma de los dígitos de un número</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa solicita al usuario que ingrese un número y calcula la suma de sus dígitos. Para ello, utiliza un bucle for que recorre cada carácter de la cadena ingresada y lo convierte en un número entero para sumarlo en la variable suma. Al finalizar, muestra el resultado total de la suma de los dígitos del número proporcionado.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`numero = `}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleInputClick}
                      >
                        input
                      </span>
                      {`("Ingresa un número: ")`}
                      <br />
                      {`suma = 0`}
                      <br />
                      {`for digito in numero:`}
                      <br />
                      {`  suma += int(digito)`}
                      <br />
                      {`print(f"La suma de los dígitos es: {suma}")`}
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
                    <img src="/GifNivel3/34.gif" alt="GIF" className="gif-image" />
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

        {/* Modal explicativo de input */}
        {showInputModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace input en Python?</h2>
              <p>
                <strong><code>input()</code></strong> es una función que permite solicitar datos al usuario. En este caso, se utiliza para pedirle al usuario que ingrese un número.
              </p>
              <button className="modal-close-button" onClick={handleCloseInputModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo de comillas */}
        {showComillasModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué son las comillas en Python?</h2>
              <p>
                Las <strong><code>"comillas"</code></strong> se usan para definir cadenas de texto. En el código anterior, se utilizan para encerrar el mensaje que será mostrado al usuario cuando se le pida que ingrese un número.
              </p>
              <button className="modal-close-button" onClick={handleCloseComillasModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado34Nivel3;
