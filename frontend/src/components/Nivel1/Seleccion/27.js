import React, { useState } from "react";
import "../../../styles/1.css"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	

const Veintisiete = () => {
  const [primerNum, setPrimerNum] = useState(""); // Primer número
  const [segundoNum, setSegundoNum] = useState(""); // Segundo número
  const [output, setOutput] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0); // Estado de puntuación
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Control del modal
  const [hoveredInsignia, setHoveredInsignia] = useState(null); // Estado de hover para insignias
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [numerosUsados, setNumerosUsados] = useState([]); // Almacena los números ya utilizados

  const handleNext = () => {
    const proximoEjercicio = obtenerEjercicioAleatorioEnunciado(numerosUsados);

    if (proximoEjercicio) {
        // Actualiza el estado
        setNumerosUsados([...numerosUsados, proximoEjercicio]);
        setShowModal(false);

        // Redirige al enunciado del próximo ejercicio
        redirigirAEnunciado(proximoEjercicio, navigate);
    } else {
        console.log('No quedan ejercicios disponibles.');
    }
};

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === "math") {
      const numero = 4; // ejemplo
      const potencia = Math.pow(numero, 2);
      setOutput("Respuesta correcta: La potencia es: " + potencia);
      setScore(score + 10);
      setShowNext(true);
    } else {
      setOutput("Respuesta incorrecta. Inténtalo de nuevo.");
      setShowNext(false);
    }
  };
  const handleInsigniaClick = () => {
    navigate("/insignias");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleMouseEnter = (name) => {
    setHoveredInsignia(name);
  };

  const handleMouseLeave = () => {};

  const calculateAverage = () => {
    const num1 = parseFloat(primerNum);
    const num2 = parseFloat(segundoNum);
    const average = (num1 + num2) / 2;

    if (!isNaN(average)) {
      setOutput(`El promedio de los números es: ${average}`);
      setScore(score + 10); // Incrementa la puntuación si la respuesta es correcta
    } else {
      setOutput("Inténtalo de nuevo.");
    }
    setShowNext(true); // Mostrar el botón "Finalizar"
  };

  return (
    <div className="nivel1-page">
      <Sidebar />
      <div className="nivel1-container">
        <div className="content">
          <div className="white-background">
            <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>NIVEL 1</h2>
              <HeaderInfo></HeaderInfo>
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <span>Ejercicio de Potencia de un Número</span>
              </div>
              <div className="nivel1-card-body">
              <p>¿Cuál es la palabra que falta para que el código calcule correctamente la potencia de un número?</p>

                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">

                  <pre>
              import _______ {"\n"}
              numero = int(input("numero:")) {"\n"}
              potencia = math.pow(numero, 2) {"\n"}
              print("La potencia es:", potencia){"\n"}
            </pre>
                </div>
                </div>
                {/* Opciones de respuesta */}
        <div className="options">
          {["math", "cmath", "random", "os"].map((option) => (
            <div
              key={option}
              className={`option ${selectedAnswer === option ? "selected" : ""}`}
              onClick={() => handleSelectAnswer(option)}
            >
              {option}
            </div>
          ))}
        </div>
                {showNext && (
                  <div className="button-container">
                  <button
                    className="nivel1-card-button"
                    onClick={handleNext}
                  >
                    Siguiente
                  </button>
                  </div>
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
          <Puntaje></Puntaje>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>¡Hola, soy pingui jessica!</h2>
            <p>
              Aquí podrás encontrar todas las ayudas que necesites para completar los ejercicios.
            </p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Veintisiete;
