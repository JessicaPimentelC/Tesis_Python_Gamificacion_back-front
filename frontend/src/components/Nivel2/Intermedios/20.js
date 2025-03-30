import React, { useState, useEffect } from 'react';
import '../../../styles/1.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const Nivel2Viente = () => {
  const [floatFunction, setFloatFunction] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);

  const handleNext = () => {
    const proximoEjercicio = obtenerEjercicioAleatorioEnunciado(numerosUsados);

    if (proximoEjercicio) {
      setNumerosUsados([...numerosUsados, proximoEjercicio]);
      navigate(`/modulo${proximoEjercicio}`);
    } else {
      console.log('No quedan ejercicios disponibles.');
    }
  };

  const checkAnswer = () => {
    if (floatFunction.toLowerCase() === 'float') {
      setOutput('¡Correcto! La función float es la correcta.');
      setScore(score + 10);
    } else {
      setOutput('Inténtalo de nuevo.');
    }
    setShowNext(true);
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
                <h2>EJERCICIO 20</h2>
              </div>
              <div className="nivel1-card-body">
                <p>Llena los espacios en blanco para completar la conversión de datos.</p>
              </div>
              <div className="nivel1-card-body">
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code">
                    <pre>
                      num1 ={' '}
                      <input
                        type="text"
                        value={floatFunction}
                        onChange={(e) => setFloatFunction(e.target.value)}
                        placeholder="función"
                      />
                      (input("Ingrese el primer número: ")) <br />
                      num2 ={' '}
                      <input
                        type="text"
                        value={floatFunction}
                        onChange={(e) => setFloatFunction(e.target.value)}
                        placeholder="función"
                      />
                      (input("Ingrese el segundo número: ")) <br />
                      num3 ={' '}
                      <input
                        type="text"
                        value={floatFunction}
                        onChange={(e) => setFloatFunction(e.target.value)}
                        placeholder="función"
                      />
                      (input("Ingrese el tercer número: ")) <br />
                      if num1 &gt;= num2 and num1 &gt;= num3: <br />
                      {'  '}mayor = num1 <br />
                      elif num2 &gt;= num1 and num2 &gt;= num3: <br />
                      {'  '}mayor = num2 <br />
                      else: <br />
                      {'  '}mayor = num3 <br />
                      print("El número mayor es:", mayor) <br />
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
          <Puntaje />
        </div>
      </div>
    </div>
  );
};

export default Nivel2Viente;
