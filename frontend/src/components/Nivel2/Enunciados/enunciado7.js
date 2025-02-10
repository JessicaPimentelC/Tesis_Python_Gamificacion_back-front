import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado7Nivel2 = () => {
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
    navigate('/basicos/4');
  };

  return (
      <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">

      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
          <div className="header-title">
              <h2>NIVEL 2</h2>
              <HeaderInfo></HeaderInfo>
            </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span>¿CÓMO FUNCIONAN LOS OPERADORES EN PYTHON?</span>
            </div>
            <div className="nivel1-card-body">
              <p>
              El operador "and" comprueba que todas las condiciones de un if se cumplan, es decir el resultado sera un valor booleano true" 
              </p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code-area">
                  <code>{`
valor1 = obtener_valor1()
valor2 = obtener_valor2()

if valor1 == condicion_1 and valor2 == condicion_2:
    print("Ambas condiciones son verdaderas")
elif valor1 == condicion_3 and valor2 == condicion_4:
    print("Otra combinación de condiciones es verdadera")
elif valor1 == condicion_5 and valor2 == condicion_6:
    print("Una tercera combinación de condiciones es verdadera")
else:
    print("Ninguna combinación de condiciones se cumplió")


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
                  <img src="gif.gif" alt="GIF" className="gif-image" />
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
            <img src="X3PR.gif" alt="GIF de bienvenida" className="modal-gif" />
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

export default Enunciado7Nivel2;
