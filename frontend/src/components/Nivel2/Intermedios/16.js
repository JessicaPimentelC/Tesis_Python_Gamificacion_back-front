import React, { useState, useEffect } from 'react';
import '../../../styles/1.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const Nivel2Dieciseis = () => {
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
    if (conditionFunction.toLowerCase() === 'if') {
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
              <h2>NIVEL 1</h2>
              <HeaderInfo />
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <h2>EJERCICIO 16 - DÍAS DE LA SEMANA</h2>
              </div>
              <div className="nivel1-card-body">
                <p>Llena los espacios en blanco con la palabra clave correcta para completar el código.</p>
              </div>
              <div className="nivel1-card-body">
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code">
                    <pre>
                      numero = int(input("Ingresa un número: ")) <br />
                      <input
                        type="text"
                        value={conditionFunction}
                        onChange={(e) => setConditionFunction(e.target.value)}
                        placeholder="palabra clave"
                      /> (numero == 1): print("Es lunes")<br />
                      <input type="text" value={conditionFunction} onChange={(e) => setConditionFunction(e.target.value)} placeholder="palabra clave" /> (numero == 2): print("Es martes")<br />
                      <input type="text" value={conditionFunction} onChange={(e) => setConditionFunction(e.target.value)} placeholder="palabra clave" /> (numero == 3): print("Es miércoles")<br />
                      <input type="text" value={conditionFunction} onChange={(e) => setConditionFunction(e.target.value)} placeholder="palabra clave" /> (numero == 4): print("Es jueves")<br />
                      <input type="text" value={conditionFunction} onChange={(e) => setConditionFunction(e.target.value)} placeholder="palabra clave" /> (numero == 5): print("Es viernes")<br />
                      <input type="text" value={conditionFunction} onChange={(e) => setConditionFunction(e.target.value)} placeholder="palabra clave" /> (numero == 6): print("Es sábado")<br />
                      <input type="text" value={conditionFunction} onChange={(e) => setConditionFunction(e.target.value)} placeholder="palabra clave" /> (numero == 7): print("Es domingo")<br />
                    </pre>
                  </div>
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

export default Nivel2Dieciseis;


