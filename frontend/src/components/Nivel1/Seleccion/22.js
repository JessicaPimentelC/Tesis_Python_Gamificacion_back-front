import React, { useState } from "react";
import "../../../styles/1.css"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	

const Veintidos = () => {
  const [metros, setMetros] = useState(""); // Cambiado a metros
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
  const checkAnswer = () => {
    if (selectedAnswer === "kilometros") {
      setOutput("Respuesta correcta: El valor en kilómetros es: " + (parseFloat(selectedAnswer) / 1000));
      setShowNext(true);
    } else {
      setOutput("Respuesta incorrecta. Inténtalo de nuevo.");
      setShowNext(false);
    }
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
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

  const convertToKilometers = () => {
    const metrosValue = parseFloat(metros);
    const kilometros = metrosValue / 1000;

    if (!isNaN(kilometros) && metrosValue > 0) {
      setOutput(`El valor en kilómetros es: ${kilometros}`);
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
                <span>Ejercicio de Conversión de Metros a Kilómetros</span>
              </div>
              <div className="nivel-card-body">
              <p>¿Cuál es la palabra que falta para que el código imprima el área correctamente?</p>
              <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code">
                    <pre>
              metros = float(input("Ingresa el valor en metros: ")){"\n"}
              ________ = metros / 1000 {"\n"}
              print("El valor en kilómetros es:", kilometros){"\n"}
            </pre>
                  </div>
                </div>

                {/* Opciones de respuesta */}
        <div className="options">
          {["kilometros", "float", "int", "input"].map((option) => (
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
                    className="level21-card-button"
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

export default Veintidos;
