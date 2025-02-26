import React, { useState } from 'react';
import '../../../styles/1.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado } from '../../../utils/utils';

const Nivel2Veintinueve = () => {
  const [respuesta, setRespuesta] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
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
    if (respuesta.trim().toLowerCase() === 'int') {
      setOutput('¡Correcto! La palabra clave int es la correcta.');
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
              <h2>NIVEL 2</h2>
              <HeaderInfo />
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <h2>EJERCICIO #29</h2>
              </div>
              <div className="nivel1-card-body">
                <p>Completa el código escribiendo la palabra clave correcta en el espacio en blanco.</p>
              </div>
              <div className="nivel1-card-body">
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code">
                    <pre>
                      numero ={' '}
                      <input
                        type="text"
                        value={respuesta}
                        onChange={(e) => setRespuesta(e.target.value)}
                        placeholder="palabra clave"
                      />
                      (input("Ingresa un número: ")) <br />
                      <br />
                      if numero &gt; 0 and numero % 2 == 0: <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;print("El número es positivo y par.") <br />
                      else: <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;print("El número no cumple ambas condiciones.") <br />
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

      {/* Modal de ayuda */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>¡Hola, soy Pingui Jessica!</h2>
            <p>
              Aquí podrás encontrar todas las ayudas que necesites para completar los ejercicios.
              ¡No dudes en consultarlo cuando lo necesites!
            </p>

            <div className="modal-icons">
              <button className="modal-icon-button" onClick={() => alert('Ayuda 1: Idea')}>
                <img src="idea.gif" alt="Icono 1" className="modal-icon" />
              </button>
              <button className="modal-icon-button" onClick={() => alert('Ayuda 2: Apoyo')}>
                <img src="apoyo.gif" alt="Icono 2" className="modal-icon" />
              </button>
              <button className="modal-icon-button" onClick={() => alert('Ayuda 3: Cuaderno')}>
                <img src="cuaderno.gif" alt="Icono 3" className="modal-icon" />
              </button>
            </div>

            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nivel2Veintinueve;
