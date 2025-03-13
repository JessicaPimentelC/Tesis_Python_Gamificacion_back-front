import React, { useState, useEffect } from 'react';
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import Puntaje from '../../Puntaje';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	

const Quince = () => {
  const [centimetros, setCentimetros] = useState('');
  const [printFunction, setPrintFunction] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString()); // Estado para la hora y fecha actual
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

  useEffect(() => {
    // Actualiza la hora y fecha cada minuto
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkAnswer = () => {
    // Lógica del ejercicio: convierte centímetros a metros
    const centimetrosValue = parseFloat(centimetros);

    // Validar que el valor ingresado en centímetros sea un número válido
    if (isNaN(centimetrosValue) || centimetrosValue === '') {
      setOutput('1.0');
      return;
    }

    // Realizar la conversión de centímetros a metros
    const correctMeters = centimetrosValue / 100;

    // Verifica si los campos son correctos
    if (
      printFunction.trim() === 'print' && // Verificar que se haya ingresado 'print'
      centimetrosValue === 100 // Verificar que el valor de centímetros es 100
    ) {
      setOutput(`¡Correcto! La conversión es: ${correctMeters} metros`);
      setScore(score + 10); // Incrementa el puntaje si la respuesta es correcta
      setShowNext(true); // Muestra el botón de siguiente
    } else {
      setOutput('Inténtalo de nuevo. Asegúrate de que la función y el valor son correctos.');
    }
  };

  const handleInsigniaClick = (e) => {
    const insignia = e.target.alt; // Obtén el nombre de la insignia
    navigate(`/${insignia}`); // Redirige basado en el nombre de la insignia
  };

  return (
    <div className="nivel1-container">
      <Sidebar></Sidebar>
      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>nivel 1</h2>
              <HeaderInfo></HeaderInfo>
            </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span>Ejercicio de Conversión de Unidades</span>
            </div>
            <div className="nivel1-card-body">
            <p>Llena los espacios en blanco para completar el código que convierte centímetros a metros.</p>

              <div className="code-box">
                <div className="code-header">PYTHON</div>
                <div className="code">
                  <pre>
                    centimetros = <input
                      type="text"
                      value={centimetros}
                      onChange={(e) => setCentimetros(e.target.value)}
                      placeholder="centímetros"
                    />
                    <br />
                    metros = centimetros / 100<br />
                    <input
                      type="text"
                      value={printFunction}
                      onChange={(e) => setPrintFunction(e.target.value)}
                      placeholder="print"
                    />
                    (metros)
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
              {/* Mostrar el resultado aquí */}
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
  );
};

export default Quince;
