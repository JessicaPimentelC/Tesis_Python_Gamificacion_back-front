import React, { useState, useEffect } from "react";
import "../../../styles/Enunciado3.css"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderInfo from "../../HeaderInfo";
import HeaderBody from "../../HeaderBody";

const Enunciado49 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();
  const [hoveredInsignia, setHoveredInsignia] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/memoria/49');
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleString();
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleShowGif = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowContinue(true);
    }, 2000);
  };

  const handleContinueClick = () => {
    setShowModal(true);
  };

  const handleInsigniaClick = () => {
    navigate("/insignias");
  };

  const handleMouseEnter = (name) => {
    setHoveredInsignia(name);
  };

  const handleMouseLeave = () => {};

  return (
    <div className="nivel1-container">
      <Sidebar />
      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
          <div className="header-title">
            <h2>NIVEL 1</h2>
            <HeaderInfo></HeaderInfo>
          </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span>Cálculo del Área Total de un Cilindro en Python


      </span>
            </div>
            <div className="nivel1-card-body">
              <p>
                {" "}
                En Python, se puede crear un algoritmo que permita al usuario ingresar el radio y la altura de un cilindro, y luego calcular su área total.               </p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code">
                <code>
                  {`
   import math 
radio = input("Introduce el radio del cilindro: ") 
altura = input("Introduce la altura del cilindro: ")
area_total = 2 * math.pi * float(radio) * (float(radio) + float(altura)) 
print("El área total del cilindro es", area_total)



`}
                </code>
                </pre>
              </div>

              {!showGif && (
                <div className="nivel1-card-button-container">
                  <button
                    className="nivel1-card-button"
                    onClick={handleShowGif}
                  >
                    Ver Simulación
                  </button>
                </div>
              )}

              {showGif && (
                <div className="gif-container">
                  <img src="49.gif" alt="GIF" className="gif-image" />
                </div>
              )}

              {showContinue && (
                <div className="nivel1-card-button-container">
                  <button
                    className="nivel1-card-button"
                    onClick={handleContinueClick}
                  >
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
            <h2>¡Bien hecho avanzando en Python!</h2>
            <p>
              🌟 ¡Estás progresando muy bien en tu aprendizaje de Python! 🚀
              Ahora es el momento de poner en práctica tus conocimientos con un
              nuevo ejercicio. Prepárate para aplicar lo que has aprendido hasta
              ahora y seguir avanzando.
            </p>
            <img src="10.gif" alt="GIF de bienvenida" className="modal-gif" />
            <button className="modal-close-button" onClick={handleCloseModal}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enunciado49;

