import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado2Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showElifModal, setShowElifModal] = useState(false); // Modal para elif
  const [showElseModal, setShowElseModal] = useState(false); // Modal para else
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
    navigate('/Nivel2/basicos/2');
  };

  const handleElifClick = () => {
    setShowElifModal(true); // Abre el modal de elif
  };

  const handleElseClick = () => {
    setShowElseModal(true); // Abre el modal de else
  };

  const handleCloseElifModal = () => {
    setShowElifModal(false);
  };

  const handleCloseElseModal = () => {
    setShowElseModal(false);
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
                <span>¿CÓMO FUNCIONA EL CONDICIONAL ELIF Y ELSE EN PYTHON?</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Los condicionales <code>elif</code> y <code>else</code> se utilizan en Python para manejar múltiples condiciones y especificar qué hacer cuando ninguna de las condiciones previas es verdadera.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      {`numero = 10\n`}
                      {`if (numero > 0):\n    print("El número es mayor a cero")\n`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleElifClick}
                      >
                        elif
                      </span>
                      {` (numero == 10):\n    print("El número es igual a diez")\n`}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleElseClick}
                      >
                        else
                      </span>
                      {`:\n    print("El número es menor a cero")\n`}
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
                    <img src="/GifNivel2/2.gif" alt="GIF" className="gif-image" />
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
              <img src="/nivel22.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo para `elif` */}
        {showElifModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué es elif en Python?</h2>
              <p>
                La palabra clave <strong>elif</strong> (abreviatura de "else if") se usa para probar condiciones adicionales en caso de que la primera condición (el <code>if</code>) no se cumpla.
              </p>
              <p>
                Es útil para manejar múltiples condiciones, y es una forma más clara de evitar encadenar múltiples <code>if</code> de forma secuencial.
              </p>
              <button className="modal-close-button" onClick={handleCloseElifModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo para `else` */}
        {showElseModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué es else en Python?</h2>
              <p>
                La palabra clave <strong>else</strong> se utiliza para especificar un bloque de código que se ejecuta si ninguna de las condiciones previas (<code>if</code> o <code>elif</code>) se cumple.
              </p>
              <p>
                Es útil para definir un comportamiento "por defecto" cuando las condiciones no se cumplen.
              </p>
              <button className="modal-close-button" onClick={handleCloseElseModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado2Nivel2;
