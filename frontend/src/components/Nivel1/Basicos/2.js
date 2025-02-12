import React, { useState } from 'react';
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import Puntaje from '../../Puntaje';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const Dos = () => {
  const [input1, setInput1] = useState('');
  const [result, setResult] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
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

  const checkAnswer = () => {
    if (input1.trim().toLowerCase() === '75') {
      setResult('correct');
      setShowNext(true); // Muestra el botón "Siguiente"
    } else {
      setResult('incorrect');
      setShowNext(false); // Oculta el botón "Siguiente"
    }
  };

  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">

      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
          <div className="header-title">
          <h2>NIVEL 2</h2>
          <HeaderInfo></HeaderInfo>
          </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span>EJERCICIO #2</span>
            </div>
            <div className="nivel1-card-body">
              <p>
              Completa el siguiente código en Python para que funcione correctamente. El codigo debe imprimir el número 75
              </p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code">
                  <code>
                  <pre>
                    <code>
                      print(" <input
                        type="text"
                        value={input1}
                        onChange={(e) => setInput1(e.target.value)}
                        className="code-input"
                      />{' '}")
                    </code>
                  </pre>
                  </code>
                </pre>
              </div>
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

export default Dos;
