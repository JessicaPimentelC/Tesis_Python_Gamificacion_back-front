import React, { useState, useEffect } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado21 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate(); // Hook para la redirección
  const [hoveredInsignia, setHoveredInsignia] = useState(null); // Estado para mostrar los nombres al hacer hover
  
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/seleccion/21');
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
    }, 2000); // Asume que el GIF tiene una duración de 2 segundos
  };

  const handleContinueClick = () => {
    setShowModal(true);
  };

  // Nueva función para manejar el clic en las insignias y redirigir a 'Insignias.js'
  const handleInsigniaClick = () => {
    navigate('/insignias'); // Cambia '/insignias' por la ruta correcta si es diferente
  };
  const handleMouseEnter = (name) => {
    setHoveredInsignia(name); // Establece el nombre inmediatamente
  };
  const handleMouseLeave = () => {
    // No hacemos nada aquí para evitar el parpadeo
  };

  return (
    <div className="nivel1-container">
      <Sidebar></Sidebar>
      {/* Contenedor principal con el cuadro de información y el contenido principal */}
      <div className="content">
        {/* Contenedor de información sin GIF */}
        <div className="white-background">
          <HeaderBody></HeaderBody>
              <div className="header-title">
                <h2>NIVEL 1</h2>
                <HeaderInfo></HeaderInfo>
              </div>          
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span>Aprendiendo a Calcular el Área de un Triángulo</span>
            </div>
            <div className="nivel1-card-body">
              <p>
              En Python, es posible crear algoritmos que nos ayuden a resolver problemas matemáticos de manera fácil y rápida.Aprenderás a solicitar al usuario que ingrese los valores de la base y la altura del triángulo, y luego usar esos datos para calcular y mostrar el área.</p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code">
                <code>
                    {`base = float(input("Ingresa la base del triángulo: "))\naltura = float(input("Ingresa la altura del triángulo: "))\narea = base * altura\nprint("El área del triángulo es", area)`}
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
                  <img src="/211.gif" alt="GIF" className="gif-image" />
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
            <h2>¡Bien hecho avanzando en Python!</h2>
            <p>
              🌟 ¡Estás progresando muy bien en tu aprendizaje de Python! 🚀 Ahora es el momento de poner en práctica tus conocimientos con un nuevo ejercicio. Prepárate para aplicar lo que has aprendido hasta ahora y seguir avanzando.
            </p>
            <img src="aMq.gif" alt="GIF de bienvenida" className="modal-gif" />
            <button className="modal-close-button" onClick={handleCloseModal}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enunciado21;
