import React, { useState, useEffect } from "react";
import "../../../styles/1.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import axios from "axios";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const TreceNivel3 = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItem, setDroppedItem] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);

  const handleNext = () => {
    const proximoEjercicio = obtenerEjercicioAleatorioEnunciado(numerosUsados);

    if (proximoEjercicio) {
        setNumerosUsados([...numerosUsados, proximoEjercicio]);
        redirigirAEnunciado(proximoEjercicio, navigate);
    } else {
        console.log('No quedan ejercicios disponibles.');
    }
  };

  const options = ["if", "while", "for"];

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDroppedItem(draggedItem);
  };

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get("http://localhost:8000/myapp/score/1");
        setScore(response.data.score);
      } catch (error) {
        console.error("Error al obtener score:", error);
      }
    };
    fetchScore();
  }, []);

  const handleVerify = async () => {
    const isCorrectAnswer = droppedItem === "if";
    setIsCorrect(isCorrectAnswer);

    try {
      const requestData = {
        usuario_id: 1,
        ejercicio_id: 1,
        fecha: new Date().toISOString().split("T")[0],
        resultado: isCorrectAnswer,
      };

      const response = await axios.post("http://localhost:8000/myapp/intento/", requestData);

      if (response.status === 201) {
        if (isCorrectAnswer) {
          setShowNextButton(true);
          setScore(score + 10);
          new Audio("/ganar.mp3").play();
        } else {
          setShowNextButton(false);
          new Audio("/perder.mp3").play();
        }
      } else {
        console.error("Error en la respuesta de la API:", response.data);
      }
    } catch (error) {
      console.error("Error al guardar el intento:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">
        <div className="content">
          <div className="white-background">
            <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>NIVEL 3</h2>
              <HeaderInfo></HeaderInfo>
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <span>EJERCICIO #13</span>
              </div>
              <div className="nivel1-card-body-ejer1">
                <p>
                  Completa el código arrastrando la estructura de control correcta para verificar si el número ingresado es 0 y mostrar la suma total.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code-area">
                    <pre>
                      <code>
                        suma = 0{"\n"}
                        numero = int(input("Ingrese un número: ")){"\n"}
                        while numero != 0:{"\n"}
                        &nbsp;&nbsp;suma += numero{"\n"}
                        &nbsp;&nbsp;numero = int(input("Ingrese un número: ")){"\n"}
                        ____ numero == 0:{"\n"}
                        &nbsp;&nbsp;print("Suma total:", suma)
                      </code>
                    </pre>
                  </div>
                </div>
                <div className="drag-container">
                  {options.map((option) => (
                    <div
                      key={option}
                      className="drag-option"
                      draggable
                      onDragStart={(e) => handleDragStart(e, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div
                  className="drop-zone"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {droppedItem ? `Estructura seleccionada: ${droppedItem}` : "Arrastra aquí la estructura correcta"}
                </div>
                <div className="button-container">
                  <button className="nivel1-card-button" onClick={handleVerify}>
                    Verificar
                  </button>
                  {showNextButton && (
                    <button
                      className={`nivel1-card-button next-button show`}
                      onClick={handleNext}
                    >
                      Siguiente
                    </button>
                  )}
                </div>
                <div className="result-container">
                  {isCorrect !== null && (
                    <p className={`result ${isCorrect ? "correct" : "incorrecto"}`}>
                      {isCorrect ? "¡Correcto!" : "Inténtalo de nuevo"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Puntaje></Puntaje>
        </div>
      </div>
    </div>
  );
};

export default TreceNivel3;
