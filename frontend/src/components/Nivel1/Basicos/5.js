import React, { useState, useEffect } from 'react';
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import Puntaje from '../../Puntaje';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";
import axios from "axios";

const Cinco = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [output, setOutput] = useState('');
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [currentTime, setCurrentTime] = useState(''); // Estado para la hora y fecha actual
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]); // Almacena los números ya utilizados
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [errores, setErrores] = useState(0);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas

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

  // Actualiza la hora y fecha al cargar el componente
  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleString());
  }, []);

  const checkAnswer = () => {
    if (inputValue.trim().toLowerCase() === 'python') {
      setResult('correct');
      setShowNext(true); // Muestra el botón "Siguiente"
      setOutput(inputValue); // Muestra el valor ingresado en la salida
      setScore(score + 10); // Incrementa el puntaje cuando sea correcto
    } else {
      setResult('incorrect');
      setShowNext(false); // Oculta el botón "Siguiente"
      setOutput(''); // Limpia la salida si la respuesta es incorrecta
    }
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
          <div className="header-tittle">
          <h2>NIVEL 1</h2>
            <HeaderInfo></HeaderInfo>
          </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
            <span>EJERCICIO #5</span>
            </div>
            <div className="nivel1-card-body">
              <p>Crea un algoritmo que permita ingresar el siguiente texto = 'Python'</p>
            </div>
            <div className="nivel1-card-body">
              <div className="code-box">
                <div className="code-header">ENTRADA</div>
                <div className="code">
                  <pre>
                    cadena = input(
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="code-input-inline"
                      placeholder="Ingrese el texto"
                    />
                    )
                  </pre>
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

              <div className="nivel1-card-button-container">
                <button className="nivel1-card-button" onClick={checkAnswer}>
                  Verificar
                </button>
                {showNext && (
                  <button
                    className="nivel1-card-button"
                    onClick={handleNext} 
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

export default Cinco;
