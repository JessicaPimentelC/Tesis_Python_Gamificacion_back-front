import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado26Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showElifModal, setShowElifModal] = useState(false); // Modal específico para 'elif'
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
    navigate('/Nivel2/intermedios/26');
  };

  const handleElifClick = () => {
    setShowElifModal(true); // Mostrar modal al hacer click en 'elif'
  };

  const handleCloseElifModal = () => {
    setShowElifModal(false); // Cerrar modal de 'elif'
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
                <span> 💰 Cálculo del Impuesto sobre la Renta en Python</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa pedirá al usuario que ingrese su ingreso anual en dólares y calculará el impuesto sobre la renta.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>{`
ingreso = float(input("Ingresa tu ingreso anual: "))
if ingreso <= 10000:
    impuesto = ingreso * 0.05
`}</code>
                    <div
                      style={{
                        color: '#00bfff',
                        cursor: 'pointer',
                        display: 'inline',
                      }}
                      onClick={handleElifClick}
                    >
                      <code>elif</code>
                    </div>
                    <code>{` ingreso <= 50000:
    impuesto = 10000 * 0.05 + (ingreso - 10000) * 0.10
else:
    impuesto = 10000 * 0.05 + 40000 * 0.10 + (ingreso - 50000) * 0.15


 print(f"El impuesto a pagar es: ${"{"}impuesto:.2f{"}"})`}</code>
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
                    <img src="/GifNivel2/26.gif" alt="GIF" className="gif-image" />
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
              <img src="/nn.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {showElifModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace "elif" en Python?</h2>
              <p>
                La palabra clave <strong>elif</strong> es una combinación de "else" y "if". Se utiliza para verificar múltiples condiciones en una secuencia de decisiones.
                Si la condición del <strong>if</strong> no es verdadera, el programa verificará la condición en el <strong>elif</strong>.
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

export default Enunciado26Nivel2;
