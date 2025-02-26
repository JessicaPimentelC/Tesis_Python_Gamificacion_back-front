import React, { useState } from "react";
import "../../../styles/1.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const Nivel2Cuarenta = () => {
  const [output, setOutput] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);

  const handleNext = () => {
    const proximoEjercicio = obtenerEjercicioAleatorioEnunciado(numerosUsados);

    if (proximoEjercicio) {
        setNumerosUsados([...numerosUsados, proximoEjercicio]);
        setShowModal(false);
        redirigirAEnunciado(proximoEjercicio, navigate);
    } else {
        console.log('No quedan ejercicios disponibles.');
    }
  };

  const checkAnswer = () => {
    if (selectedAnswer === "if") {
      setOutput("¡Correcto! La palabra clave 'if' es la correcta.");
      setScore(score + 10);
      setShowNext(true);
    } else {
      setOutput("Respuesta incorrecta. Inténtalo de nuevo.");
      setShowNext(false);
    }
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="nivel1-page">
      <Sidebar />
      <div className="nivel1-container">
        <div className="content">
          <div className="white-background">
            <HeaderBody />
            <div className="header-title">
              <h2>NIVEL 21</h2>
              <HeaderInfo />
            </div>

            <div className="nivel1-card">
              <div className="nivel1-card-body">
                <span>Ejercicio de Comparación de Números</span>
                <p>¿Cuál es la palabra que falta para que el código funcione correctamente?</p>
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code-content">
                    <pre>
                      numero1 = int(input("Ingresa el primer número: ")){"\n"}
                      numero2 = int(input("Ingresa el segundo número: ")){"\n"}
                      numero3 = int(input("Ingresa el tercer número: ")){"\n"}
                      {"\n"}
                      _____ numero1 == numero2 and numero2 == numero3:{"\n"}
                      &nbsp;&nbsp;&nbsp;&nbsp;print("Los números son iguales."){"\n"}
                      else:{"\n"}
                      &nbsp;&nbsp;&nbsp;&nbsp;print("Los números son diferentes."){"\n"}
                    </pre>
                  </div>
                </div>

                {/* Opciones de respuesta */}
                <div className="options">
                  {["if", "elif", "else", "while"].map((option) => (
                    <div
                      key={option}
                      className={`option ${selectedAnswer === option ? "selected" : ""}`}
                      onClick={() => handleSelectAnswer(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>

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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>¡Hola, soy Pingui Jessica!</h2>
            <p>
              Aquí podrás encontrar todas las ayudas que necesites para
              completar los ejercicios. ¡No dudes en consultarlo cuando lo
              necesites!
            </p>

            <div className="modal-icons">
              <button className="modal-icon-button" onClick={() => alert("Ayuda 1: Idea")}>                <img src="idea.gif" alt="Icono 1" className="modal-icon" />
              </button>
              <button className="modal-icon-button" onClick={() => alert("Ayuda 2: Apoyo")}>                <img src="apoyo.gif" alt="Icono 2" className="modal-icon" />
              </button>
              <button className="modal-icon-button" onClick={() => alert("Ayuda 3: Cuaderno")}>                <img src="cuaderno.gif" alt="Icono 3" className="modal-icon" />
              </button>
            </div>

            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nivel2Cuarenta;
