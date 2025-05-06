import React, { useState } from 'react';
import '../../../styles/Enunciado3.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado20Nivel3 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInModal, setShowInModal] = useState(false);
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
    navigate('/Nivel3/intermedios/20');
  };

  const handleInClick = () => {
    setShowInModal(true);
  };

  const handleCloseInModal = () => {
    setShowInModal(false);
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
                <span>Suma de Números Pares Hasta un Número Dado</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Este programa solicita al usuario un número entero y luego suma todos los números pares desde 2 hasta el número ingresado. Para ello, utiliza un bucle for que recorre los números pares con un incremento de 2 en cada iteración. La suma de estos valores se almacena en la variable suma y se muestra al final.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <pre className="code">
                    <code>
                      num = int(input("Ingresa un número: ")){'\n'}
                      suma = 0{'\n'}
                      for num{' '}
                      <span
                        style={{ color: '#00bfff', cursor: 'pointer' }}
                        onClick={handleInClick}
                      >
                        in
                      </span>{' '}
                      range(2, num + 1, 2):{'\n'}
                      &nbsp;&nbsp;&nbsp;&nbsp;suma += num{'\n'}
                      print("La suma es", suma)
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
                    <img src="/GifNivel3/20.gif" alt="GIF" className="gif-image" />
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
              <img src="/+++++.gif" alt="GIF de bienvenida" className="modal-gif" />
              <button className="modal-close-button" onClick={handleCloseModal}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Modal explicativo para `in` */}
        {showInModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>¿Qué significa in en un bucle for?</h2>
              <p>
                La palabra clave <strong><code>in</code></strong> se usa en Python para recorrer elementos de una secuencia.
                En este caso, indica que el bucle <code>for</code> va a iterar **sobre cada número del rango** generado por <code>range(2, num + 1, 2)</code>.
              </p>
              <p>
                Es decir, <code>num</code> irá tomando los valores <code>2, 4, 6, ..., hasta el número ingresado</code>, siempre sumando de dos en dos.
              </p>
              <button className="modal-close-button" onClick={handleCloseInModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enunciado20Nivel3;
