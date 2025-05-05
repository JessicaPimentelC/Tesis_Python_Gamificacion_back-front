import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado34Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false); // ✅ modal para 'import'

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
    navigate('/Nivel2/seleccion/34');
  };

  const handleImportClick = () => {
    setShowImportModal(true);
  };

  const handleCloseImportModal = () => {
    setShowImportModal(false);
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
                <span>📅 Cálculo de Edad a partir del Año de Nacimiento</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  El programa solicita al usuario que ingrese su año de nacimiento y, utilizando el año actual obtenido con la librería datetime, calcula su edad.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>
                      {`from datetime `}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleImportClick}
                      >
                        import
                      </span>
                      {` datetime
año_nacimiento = int(input("Ingresa tu año de nacimiento: "))
año_actual = datetime.now().year
edad = año_actual - año_nacimiento
if edad < 0:
    print("Año de nacimiento no válido.")
else:
    print(f"Tienes {edad} años.")`}
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
                    <img src="/GifNivel2/34.gif" alt="GIF" className="gif-image" />
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
              <img src="/i7.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* ✅ Modal sobre 'import' */}
        {showImportModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace "import" en Python?</h2>
              <p>
                La palabra clave <strong>import</strong> se utiliza en Python para incluir módulos y librerías externas o estándar que contienen funciones y clases útiles. En este caso, se importa <strong>datetime</strong>, que permite trabajar con fechas y horas.
              </p>
              <button className="modal-close-button" onClick={handleCloseImportModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado34Nivel2;
