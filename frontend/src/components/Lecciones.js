import React, { useState } from 'react';
import '../styles/Lecciones.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Lecciones = () => {
  const [isLevel1Complete, setIsLevel1Complete] = useState(false); // Estado para controlar si el nivel 1 está completo
  const [showPopup, setShowPopup] = useState(false); // Estado para mostrar el cuadro emergente
  const [popupMessage, setPopupMessage] = useState(''); // Estado para el mensaje del cuadro emergente

  const navigate = useNavigate(); // Hook para la redirección

  const handleBackClick = () => {
    navigate(-1); // Navegar a la página anterior
  };

  const handleConfigClick = () => {
    navigate('/configuracion'); // Navegar a la página de configuración
  };

  // Función para mostrar el cuadro emergente
  const showFloatingMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  // Función para cerrar el cuadro emergente
  const closePopup = () => {
    setShowPopup(false);
  };

  // Funciones para manejar los clics en los niveles
  const handleLevel1Click = () => {
    navigate('/nivel1');
    setIsLevel1Complete(true); // Marcar el nivel 1 como completo (esto debería hacerse al completar realmente el nivel)
  };
  const handleLevel2Click = () => {
    navigate('/Nivel2/enunciado/1'); // Asegúrate de que coincida con la ruta de <Route>
    setIsLevel1Complete(true);
};


  const handleLevel3Click = () => {
    if (isLevel1Complete) {
      navigate('/nivel3');
    } else {
      showFloatingMessage('¡Espera, genio! 🚧 Completa el nivel 2 antes de pasar al nivel 3. ¡Vamos a ello! 🦸‍♂️');
    }
  };

  return (
    <div className="lecciones-container">
      
      <Sidebar></Sidebar>

      <div className="content">
        <div className="white-background">
          <div className="header">
            <button className="icon-button">
              <img src="bandera.png" alt="Profile" className="profile" />
            </button>
            <button className="icon-button">
              <img src="medalla.png" alt="Notification" className="notification" />
            </button>
            <button className="icon-button">
              <img src="mensaje.png" alt="Help" className="help" />
            </button>
            <button className="icon-button">
              <img src="AYUDA.jpeg" alt="Profile" className="profile" />
            </button>
          </div>
          <h1>BIENVENIDOS AL CURSO DE LENGUAJE DE PROGRAMACION PYTHON</h1>
          <div className="levels">
            <button className="level-button nivel-1" onClick={handleLevel1Click}>
              <img src="python1.png" alt="Level 1" />
              <span>NIVEL 1</span>
            </button>
            <button className="level-button nivel-2" onClick={handleLevel2Click}>
              <img src="py.png" alt="Level 2" />
              <span>NIVEL 2</span>
            </button>
            <button className="level-button nivel-3" onClick={handleLevel3Click}>
              <img src="python2.png" alt="Level 3" />
              <span>NIVEL 3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cuadro Emergente */}
{showPopup && (
  <div className="popup-overlay">
    <div className="popup">
      <button className="close-button" onClick={closePopup}>&times;</button> {/* Aquí usamos &times; para mostrar la "X" */}
      <p>{popupMessage}</p>
      {/* Agrega el GIF aquí */}
      <img src="YtS0.gif" alt="Motivational GIF" className="popup-gif" />
    </div>
  </div>
)}

    </div>
  );
};

export default Lecciones;
