import React, { useState, useEffect } from 'react';
import '../../../styles/1.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const Nivel2Dieciocho = () => {
  const [elifFunction, setElifFunction] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
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

  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleString());
  };

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

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
                <h2>EJERCICIO #18</h2>
              </div>
              <div className="nivel1-card-body">
                <p>Llena los espacios en blanco para completar la condición.</p>
              </div>
              <div className="nivel1-card-body">
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code">
                    <pre>
                      numero = int(input("Ingresa un número de familiares: ")) <br />
                      if numero &lt;= 2: <br />
                      {'  '}descuento = 0 <br />
                      {'  '}print("No tiene descuento") <br />
                      <input
                        type="text"
                        value={elifFunction}
                        onChange={(e) => setElifFunction(e.target.value)}
                        placeholder="palabra clave"
                      />
                      {' (numero >= 2 and numero <= 7):'} <br />
                      {'  '}descuento = 0.1 <br />
                      {'  '}print("El descuento es de", descuento) <br />
                      else: <br />
                      {'  '}descuento = 0.3 <br />
                      {'  '}print("El descuento es de", descuento)
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

export default Nivel2Dieciocho;





