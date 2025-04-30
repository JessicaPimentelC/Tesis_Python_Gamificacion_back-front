import React, { useState, useEffect } from "react";
import "../../../styles/1.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import {obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils_nivel2';
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";
import axios from "axios";
import useVidasStore from "../../vidasStore";
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId, refreshAccessToken } from "../../../utils/validacionesGenerales";
import { fetchUserInfo } from '../../../utils/userService';

const CuarentaDosNivel2 = () => {
  const [flippedCards, setFlippedCards] = useState([]); // Tarjetas volteadas
  const [matchedPairs, setMatchedPairs] = useState([]); // Pairs emparejados
  const [isCorrect, setIsCorrect] = useState(null); // Estado de respuesta
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [insignias, setInsignias] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas);
  const [showNextButton, setShowNextButton] = useState(false);
  const [result, setResult] = useState(null);
  const [output, setOutput] = useState('');
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [score, setScore] = useState(0);
  const [errores, setErrores] = useState(0); 
  const [verificationMessage, setVerificationMessage] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);
  
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserInfo();
        setUserInfo(userData);
        console.log("Usuario:", userData);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };
    loadUser();
  }, []);
  
//Permite avanzar entre ejercicios
  const handleNext = async () => {
    if (!userInfo || !userInfo.id) {
      console.error("No se encontró el ID del usuario");
      return;
    }
  
    const usuario_id = userInfo.id;
    const proximoEjercicio = obtenerEjercicioAleatorioEnunciado();
    const ejercicio_id = await obtenerEjercicioId();
    console.log("ejercicio id en handle next",ejercicio_id)
    if (!ejercicio_id) {
        console.error("No se pudo obtener el ejercicio_id");
        return;
    }
    if (proximoEjercicio) {
      try {
        await guardarEjercicioEnBD(usuario_id, proximoEjercicio);
  
        const nivelResponse = await axios.get(`${API_BASE_URL}/myapp/nivel_ejercicio_asignado/${ejercicio_id}/`, { withCredentials: true });
            
            if (nivelResponse.status === 200) {
                const nivelId = nivelResponse.data.nivel_id;
                await verificarNivel(nivelId);  // Llamar a la función con el nivel correcto
            } else {
                console.error("No se encontró un nivel asignado.");
            }
  
        setNumerosUsados((prev) => [...prev, proximoEjercicio]);
        setShowModal(false);
  
        redirigirAEnunciado(proximoEjercicio, navigate);
  
      } catch (error) {
        console.error("Error al avanzar al siguiente ejercicio:", error);
        }
      } else {
        console.log("No quedan ejercicios disponibles.");
      }
    };

  const cards = [
    { id: 1, value: "elif", pairId: 4 },
    { id: 2, value: "else", pairId: 1 },
    { id: 3, value: "if", pairId: 3 },
    { id: 4, value: "else", pairId: 1 },
    { id: 5, value: "elif", pairId: 2 },
    { id: 6, value: "if", pairId: 5 },
  ];

  const handleCardClick = (card) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.find((flippedCard) => flippedCard.id === card.id)) return;
  
    setFlippedCards([...flippedCards, card]);
  
    if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];
      if (firstCard.pairId === card.pairId) {
        // Cartas coinciden
        const newMatchedPairs = [...matchedPairs, firstCard.id, card.id];
        setMatchedPairs(newMatchedPairs);
        setFlippedCards([]);
        
        // Verificar si se completó el objetivo (emparejar "print")
        const printCardsMatched = cards.filter(c => 
          c.value === "else" && newMatchedPairs.includes(c.id)
        ).length === 2; // Asumiendo que hay 2 cartas "print"
        
        if (printCardsMatched) {
          setIsCorrect(true);
          handleVerify(true); // Pasar true porque es correcto
        }
      } else {
        // Cartas no coinciden
        setTimeout(() => {
          setFlippedCards([]);
          setIsCorrect(false);
          handleVerify(false); // Pasar false porque es incorrecto
        }, 1000);
      }
    }
  };

  const isCardFlipped = (card) => {
    return (
      flippedCards.find((flippedCard) => flippedCard.id === card.id) ||
      matchedPairs.includes(card.id)
    );
  };
  useEffect(() => {
    if (matchedPairs.includes(3)) {
      handleVerify();
    }
  }, [matchedPairs]);  
//Verifica respuesta ejercicio
const handleVerify = async (result) => {
console.log("Verificando con resultado:", result); 
    const verificationResult = Boolean(result); 
    try {
      const headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      };

      const token = localStorage.getItem("access_token");
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const usuario_id = userInfo?.id;
      if (!usuario_id) throw new Error("Usuario no identificado");

    const requestData = {
      usuario: usuario_id,
      ejercicio: 92,
      fecha: new Date().toISOString().split("T")[0],
      resultado: verificationResult,
      errores: verificationResult ? 0 : errores + 1,
    };

    const response = await axios.post(
      `${API_BASE_URL}/myapp/guardar-intento/`,
      requestData,
      { headers, withCredentials: true }
    );

    if (response.status !== 201) {
      throw new Error("Respuesta inesperada de la API");
    }

  if (result) {
    setShowNextButton(true);
    setScore(prevScore => prevScore + 10);
    setVerificationMessage("✅ ¡Ganaste 10 puntos!");
    setOutputVisible(true);
    setTimeout(() => setOutputVisible(false), 3000);
    new Audio("/ganar.mp3").play().catch(e => console.error("Error al reproducir sonido:", e));
  } else {
    setShowNextButton(false);
    new Audio("/perder.mp3").play().catch(e => console.error("Error al reproducir sonido:", e));
  }

    verificarYOtorgarLogro(usuario_id).catch((e) =>
      console.error("Error verificando logros:", e)
    );
  } catch (error) {
    console.error(
      "Error al guardar el intento:",
      error.response ? error.response.data : error.message
    );
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshAccessToken();
        localStorage.setItem("access_token", newToken);
        return handleVerify();
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        navigate("/");
        return;
      }
    }

    Swal.fire({
      title: "Error",
      text: error.response?.data?.message || "Ocurrió un error al verificar",
      icon: "error",
    });
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
                {outputVisible && (
                  <div className="output-message">
                    {verificationMessage.includes("✅") && (
                      <img
                        src="/exa.gif"
                        alt="Correcto"
                        className="verification-gif"
                      />
                    )}
                    {verificationMessage.includes("❌") && (
                      <img
                        src="/exam.gif"
                        alt="Incorrecto"
                        className="verification-gif"
                      />
                    )}
                    <span>{verificationMessage}</span>
                  </div>
                )}
                <div className="verify-container">
                  {isCorrect === true && (
                    <p className="result correct">¡Correcto! La palabra clave es "else".</p>
                  )}
                  {isCorrect === false && <p className="incorrect-message">¡Inténtalo de nuevo!</p>}
                  <button
                    className={`nivel1-card-button next-button ${isCorrect ? "show" : ""}`}
                    onClick={handleNext}
                    disabled={isCorrect === null || !isCorrect}
                  >
                    Siguiente
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
