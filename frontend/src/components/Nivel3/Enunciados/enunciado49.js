



import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado49Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    navigate('/Nivel3/memoria/49');
  };

  return (
      <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">

      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
          <div className="header-title">
              <h2>NIVEL 3</h2>
              <HeaderInfo></HeaderInfo>
            </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span> Suma de los primeros 5 números naturales
              </span>
            </div>
            <div className="nivel1-card-body">
              <p>
              Este programa utiliza un bucle while para sumar los números del 1 al 5. En cada iteración, el valor de i se agrega a suma, y i se incrementa en 1 hasta alcanzar 5. Finalmente, se imprime el resultado de la suma.</p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code">
                  <code>{`
i = 1
suma = 0
while i <= 5:
    suma += i
    i += 1
print("Suma:", suma)
`} </code>
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
                  <img src="/GifNivel3/49.gif" alt="GIF" className="gif-image" />
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
            <img src="/+.gif" alt="GIF de bienvenida" className="modal-gif" />
            <button className="modal-close-button" onClick={handleCloseModal}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Enunciado49Nivel3;




















