import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const Diecinueve = () => {
  const [celsiusInput, setCelsiusInput] = useState('');
  const [printInput, setPrintInput] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate(); // Hook para la redirección
  const audioRef = useRef(null); // Referencia al elemento de audio
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
    const updateTime = () => {
      const now = new Date();
      const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCurrentTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
  }, []);

  const checkAnswer = () => {
    const correctPrintInput = 'print';

    if (printInput.trim() === correctPrintInput) {
      const celsius = parseFloat(celsiusInput);
      const fahrenheit = (celsius * 9 / 5) + 32;
      setOutput(`La temperatura en Fahrenheit es: ${fahrenheit.toFixed(2)}`);
      setShowNext(true);
      setScore(score + 10); // Ejemplo: aumenta el puntaje en 10 puntos
    } else {
      setOutput('Inténtalo de nuevo.');
    }
  };

  const handleShowModal = () => {
    setShowModal(true); // Muestra el modal
    if (audioRef.current) {
      audioRef.current.play(); // Reproduce el sonido cuando se muestra el modal
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/examen'); // Redirige al módulo Examen después de cerrar el modal
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
          </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span>Conversión de Temperatura</span>
            </div>
            <div className="nivel1-card-body">
            <p>En este ejercicio, debes completar el código para convertir una temperatura de grados Celsius a Fahrenheit. Completa el campo con la función correcta para imprimir el resultado.</p>

              <div className="code-box">
                <div className="code-header">PYTHON</div>
                <div className="code-content">
                  <pre>
                    celsius = float(input("Ingresa la temperatura en grados Celsius: "))<br />
                    fahrenheit = (celsius * 9/5) + 32<br />
                    <input
                      type="text"
                      value={printInput}
                      onChange={(e) => setPrintInput(e.target.value)}
                      placeholder="print"
                      style={{ width: '100px', marginRight: '5px' }}
                    />
                    ("La temperatura en Fahrenheit es:", fahrenheit)
                  </pre>
                </div>
              </div>

              <input
                type="number"
                value={celsiusInput}
                onChange={(e) => setCelsiusInput(e.target.value)}
                placeholder="Ingresa grados Celsius"
                style={{ width: '250px', marginTop: '10px' }}
              />

              <button className="nivel1-card-button" onClick={checkAnswer}>
                Verificar
              </button>
              {showNext && (
                <button
                  className="nivel1-card-button"
                  onClick={handleNext} // Llama a la función que muestra el modal y reproduce el sonido
                >
                  Siguiente
                </button>
              )}

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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¡Bien hecho!</h2>
            <p>¡Excelente! Ahora que has completado este ejercicio, estás listo para pasar al siguiente. ¡Vamos al examen y demostremos lo que aprendimos!</p>
            <img src="Ntx5.gif" alt="GIF de bienvenida" className="modal-gif" />
            <button className="modal-close-button" onClick={handleCloseModal}>
              Continuar al Examen
            </button>
          </div>
        </div>
      )}

      {/* Audio */}
      <audio ref={audioRef} src="examen.mp3" />
    </div>
  );
};

export default Diecinueve;
