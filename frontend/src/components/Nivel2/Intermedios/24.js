import React, { useState, useEffect } from 'react';
import '../../../styles/1.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const Nivel2Veinticuatro = () => {
  const [ifFunction, setIfFunction] = useState('');
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
    if (ifFunction.toLowerCase() === 'if') {
      setOutput('¡Correcto! La palabra clave if es la correcta.');
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
                <h2>EJERCICIO #22</h2>
              </div>
              <div className="nivel1-card-body">
                <p>Llena el espacio en blanco con la palabra clave correcta para la condición.</p>
              </div>
              <div className="nivel1-card-body">
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code">
                    <pre>
                      numero = int(input("Ingresa un número: ")) <br />
                      suma_divisores = 0 <br />
                      <br />
                      for i in range(1, numero): <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;if numero % i == 0: <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suma_divisores += i <br />
                      <br />
                      <input
                        type="text"
                        value={ifFunction}
                        onChange={(e) => setIfFunction(e.target.value)}
                        placeholder="palabra clave"
                      />
                      (suma_divisores == numero): <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;print(f"{'{'}numero{'}'} es un número perfecto.") <br />
                      else: <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;print(f"{'{'}numero{'}'} no es un número perfecto.") <br />
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

export default Nivel2Veinticuatro;


