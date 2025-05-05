import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado20Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFloatModal, setShowFloatModal] = useState(false);
  const navigate = useNavigate(); // Hook para la redirección

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
    navigate('/Nivel2/intermedios/20');
  };

  const handleFloatClick = () => {
    setShowFloatModal(true);
  };

  const handleCloseFloatModal = () => {
    setShowFloatModal(false);
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
                <span> 🔢 Determinación del Número Mayor en Python</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  El programa solicitará al usuario que ingrese tres números y determinará cuál de ellos es el mayor. Luego, mostrará el resultado en pantalla.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>
                      num1 = <span onClick={handleFloatClick} style={{ color: '#00bfff', cursor: 'pointer', textDecoration: 'underline' }}>float</span>(input("Ingrese el primer número: ")){'\n'}
                      num2 = float(input("Ingrese el segundo número: ")){'\n'}
                      num3 = float(input("Ingrese el tercer número: ")){'\n'}
                      if num1 &gt;= num2 and num1 &gt;= num3:{'\n'}
                      {'    '}mayor = num1{'\n'}
                      elif num2 &gt;= num1 and num2 &gt;= num3:{'\n'}
                      {'    '}mayor = num2{'\n'}
                      else:{'\n'}
                      {'    '}mayor = num3{'\n'}
                      print("El número mayor es:", mayor)
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
                    <img src="/GifNivel2/20.gif" alt="GIF" className="gif-image" />
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
              <img src="/xy.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {showFloatModal && (
          <div className="modal-overlay" onClick={handleCloseFloatModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-button" onClick={handleCloseFloatModal}>X</button>
              <h3>¿Qué hace <code>float</code>?</h3>
              <p><code>float</code> convierte una cadena o número en un número decimal (punto flotante), como <strong>3.14</strong>.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado20Nivel2;
