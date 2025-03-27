import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";

const Dieciséis = () => {
  const [importAnswer, setImportAnswer] = useState('');
  const [printAnswer, setPrintAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString()); // Estado para la hora y fecha actual
  const navigate = useNavigate();
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
    if (importAnswer === 'import' && printAnswer === 'print') {
      setIsCorrect(true);
      setShowNext(true); // Mostrar el botón Siguiente si la respuesta es correcta
    } else {
      setIsCorrect(false);
      setShowNext(false); // Ocultar el botón Siguiente si la respuesta es incorrecta
    }
    setShowResult(true);
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
                Completa el código para calcular la edad en Python rellenando los espacios en blanco.
              </p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code">
                  <code>
                    {'from datetime '}
                    <input
                      type="text"
                      value={importAnswer}
                      onChange={(e) => setImportAnswer(e.target.value)}
                      placeholder="______"
                      className="input-field"
                    />
                    {' datetime\n\nano_nacimiento = int(input("Ingresa tu año de nacimiento: "))\nano_actual = datetime.now().year\nedad = ano_actual - ano_nacimiento\n'}
                    <input
                      type="text"
                      value={printAnswer}
                      onChange={(e) => setPrintAnswer(e.target.value)}
                      placeholder="______"
                      className="input-field"
                    />
                    {'("Tu edad es:", edad)\n'}
                  </code>
                </pre>
              </div>

              <div className="button-container">
                <button className="nivel1-card-button" onClick={handleCheckAnswers}>
                  Verificar
                </button>
                {showNext && (
                  <button
                    className="nivel1-card-button"
                    onClick={handleNext} // Redirige a Enunciado17.js
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

export default Dieciséis;
