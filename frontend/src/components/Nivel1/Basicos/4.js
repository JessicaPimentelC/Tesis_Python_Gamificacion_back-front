import React, { useState, useEffect } from 'react';
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import Puntaje from '../../Puntaje';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";
import axios from "axios";
import useVidasStore from "../../vidasStore";
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId } from "../../../utils/validacionesGenerales";

const Cuatro = () => {
  const [droppedWords, setDroppedWords] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas); // Asegúrate de que este acceso es correcto
  const [showNextButton, setShowNextButton] = useState(false);  
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [errores, setErrores] = useState(0);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  const [result, setResult] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItem, setDroppedItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const csrfToken = getCSRFToken();
        const response = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, {
          headers: {
            "X-CSRFToken": csrfToken,
        },
          withCredentials: true,
        });
        setUserInfo(response.data);
        console.log("Usuario recibido:", response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error.response?.data || error.message);
      }
    };
    fetchUsuario();
  },[]);

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

  useEffect(() => {
    const now = new Date();
    const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.toLocaleDateString()}`;
    setCurrentTime(formattedTime);
  }, []);


//Verifica respuesta ejercicio
const handleVerify = async () => {
  if (!droppedItem) {
    alert("Por favor, selecciona una palabra antes de verificar.");
    return;
  }
  const isCorrectAnswer = droppedItem === "print";
  setIsCorrect(isCorrectAnswer);

  try {
    const ejercicio_id = 4; 

    const userResponse = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, { withCredentials: true });
    const usuario_id = userResponse.data.id;
    console.log("Respuesta del usuario obtenida:", userResponse.data);

    if (!usuario_id) {
      alert("Error: Usuario no identificado.");
      return;
    }
    const requestData = {
      usuario: usuario_id,
      ejercicio: ejercicio_id,
      fecha: new Date().toISOString().split("T")[0],
      resultado: isCorrectAnswer,
      errores: isCorrect ? 0 : errores + 1,
    };

    console.log("Datos enviados:", requestData);
    const csrfToken = getCSRFToken();
    const response = await axios.post(`${API_BASE_URL}/myapp/guardar-intento/`, requestData,{
      headers: {
        "X-CSRFToken": csrfToken,
    },
        withCredentials: true,
    });
    const vidasRestantes = response.data.vidas;
    setVidas(vidasRestantes);
    if (response.status === 201) {
      if (isCorrectAnswer) {
        setShowNextButton(true);
        setScore(score + 10);
        new Audio("/ganar.mp3").play();
    } else {
        setShowNextButton(false);
        new Audio("/perder.mp3").play();
    }

      if (vidasRestantes === 0) {
        Swal.fire({
          title: "Oh oh!",
          text: "No tienes más vidas. Espera o recarga vidas",
          icon: "warning",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#007bff",
        });
        return;
      }

      await verificarYOtorgarLogro(usuario_id);
    } else {
      console.error("Error en la respuesta de la API:", response.data);
    }
  } catch (error) {
    console.error("Error al guardar el intento:", error.response ? error.response.data : error.message);
  }
};
/**PARA ARRASTRAR LAS PALABRAS*/
const handleDragStart = (e, item) => {
  e.dataTransfer.setData("text/plain", item);
  e.dataTransfer.effectAllowed = "move";
  setDraggedItem(item);
};
const handleDrop = (e) => {
  e.preventDefault();
  const droppedText = e.dataTransfer.getData("text/plain");
  setDroppedItem(droppedText);

  // Limpiar el estado del item arrastrado
  setDraggedItem(null);
};

const handleTouchStart = (e, item) => {
  setDraggedItem(item);
  setIsDragging(true);
};
const handleDragOver = (e) => {
e.preventDefault(); // Permite el drop
};
const handleTouchMove = (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  const element = document.getElementById("dragging");
  if (element) {
      element.style.position = "absolute";
      element.style.left = `${touch.clientX}px`;
      element.style.top = `${touch.clientY}px`;
  }
};
const handleDragEnd = () => {
setDraggedItem(null);
};
const handleTouchEnd = (e) => {
  setIsDragging(false);
  setDroppedItem(draggedItem);
};
const options = ["print", "else", "while"];


  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>

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
            <h2>EJERCICIO #4</h2>
            </div>
            <div className="nivel1-card-body">
              <p>Arrastra la palabra correcta al cuadro de código y verifica tu respuesta.</p>
            </div>
              <div className="code-box"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="code-header">Código:</div>
                <div className="code">
                  <pre>
                  <code>________("70 / 2")</code>
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
                        onTouchStart={(e) => handleTouchStart(e, option)}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onDragEnd={handleDragEnd}
                        id={isDragging && draggedItem === option ? "dragging" : ""}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div
                  className="drop-zone"
                  onDrop={handleDrop}
                  onTouchEnd={(e) => handleTouchEnd(e)} // Móviles
                  onDragOver={handleDragOver}
                  >
                  {droppedItem
                    ? `${droppedItem}("70 / 2"))`
                    : "Arrastra aquí la palabra correcta"}
                </div>

              <div className="nivel1-card-button-container">
                <button className="nivel1-card-button" onClick={handleVerify}>
                  Verificar
                </button>
                {showNextButton && (
                  <button
                    className="nivel1-card-button"
                    onClick={handleNext}
                  >
                    Siguiente
                  </button>
                )}
              </div>

              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}
            </div>
          </div>
          <Puntaje></Puntaje>
        </div>
      </div>
    </div>
  );
};

export default Cuatro;
