import React, { useState } from "react";
import "../../../styles/1.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from "../../../utils/utils";

const Nivel3Cuarenta = () => {
  const [output, setOutput] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);

  const handleNext = () => {
    const proximoEjercicio = obtenerEjercicioAleatorioEnunciado(numerosUsados);
    if (proximoEjercicio) {
      setNumerosUsados([...numerosUsados, proximoEjercicio]);
      redirigirAEnunciado(proximoEjercicio, navigate);
    } else {
      console.log("No quedan ejercicios disponibles.");
    }
  };

  const checkAnswer = () => {
    if (selectedAnswer === "print") {
      setOutput("¡Correcto! La función 'print' es la correcta.");
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
              <h2>NIVEL 3</h2>
              <HeaderInfo />
            </div>

            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <h2>EJERCICIO 40 - CUENTA REGRESIVA</h2>
              </div>
              <div className="nivel1-card-body">
                <p>¿Cuál es la función correcta para completar el código?</p>
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code-content">
                    <pre>
                      {`i = 10
while i >= 1:
    _____(i, end=" ")
    i -= 1`}
                    </pre>
                  </div>
                </div>

                {/* Opciones de respuesta */}
                <div className="options">
                  {["print", "echo", "return", "output"].map((option) => (
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

export default Nivel3Cuarenta;
