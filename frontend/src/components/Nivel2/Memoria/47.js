import React, { useState } from "react";
import "../../../styles/1.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from "../../../utils/utils";

const CuarentaSieteNivel2 = () => {
  const [flippedCards, setFlippedCards] = useState([]); // Tarjetas volteadas
  const [matchedPairs, setMatchedPairs] = useState([]); // Pairs emparejados
  const [isCorrect, setIsCorrect] = useState(null); // Estado de respuesta
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

  const cards = [
    { id: 1, value: '>', pairId: 1 }, // Respuesta correcta
    { id: 2, value: '<', pairId: 2 },
    { id: 3, value: '==', pairId: 3 },
    { id: 4, value: '>', pairId: 1 }, // Segunda opción correcta
    { id: 5, value: '<', pairId: 2 },
    { id: 6, value: '==', pairId: 3 },
  ];

  const handleCardClick = (card) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.find((flippedCard) => flippedCard.id === card.id)) return;

    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];
      if (firstCard.pairId === card.pairId) {
        setMatchedPairs([...matchedPairs, firstCard.id, card.id]);
        setFlippedCards([]);
        if (card.value === '>') {
          setIsCorrect(true);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const isCardFlipped = (card) => {
    return (
      flippedCards.find((flippedCard) => flippedCard.id === card.id) ||
      matchedPairs.includes(card.id)
    );
  };

  const handleVerify = () => {
    const correctPairs = matchedPairs.filter((id) =>
      cards.find((card) => card.id === id && card.value === '>')
    );

    if (correctPairs.length >= 1) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
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
                <span>EJERCICIO CONDICIÓN NUMÉRICA</span>
              </div>
              <div className="nivel1-card-body-ejer1">
                <p>
                  Completa la condición correcta para verificar si un número es positivo y mayor que 100.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">
                    <pre>
                      numero = float(input("Ingresa un número: ")){"\n"}
                      if numero ____ 0 and numero ____ 100:{"\n"}
                      &nbsp;&nbsp;&nbsp;&nbsp;print("El número es positivo y mayor que 100."){"\n"}
                      else:{"\n"}
                      &nbsp;&nbsp;&nbsp;&nbsp;print("El número no cumple ambas condiciones."){"\n"}
                    </pre>
                  </div>
                </div>
                <div className="card-grid">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className={`card ${isCardFlipped(card) ? "flipped" : ""}`}
                      onClick={() => handleCardClick(card)}
                    >
                      {isCardFlipped(card) ? <span>{card.value}</span> : <span>?</span>}
                    </div>
                  ))}
                </div>

                <div className="verify-container">
                  {isCorrect === true && (
                    <p className="result correct">¡Correcto! La condición numérica es válida.</p>
                  )}
                  {isCorrect === false && <p className="incorrect-message">¡Inténtalo de nuevo!</p>}
                  <button className="next-button" onClick={handleVerify}>
                    Verificar
                  </button>
                  <button
                    className={`nivel1-card-button next-button ${isCorrect ? "show" : ""}`}
                    onClick={handleNext}
                    disabled={isCorrect === null || !isCorrect}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Puntaje />
        </div>
      </div>
    </div>
  );
};

export default CuarentaSieteNivel2;
