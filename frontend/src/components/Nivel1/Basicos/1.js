import React, { useState, useEffect } from "react";
import "../../../styles/1.css";
import { useNavigate } from "react-router-dom";
import HeaderBody from "../../HeaderBody";
import axios from "axios";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import {obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';
import Sidebar from "../../Sidebar";
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";
import useVidasStore from "../../vidasStore";
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId, refreshAccessToken } from "../../../utils/validacionesGenerales";
import { fetchUserInfo } from '../../../utils/userService';

const Uno = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItem, setDroppedItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [score, setScore] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [isOpen, setIsOpen] = useState(false); // Estado para la barra lateral
  const [hoveredInsignia, setHoveredInsignia] = useState(null); // Estado para mostrar los nombres al hacer hover
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errores, setErrores] = useState(0);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [issModalOpenPinguino,setIsModalOpenPinguino] =useState(false);
  const setVidas = useVidasStore((state) => state.setVidas); // Asegúrate de que este acceso es correcto
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  
  const options = ["Mundo", "Hola", "Print"];

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

    useEffect(() => {

    const handleClickOutside = (event) => {
      if (!event.target.closest(".circular-icon-container")) {
        setHoveredInsignia(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
  
  //Verifica respuesta ejercicio
  const handleVerify = async () => {
    if (!droppedItem) {
      Swal.fire({
        title: "Atención",
        text: "Por favor, selecciona una palabra antes de verificar.",
        icon: "warning",
        confirmButtonColor: "#3085d6"
      });
      return;
    }
  
    const isCorrectAnswer = droppedItem === "Mundo";
    setIsCorrect(isCorrectAnswer);
  
    try {
      const headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      };
  
      const token = localStorage.getItem("access_token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
  
      const userResponse = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, {
        headers,
        withCredentials: true
      });
  
      const usuario_id = userResponse.data.id;
      if (!usuario_id) throw new Error("Usuario no identificado");
  
      const requestData = {
        usuario: usuario_id,
        ejercicio: 1, 
        fecha: new Date().toISOString().split("T")[0],
        resultado: isCorrectAnswer,
        errores: isCorrectAnswer ? 0 : errores + 1
      };
  
      const response = await axios.post(
        `${API_BASE_URL}/myapp/guardar-intento/`,
        requestData,
        { headers, withCredentials: true }
      );
  
      if (response.status !== 201) {
        throw new Error("Respuesta inesperada de la API");
      }
  
      const vidasRestantes = response.data.vidas;
      const vidasIlimitadas = response.data.vidas_ilimitadas; 
      setVidas(vidasRestantes);

      if (vidasIlimitadas) {
        await Swal.fire({
          title: "¡Vidas Ilimitadas!",
          text: "🛡️ ¡Tienes vidas ilimitadas por 10 minutos!",
          icon: "info",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#007bff"
        });
        return;
      }

      if (isCorrectAnswer) {
        setShowNextButton(true);
        setScore(prevScore => prevScore + 10);
        setVerificationMessage("✅ ¡Ganaste 10 puntos!");
        setOutputVisible(true);
        setTimeout(() => setOutputVisible(false), 3000);
        new Audio("/ganar.mp3").play();

      } else {
        setShowNextButton(false);
        new Audio("/perder.mp3").play();
      }
  
      if (vidasRestantes === 0 && !vidasIlimitadas) {
        await Swal.fire({
          title: "¡Vidas agotadas!",
          text: "No tienes más vidas disponibles",
          icon: "warning",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#007bff"
        });
        return;
      }
  
      verificarYOtorgarLogro(usuario_id).catch(e => 
        console.error("Error verificando logros:", e)
      );
  
    } catch (error) {
      console.error("Error:", error);
      
      // Manejo específico para token expirado
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
        icon: "error"
      });
    }
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const handleDragStart = (e, item) => {
    // Crear elemento fantasma para Chrome
    const dragIcon = document.createElement('div');
    dragIcon.innerHTML = item;
    dragIcon.style.position = 'absolute';
    dragIcon.style.top = '-9999px';
    document.body.appendChild(dragIcon);
    e.dataTransfer.setDragImage(dragIcon, 0, 0);
    
    // Calcular offset para posicionamiento preciso
    const rect = e.target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    e.dataTransfer.setData("text/plain", item);
    setDraggedItem(item);
    
    // Efecto visual durante arrastre
    e.target.classList.add('dragging-active');
    setTimeout(() => {
      e.target.style.opacity = '0.4';
    }, 0);
  };
  
  const handleDrag = (e) => {
    // Actualizar posición durante arrastre
    setDragPosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    e.target.classList.remove('dragging-active');
    setDraggedItem(null);
    
    // Limpiar elementos fantasmas
    document.querySelectorAll('[data-drag-icon]').forEach(el => el.remove());
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.currentTarget.classList.add('drop-zone-active');
  };
  
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drop-zone-active');
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drop-zone-active');
    
    const droppedText = e.dataTransfer.getData("text/plain") || draggedItem;
    setDroppedItem(droppedText);
    setDraggedItem(null);
  };
  
  // Manejo de touch para móviles
  const handleTouchStart = (e, item) => {
    const touch = e.touches[0];
    const rect = e.target.getBoundingClientRect();
    
    setDraggedItem(item);
    setIsDragging(true);
    setDragPosition({
      x: touch.clientX,
      y: touch.clientY
    });
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    
    // Crear elemento visual para arrastre táctil
    const ghost = document.createElement('div');
    ghost.className = 'drag-ghost';
    ghost.textContent = item;
    ghost.style.position = 'fixed';
    ghost.style.left = `${touch.clientX}px`;
    ghost.style.top = `${touch.clientY}px`;
    ghost.id = 'touch-ghost';
    document.body.appendChild(ghost);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setDragPosition({
      x: touch.clientX,
      y: touch.clientY
    });
    
    const ghost = document.getElementById('touch-ghost');
    if (ghost) {
      ghost.style.left = `${touch.clientX - dragOffset.x}px`;
      ghost.style.top = `${touch.clientY - dragOffset.y}px`;
    }
  };
  
  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Verificar si se soltó en la zona de drop
    const touch = e.changedTouches[0];
    const dropZone = document.querySelector('.drop-zone');
    const dropRect = dropZone.getBoundingClientRect();
    
    if (
      touch.clientX >= dropRect.left &&
      touch.clientX <= dropRect.right &&
      touch.clientY >= dropRect.top &&
      touch.clientY <= dropRect.bottom
    ) {
      setDroppedItem(draggedItem);
    }
    
    // Limpiar
    const ghost = document.getElementById('touch-ghost');
    if (ghost) ghost.remove();
    setDraggedItem(null);
  
};
  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">
        {/* Contenedor principal con el cuadro de información y el contenido principal */}
        <div className="content">
          {/* Sección principal con el ejercicio */}
          <div className="white-background">
            <HeaderBody></HeaderBody>
            <div className="header-titulo">
              <h2>NIVEL 1</h2>
              <HeaderInfo></HeaderInfo>
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <span>Ejercicio de impresión de datos</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  A continuación, te presentamos nuestro primer ejercicio de
                  nivel 1.
                  <br />
                  <br />
                  Por favor, arrastra la palabra que falta en el código para
                  poder imprimir “Hola, Mundo:”
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">
                    <pre>
                      <code>print("Hola, ________!")</code>
                    </pre>
                  </div>
                </div>
                <div className="drag-container">
                  {options.map((option) => (
                    <div
                      key={option}
                      className={`drag-option ${draggedItem === option ? 'dragging-active' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, option)}
                      onDrag={handleDrag}
                      onDragEnd={handleDragEnd}
                      onTouchStart={(e) => handleTouchStart(e, option)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div
                    className="drop-zone"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onTouchEnd={handleTouchEnd}
                  >
                  {droppedItem
                    ? `print("Hola, ${droppedItem}!")`
                    : "Arrastra aquí la palabra correcta"}
                </div>
                {isDragging && (
                  <div
                    className="drag-ghost"
                    style={{
                      position: 'fixed',
                      left: `${dragPosition.x - dragOffset.x}px`,
                      top: `${dragPosition.y - dragOffset.y}px`,
                      pointerEvents: 'none',
                      zIndex: 9999
                    }}
                  >
                    {draggedItem}
                  </div>
                )}
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
                <div className="nivel1-card-button-container">
                  <button className="nivel1-card-button" onClick={handleVerify}>
                    Verificar
                  </button>
                  {showNextButton && (
                    <button
                      className={"nivel1-card-button next-button show"}
                      onClick={handleNext}
                    >
                      Siguiente
                    </button>
                  )}
                </div>
                <div className="result-container">
                  {isCorrect !== null && (
                    <p
                      className={`result ${
                        isCorrect ? "correct" : "incorrect"
                      }`}
                    >
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

export default Uno;
