import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import Puntaje from '../../Puntaje';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	

const Diecisiete = () => {
  const [elifAnswer, setElifAnswer] = useState('');
  const [elseAnswer, setElseAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString()); // Estado para la hora y fecha actual
  const navigate = useNavigate();
  const [input1, setInput1] = useState('');
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [numerosUsados, setNumerosUsados] = useState([]); // Almacena los números ya utilizados

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

  useEffect(() => {
    // Actualiza la hora y fecha cada minuto
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckAnswers = () => {
    if (input1.trim().toLowerCase() === 'float') {
        setResult('correct');
      setShowNext(true); // Muestra el botón "Siguiente"
    } else {
        setResult('incorrect');
      setShowNext(false); // Oculta el botón "Siguiente"
    }
};

  const handleInsigniaClick = () => {
    // Función para manejar el clic en las insignias
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
              <span>Verificación de Números</span>
            </div>
            <div className="nivel1-card-body">
                <p>
                Completa el siguiente código en Python para que funcione correctamente.
                </p>
                <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code-content">
                    <code>
                    <div className="code">
                    <pre>
                    decimal = <input
                        type="text"
                        value={input1}
                        onChange={(e) => setInput1(e.target.value)}
                        placeholder="Ingrese el número"
                    />
                    (input("Ingrese el decimal"))
                    </pre>
                </div>  
                    </code>
                </pre>
                </div>

              <div className="nivel1-card-button-container">
                <button className="nivel1-card-button" onClick={handleCheckAnswers}>
                  Verificar
                </button>
                {showNext && (
                  <button
                    className="nivel1-card-button"
                    onClick={handleNext} // Redirige a Enunciado18.js
                  >
                    Siguiente
                  </button>
                )}
              </div>

              {showResult && (
                <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {isCorrect ? '¡Correcto! 🎉' : 'Inténtalo de nuevo. 😕'}
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

export default Diecisiete;
