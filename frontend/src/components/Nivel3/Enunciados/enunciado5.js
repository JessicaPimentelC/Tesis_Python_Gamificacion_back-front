import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado5Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForModal, setShowForModal] = useState(false); // Estado para el modal del for
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
    navigate('/Nivel3/basicos/5');
  };

  const handleForClick = () => {
    setShowForModal(true);
  };

  const handleCloseForModal = () => {
    setShowForModal(false);
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
                <span>Iteración Sobre los Caracteres de una Palabra</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa solicita al usuario que ingrese una palabra y luego utiliza un bucle <code>for</code> para recorrer e imprimir cada una de sus letras por separado. En cada iteración, la variable <code>letra</code> toma un carácter de la palabra y lo muestra en pantalla.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`palabra = input("Ingrese una palabra: ")\n`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleForClick}
                      >
                        for
                      </span>
                      {` letra in palabra:\n    print(letra)\n`}
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
                    <img src="/GifNivel5/1.gif" alt="GIF" className="gif-image" />
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

        {/* Modal general de bienvenida */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¡Listo para comenzar!</h2>
              <p>
                🌟 ¡Estás a punto de comenzar una emocionante aventura en el aprendizaje de Python! 🚀
                Prepárate para explorar, descubrir y aprender. ¡Estamos emocionados de tenerte a bordo!
              </p>
              <img src="/nivel33.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo para `for` */}
        {showForModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué hace el bucle for en Python?</h2>
              <p>
                El bucle <strong>for</strong> se utiliza para iterar sobre una secuencia, como una lista, una tupla, un diccionario, un conjunto o una cadena.
              </p>
              <p>
                En este caso, recorre letra por letra la palabra ingresada por el usuario. En cada vuelta del ciclo, la variable <code>letra</code> toma el siguiente carácter de la cadena.
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

export default Enunciado5Nivel3;
