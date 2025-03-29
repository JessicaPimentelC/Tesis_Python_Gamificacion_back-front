import React, { useState } from 'react';
import '../../../styles/1.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const Nivel3Veinticinco = () => {
  const [conditionFunction, setConditionFunction] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);

  const handleNext = () => {
    const proximoEjercicio = obtenerEjercicioAleatorioEnunciado(numerosUsados);
    if (proximoEjercicio) {
      setNumerosUsados([...numerosUsados, proximoEjercicio]);
      redirigirAEnunciado(proximoEjercicio, navigate);
    } else {
      console.log('No quedan ejercicios disponibles.');
    }
  };

  const checkAnswer = () => {
    if (conditionFunction.toLowerCase() === 'i') {
      setOutput('¡Correcto! Has completado la estructura correctamente.');
      setScore(score + 10);
      setShowNext(true);
    } else {
      setOutput('Inténtalo de nuevo.');
    }
  };

  return (
    <div className="nivel1-page">
      <Sidebar />
      <div className="nivel1-container">
        <div className="content">
          <div className="white-background">
            <HeaderBody />
            <div className="header-title">
              <h2>NIVEL 3</h2>
              <HeaderInfo />
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <h2>EJERCICIO 25 - PATRÓN NUMÉRICO</h2>
              </div>
              <div className="nivel1-card-body">
                <p>Llena el espacio en blanco con la palabra clave correcta para completar el código.</p>
              </div>
              <div className="nivel1-card-body">
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <pre>
                    {`for `}
                    <input
                      type="text"
                      value={conditionFunction}
                      onChange={(e) => setConditionFunction(e.target.value)}
                      placeholder="palabra clave"
                    />
                    {` in range(5, 0, -1):
    for j in range(i, 0, -1):
        print(j, end=" ")
    print()`}
                  </pre>
                </div>
                <button className="nivel1-card-button" onClick={checkAnswer}>
                  Verificar
                </button>
                {showNext && (
                  <button className="nivel1-card-button" onClick={handleNext}>
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
        </div>
        <Puntaje />
      </div>
    </div>
  );
};

export default Nivel3Veinticinco;
