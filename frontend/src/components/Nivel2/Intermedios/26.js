import React, { useState, useEffect } from 'react';
import '../../../styles/1.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const Nivel2Veintiseis = () => {
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
      setOutput('¡Correcto! La palabra clave float es la correcta.');
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
                <h2>EJERCICIO #24</h2>
              </div>
              <div className="nivel1-card-body">
                <p>Llena el espacio en blanco con la palabra clave correcta para definir la variable.</p>
              </div>
              <div className="nivel1-card-body">
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code">
                    <pre>
                      ingreso ={' '}
                      <input
                        type="text"
                        value={floatFunction}
                        onChange={(e) => setFloatFunction(e.target.value)}
                        placeholder="palabra clave"
                      />
                      (input("Ingresa tu ingreso anual: ")) <br />
                      <br />
                      if ingreso &lt;= 10000: <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;impuesto = ingreso * 0.05 <br />
                      elif ingreso &lt;= 50000: <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;impuesto = 10000 * 0.05 + (ingreso - 10000) * 0.10 <br />
                      else: <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;impuesto = 10000 * 0.05 + 40000 * 0.10 + (ingreso - 50000) * 0.15 <br />
                      <br />
                      print(f"El impuesto a pagar es: ${"{"}impuesto:.2f{"}"}) <br />

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

export default Nivel2Veintiseis;
