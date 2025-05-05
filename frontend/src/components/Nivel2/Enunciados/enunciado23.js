import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado23Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    navigate('/Nivel2/intermedios/23');
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
                <span> 📆 Verificación de Año Bisiesto en Python</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  El programa solicitará al usuario que ingrese un año y determinará si es bisiesto o no.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code-area">
                    <code>
                      {`anio = `}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={() => setShowModal(true)}
                      >
                        int
                      </span>
                      {`(input("Ingrese un año: "))
if anio % 4 == 0:
    if anio % 100 == 0:
        if anio % 400 == 0:
            print(anio,'es un año bisiesto.')
        else:
            print(anio,'no es un año bisiesto.')
    else:
        print(anio,'es un año bisiesto.')
else:
    print(anio,'no es un año bisiesto.')`}
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
                    <img src="/GifNivel2/23.gif" alt="GIF" className="gif-image" />
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
            <h2>¿Qué hace el int en Python?</h2>
              <p>
                La función <code>int()</code> convierte una cadena de texto o un número decimal en un número entero.
                Por ejemplo, <code>int("2024")</code> devolverá <code>2024</code> como número entero.
              </p>
             
              <button className="modal-close-button" onClick={() => setShowModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado23Nivel2;
