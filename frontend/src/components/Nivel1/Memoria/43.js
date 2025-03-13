import React, { useState } from "react";
import '../../../styles/1.css';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	

const Cuarentatres = () => {
  const [flippedCards, setFlippedCards] = useState([]); // Tarjetas volteadas
  const [matchedPairs, setMatchedPairs] = useState([]); // Pairs emparejados
  const [isCorrect, setIsCorrect] = useState(null); // Estado para verificar si es correcto
  const navigate = useNavigate();
  const [hoveredInsignia, setHoveredInsignia] = useState(null);
  const [isModalOpenPinguino, setIsModalOpenPinguino] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
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
  const cards = [
    { id: 1, value: "print", pairId: 1 },
    { id: 2, value: "print", pairId: 2 },
    { id: 3, value: "int", pairId: 3 },
    { id: 4, value: "int", pairId: 3 },
    { id: 5, value: "año", pairId: 2 },
    { id: 6, value: "año", pairId: 1 }, // Par para el "="
  ];

  const handleCardClick = (card) => {
    if (flippedCards.length === 2) return;

    if (flippedCards.find((flippedCard) => flippedCard.id === card.id)) return;

    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];
      if (firstCard.pairId === card.pairId) {
        setMatchedPairs([...matchedPairs, firstCard.id, card.id]);
        setFlippedCards([]); // Restablecer las cartas volteadas
        if (card.value === "=") {
          // Verifica si el signo es "="
          setIsCorrect(true);
        }
      } else {
        // Si las cartas no coinciden, voltear de nuevo después de un corto retraso
        setTimeout(() => setFlippedCards([]), 1000); // Esperar 1 segundo para voltear las cartas
      }
    }
  };

  const isCardFlipped = (card) => {
    return (
      flippedCards.find((flippedCard) => flippedCard.id === card.id) ||
      matchedPairs.includes(card.id)
    );
  };

  const handleInsigniaClick = () => {
    navigate("/insignias");
  };
  const handleMouseEnter = (name) => {
    setHoveredInsignia(name);
  };

  const handleMouseLeave = () => {
    setHoveredInsignia(null);
  };
  const handlePythonIconClick = () => {
    setIsModalOpenPinguino((prevState) => !prevState);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  const handleVerify = () => {
    if (matchedPairs.includes(3)) {
      // Si el signo "=" está emparejado correctamente
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
            <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>NIVEL 1</h2>
              <HeaderInfo></HeaderInfo>
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <span>Captura y Muestra de una Fecha de Nacimiento</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                 Encuentra la pareja relacionada.
                 </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">
                    <pre>
                      <code>
                        numero = _____(input(“Ingrese un numero”)) {"\n"}
                        print("El cuadrado de”, numero, “es”, numero**2){"\n"}
                        
                      </code>
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
                      {isCardFlipped(card) ? (
                        <span>{card.value}</span>
                      ) : (
                        <span>?</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="verify-container">
                  {isCorrect === true && (
                    <p className="result correct">¡Correcto! El signo es "="</p>
                  )}
                  {isCorrect === false && (
                    <p className="incorrect-message">¡Inténtalo de nuevo!</p>
                  )}
                  <button className="next-button" onClick={handleVerify}>
                    Verificar
                  </button>
                  <button
                    className={`nivel1-card-button next-button ${
                      isCorrect ? "show" : ""
                    }`}
                    onClick={handleNext}
                    disabled={isCorrect === null || !isCorrect} // Desactiva el botón hasta que sea correcto
                  >
                    Continuar
                  </button>
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

export default Cuarentatres;
