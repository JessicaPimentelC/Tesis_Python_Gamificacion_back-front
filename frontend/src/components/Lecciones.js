import React, { useState } from 'react';
import '../styles/Lecciones.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Lecciones = () => {
  const [isLevel1Complete, setIsLevel1Complete] = useState(false); // Estado para controlar si el nivel 1 está completo
  const [isLevel2Complete, setIsLevel2Complete] = useState(false); // Estado para controlar si el nivel 1 está completo
  const [showPopup, setShowPopup] = useState(false); // Estado para mostrar el cuadro emergente
  const [popupMessage, setPopupMessage] = useState(''); // Estado para el mensaje del cuadro emergente
  const [selectedLevel, setSelectedLevel] = useState(null);
  
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
    if (isLevel1Complete) {
      navigate('/Nivel2/enunciado/1'); 
      setIsLevel2Complete(true);

    }else{
      showFloatingMessage('¡Espera, genio! 🚧 Completa el nivel 1 antes de pasar al nivel 2. ¡Vamos a ello! 🦸‍♂️');
    }
  };

  const handleLevel3Click = () => {
    if (isLevel2Complete) {
      navigate('/Nivel3/enunciado/1');
    } else {
      showFloatingMessage('¡Espera, genio! 🚧 Completa el nivel 2 antes de pasar al nivel 3. ¡Vamos a ello! 🦸‍♂️');
    }
  };

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div className="lecciones-container">
      <Sidebar></Sidebar>
      <Header></Header>
      <div className="content">
        <div className="lecciones-white-background">
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
