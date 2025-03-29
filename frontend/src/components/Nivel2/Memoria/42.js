import React, { useState } from "react";
import "../../../styles/1.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from "../../../utils/utils";

const CuarentaDosNivel2 = () => {
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
    { id: 1, value: "elif", pairId: 1 },
    { id: 2, value: "else", pairId: 2 },
    { id: 3, value: "if", pairId: 3 },
    { id: 4, value: "else", pairId: 2 },
    { id: 5, value: "elif", pairId: 1 },
    { id: 6, value: "if", pairId: 3 },
  ];

  const handleCardClick = (card) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.find((flippedCard) => flippedCard.id === card.id)) return;

    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];
      if (firstCard.pairId === card.pairId) {
        setMatchedPairs([...matchedPairs, firstCard.id, card.id]);
        setFlippedCards([]); // Restablecer
        if (card.value === "else") {
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
      cards.find((card) => card.id === id && card.value === "else")
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
                <span>EJERCICIO CONDICIONALES</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  Encuentra la palabra clave correcta para completar el código que compara dos números.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">
                    <pre>
                      num1 = int(input("Ingresa el primer número: ")){"\n"}
                      num2 = int(input("Ingresa el segundo número: ")){"\n"}
                      if num1 &gt; num2:{"\n"}
                      &nbsp;&nbsp;&nbsp;&nbsp;print(num1, "es mayor que", num2){"\n"}
                      elif num2 &gt; num1:{"\n"}
                      &nbsp;&nbsp;&nbsp;&nbsp;print(num2, "es mayor que", num1){"\n"}
                      <span className="highlight">___</span>:{"\n"}
                      &nbsp;&nbsp;&nbsp;&nbsp;print("Ambos números son iguales."){"\n"}
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
                    <p className="result correct">¡Correcto! La palabra clave es "else".</p>
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

export default CuarentaDosNivel2;
