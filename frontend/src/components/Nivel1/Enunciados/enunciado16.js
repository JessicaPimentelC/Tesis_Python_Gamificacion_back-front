import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado16 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImportInfo, setShowImportInfo] = useState(false); // Estado para mostrar el mensaje de import
  const [showDatetimeInfo, setShowDatetimeInfo] = useState(false); // Estado para mostrar el mensaje de datetime
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString()); // Estado para la hora y fecha actual
  const navigate = useNavigate(); // Hook para la redirección

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/intermedios/16');
  };
  useEffect(() => {
    // Actualiza la hora y fecha cada minuto
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 60000);
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
  
  const handleImportClick = () => {
    setShowImportInfo(true);
  };

  const handleCloseImportInfo = () => {
    setShowImportInfo(false);
  };

  const handleDatetimeClick = () => {
    setShowDatetimeInfo(true);
  };

  const handleCloseDatetimeInfo = () => {
    setShowDatetimeInfo(false);
  };

  const handleInsigniaClick = (e) => {
    const insignia = e.target.alt; // Obtén el nombre de la insignia
    // Aquí puedes agregar la lógica para redirigir a la página específica
    navigate(`/${insignia}`); // Redirige basado en el nombre de la insignia
  };

  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">
      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>NIVEL 1</h2>
              <HeaderInfo></HeaderInfo>
            </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span>Cálculo de Edad</span>
            </div>
            <div className="nivel1-card-body">
              <p>
                En este módulo, aprenderás a calcular la edad en Python. El programa pedirá al usuario que ingrese su año de nacimiento y luego calculará su edad actual.
              </p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code">
                  <code>
                    {`from datetime `}&nbsp;
                    <span className="import-link" onClick={handleImportClick}>
                      import
                    </span>
                    {` datetime\n\nano_nacimiento = int(input("Ingresa tu año de nacimiento: "))\nano_actual = ` }
                    <span className="datetime-link" onClick={handleDatetimeClick}>
                      datetime
                    </span>
                    {`.now().year\nedad = ano_actual - ano_nacimiento\nprint("Tu edad es:", edad)\n` }
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
                  <img src="enunciado16.gif" alt="GIF" className="gif-image" />
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
            <h2>¡Sigue avanzando en Python!</h2>
            <p>
              🌟 ¡Excelente trabajo! 🚀 Ahora has aprendido a calcular la edad en Python. Sigue practicando y mejorando tus habilidades. ¡Adelante, lo estás haciendo genial!
            </p>
            <img src="ICU.gif" alt="GIF de bienvenida" className="modal-gif" />
            <button className="modal-close-button" onClick={handleCloseModal}>
              Continuar
            </button>
          </div>
        </div>
      )}

      {showImportInfo && (
        <div className="info-overlay">
          <div className="info-content">
            <h3>Información sobre `import`</h3>
            <p>La palabra clave `import` en Python se utiliza para incluir módulos externos en el código, lo que permite utilizar funciones y clases definidas en esos módulos.</p>
            <button className="info-close-button" onClick={handleCloseImportInfo}>Cerrar</button>
          </div>
        </div>
      )}

      {showDatetimeInfo && (
        <div className="info-overlay">
          <div className="info-content">
            <h3>Información sobre `datetime`</h3>
            <p>El módulo `datetime` en Python proporciona clases para manipular fechas y horas. Puedes usarlo para obtener la fecha y hora actuales, calcular diferencias entre fechas y mucho más.</p>
            <button className="info-close-button" onClick={handleCloseDatetimeInfo}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Enunciado16;
