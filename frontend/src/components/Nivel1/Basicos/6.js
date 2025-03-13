import React, { useState } from 'react';
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Puntaje from '../../Puntaje';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	

// Crea un objeto de audio global para su uso
const audio = new Audio('/nivel6.mp3');
audio.preload = 'auto';

const Seis = ({ toggleView }) => {
  const [draggedNumber, setDraggedNumber] = useState('');
  const [result, setResult] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [output, setOutput] = useState('');
  const [score, setScore] = useState(0); // Define el estado para el puntaje
  const [currentTime] = useState(new Date().toLocaleString()); // Hora y Fecha actual
  const navigate = useNavigate(); // Hook para la redirección
  const [numerosUsados, setNumerosUsados] = useState([]); // Almacena los números ya utilizados
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados

  const handleNext = () => {
    const proximoEjercicio = obtenerEjercicioAleatorioEnunciado(numerosUsados);

    if (proximoEjercicio) {
        // Actualiza el estado
        setNumerosUsados([...numerosUsados, proximoEjercicio]);
        setShowModal(false);

        // Redirige al enunciado del próximo ejercicio
        redirigirAEnunciado(proximoEjercicio, navigate);
    } else {
        console.log('No quedan ejercicios disponibles.');
    }
};

  const checkAnswer = () => {
    // Compara si el número arrastrado es 37
    if (draggedNumber === '37') {
      setResult('correct');
      setShowNext(true); // Muestra el botón "Siguiente"
      setOutput(draggedNumber); // Muestra el valor en la salida
      setScore(score + 10); // Incrementa el puntaje cuando sea correcto
    } else {
      setResult('incorrect');
      setShowNext(false); // Oculta el botón "Siguiente"
      setOutput(''); // Limpia la salida si la respuesta es incorrecta
    }
  };

  const handleDragStart = (number) => {
    setDraggedNumber(number);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    checkAnswer();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Función para reproducir sonido
  const playSound = () => {
    audio.currentTime = 0; // Reinicia el tiempo de reproducción para reproducir desde el principio
    audio.play().catch((error) => {
      // Maneja errores si ocurren
      console.error('Error reproduciendo el sonido:', error);
    });
  };

  const handleInsigniaClick = () => {
    navigate('/insignias'); // Redirige a la página de insignias
  };

  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
    <div className="nivel1-container">
      {/* Contenedor principal con el cuadro de información y el contenido principal */}
      <div className="content">
        {/* Contenedor de información */}
        <div className="white-background">
            <HeaderBody></HeaderBody>            
            <div className="header-title">
              <h2>NIVEL 1</h2>
              <HeaderInfo></HeaderInfo>
            </div>
            
          <div className="nivel1-card">
            <div className="nivel1-card-header">
            <h2>EJERCICIO #6</h2>
            </div>
            <div className="nivel1-card-body">
              <p>Crea una variable de tipo numérico que almacene el número 37</p>
            </div>
            <div className="nivel1-card-body">
              <div className="code-box">
                <div className="code-header">PYTHON</div>
                <div 
                  className="code"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <pre>
                    variable = <span className="drop-area">________</span>
                  </pre>
                </div>
              </div>

              <div className="options">
                <div
                  className="option"
                  draggable
                  onDragStart={() => handleDragStart('37')}
                  onMouseEnter={playSound} // Reproduce el sonido cuando el cursor está sobre el número
                >
                  37
                </div>
                <div
                  className="option"
                  draggable
                  onDragStart={() => handleDragStart('12')}
                  onMouseEnter={playSound} // Reproduce el sonido cuando el cursor está sobre el número
                >
                  12
                </div>
                <div
                  className="option"
                  draggable
                  onDragStart={() => handleDragStart('29')}
                  onMouseEnter={playSound} // Reproduce el sonido cuando el cursor está sobre el número
                >
                  29
                </div>
                <div
                  className="option"
                  draggable
                  onDragStart={() => handleDragStart('45')}
                  onMouseEnter={playSound} // Reproduce el sonido cuando el cursor está sobre el número
                >
                  45
                </div>
              </div>

              {result === 'correct' && (
                <div className="code-box">
                  <div className="code-header">SALIDA</div>
                  <input
                    type="text"
                    value={output}
                    className="code-input"
                    readOnly
                  />
                </div>
              )}

              <div className="button-container">
                {showNext && (
                  <button
                    className="nivel1-card-button"
                    onClick={handleNext} // Ajusta el número de vista siguiente si es necesario
                  >
                    Siguiente
                  </button>
                )}
              </div>
              {result && (
                <div className={`result ${result}`}>
                  {result === 'correct' ? 'Correcto' : 'Inténtalo de nuevo'}
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
      <Puntaje></Puntaje>
    </div>
    </div>
  );
};

export default Seis;
