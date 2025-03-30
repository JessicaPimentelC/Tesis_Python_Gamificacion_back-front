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

const Catorce = () => {
  const [num1Function, setNum1Function] = useState('');
  const [num2Function, setNum2Function] = useState('');
  const [operator, setOperator] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [insignias, setInsignias] = useState(0); // Estado para las insignias
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate(); // Hook para la redirección
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

  // Función para actualizar la hora y fecha
  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleString()); // Ajusta el formato según tus necesidades
  };

  // Actualiza la hora y fecha al cargar el componente
  useEffect(() => {
    updateTime();

    // Actualiza la hora y fecha cada minuto
    const intervalId = setInterval(updateTime, 60000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  const checkAnswer = () => {
    if (num1Function === 'float' && num2Function === 'float' && operator === '*') {
      setOutput('¡Correcto! La multiplicación es: ' + (parseFloat(prompt("Ingresa el primer número: ")) * parseFloat(prompt("Ingresa el segundo número: "))));
      setScore(score + 10); // Incrementa el puntaje si la respuesta es correcta
    } else {
      setOutput('Inténtalo de nuevo.');
    }
    setShowNext(true); // Muestra el botón de siguiente
  };

  const handleInsigniaClick = () => {
    navigate('/insignias'); // Redirige a la ruta del módulo de insignias
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
              <span>Ejercicio de Multiplicación Rápida</span>
            </div>
            <div className="nivel1-card-body">
              <p>Llena los espacios en blanco para completar el código que realiza una multiplicación básica en Python.</p>
            </div>
            <div className="nivel1-card-body">
              <div className="code-box">
                <div className="code-header">PYTHON</div>
                <div className="code">
                  <pre>
                    num1 = {' '}
                    <input
                      type="text"
                      value={num1Function}
                      onChange={(e) => setNum1Function(e.target.value)}
                      placeholder="funcion"
                    />
                    (input("Ingresa el primer número: "))<br />
                    num2 = {' '}
                    <input
                      type="text"
                      value={num2Function}
                      onChange={(e) => setNum2Function(e.target.value)}
                      placeholder="funcion"
                    />
                    (input("Ingresa el segundo número: "))<br />
                    print("La multiplicación es:", num1 {' '}
                    <input
                      type="text"
                      value={operator}
                      onChange={(e) => setOperator(e.target.value)}
                      placeholder="operador"
                    />
                    num2)
                  </pre>
                </div>
              </div>
              <div className="button-container">

              <button className="nivel1-card-button" onClick={checkAnswer}>
                Verificar
              </button>
              {showNext && (
                <button
                  className="nivel1-card-button"
                  onClick={handleNext} // Ajusta la ruta según sea necesario
                >
                  Siguiente
                </button>
              )}
            </div>
              {output && (
                <div className="code-box">
                  <div className="code-header">SALIDA</div>
                  <pre>{output}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
        <Puntaje></Puntaje>
      </div>
    </div>
    </div>
  );
};

export default Catorce;
