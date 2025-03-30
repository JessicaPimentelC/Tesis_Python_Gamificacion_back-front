import React, { useState, useEffect } from 'react';
import '../../../styles/1.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const Nivel2Diecinueve= () => {
  const [elifFunction, setElifFunction] = useState('');
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
    if (elifFunction.toLowerCase() === 'elif') {
      setOutput('¡Correcto! La estructura condicional elif es la correcta.');
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
                <h2>EJERCICIO 19</h2>
              </div>
              <div className="nivel1-card-body">
                <p>Llena los espacios en blanco para completar la estructura condicional.</p>
              </div>
              <div className="nivel1-card-body">
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code">
                    <pre>
                      num1 = int(input("Ingresa primer número: ")) <br />
                      num2 = int(input("Ingresa segundo número: ")) <br />
                      opcion = int(input("Seleccione la opción que desea \n 1.Suma \n 2.Resta \n 3.Multiplicación \n 4.División \n")) <br />
                      if opcion == 1: <br />
                      {'  '}suma = num1 + num2 <br />
                      {'  '}print("El resultado es", suma) <br />
                      <input
                        type="text"
                        value={elifFunction}
                        onChange={(e) => setElifFunction(e.target.value)}
                        placeholder="palabra clave"
                      />
                      {' opcion == 2:'} <br />
                      {'  '}resta = num1 - num2 <br />
                      {'  '}print("El resultado es", resta) <br />
                      <input
                        type="text"
                        value={elifFunction}
                        onChange={(e) => setElifFunction(e.target.value)}
                        placeholder="palabra clave"
                      />
                      {' opcion == 3:'} <br />
                      {'  '}multiplicacion = num1 * num2 <br />
                      {'  '}print("El resultado es", multiplicacion) <br />
                      else: <br />
                      {'  '}division = num1 / num2 <br />
                      {'  '}print("El resultado es", division) <br />
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

export default Nivel2Diecinueve;
