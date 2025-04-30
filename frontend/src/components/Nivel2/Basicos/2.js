import React, { useState, useEffect } from "react";
import "../../../styles/1.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import axios from "axios";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import {obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils_nivel2';
import API_BASE_URL from "../../../config";
import Swal from "sweetalert2";
import useVidasStore from "../../vidasStore";
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId, refreshAccessToken } from "../../../utils/validacionesGenerales";
import { fetchUserInfo } from '../../../utils/userService';

const DosNivel2 = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItem, setDroppedItem] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [score, setScore] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [isOpen, setIsOpen] = useState(false); // Estado para la barra lateral
  const [hoveredInsignia, setHoveredInsignia] = useState(null); // Estado para mostrar los nombres al hacer hover
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPinguino, setIsModalOpenPinguino] = useState(false);
  const [errores, setErrores] = useState(0);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas);
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
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si se hace clic fuera de los iconos, se oculta el nombre
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

  const options = [">", "<", "Cero"];

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDroppedItem(draggedItem);
  };

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
    
    const isCorrectAnswer = droppedItem === ">";
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
            ejercicio: 52,
            fecha: new Date().toISOString().split("T")[0],
            resultado: isCorrectAnswer,
            errores: isCorrectAnswer ? 0 : errores + 1,
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
        setVidas(vidasRestantes);
            if (isCorrectAnswer) {
              setShowNextButton(true);
              setScore(score + 10);
              setVerificationMessage("✅ ¡Ganaste 10 puntos!");
              setOutputVisible(true);
              setTimeout(() => setOutputVisible(false), 3000);
              new Audio("/ganar.mp3").play();
          } else {
              setShowNextButton(false);
              new Audio("/perder.mp3").play();
            }
  
            if (vidasRestantes === 0) {
              Swal.fire({
                title: "Oh oh!",
                text: `No tienes más vidas. Espera o recarga vidas`,
                icon: "success",
                confirmButtonText: "Aceptar",
                  confirmButtonColor: "#007bff" 
                });   
                  return;
            }
        verificarYOtorgarLogro(usuario_id).catch(e => 
          console.error("Error verificando logros:", e)
        );
  
      } catch (error) {
          console.error("Error al guardar el intento:", error.response ? error.response.data : error.message);
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

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">
        <div className="content">
          <div className="white-background">
            <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>NIVEL 2</h2>
              <HeaderInfo></HeaderInfo>
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <span>EJERCICIO #1</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                El ejercicio consiste en identificar el operador que debe ir en el espacio en blanco. ¡Buena suerte!
                  <br />
                  <br />
                  Por favor, arrastra la palabra que representa el operador correcto del
                  número ingresado.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">
                    <pre>
                      <code>
                      numero = int(input("Ingresa un número: ")){"\n"}
                      if numero ______ 0:{"\n"}
                      &nbsp;&nbsp;print("El número es positivo"){"\n"}
                      elif numero &lt; 0:{"\n"}
                      &nbsp;&nbsp;print("El número es negativo"){"\n"}
                      else:{"\n"}
                      &nbsp;&nbsp;print("El número es cero")
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
                  {droppedItem
                    ? `El operador es ${droppedItem}`
                    : "Arrastra aquí la palabra correcta"}
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
                    <p
                      className={`result ${
                        isCorrect ? "correct" : "incorrecto"
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
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>¡Hola, soy pingui jessica!</h2>
            <p>
              Aquí podrás encontrar todas las ayudas que necesites para
              completar los ejercicios. ¡No dudes en consultarlo cuando lo
              necesites!
            </p>

            <div className="nivel1-card-header">
              <p>Seleccione una Ayuda:</p>
            </div>

            {/* Contenedor de los iconos en forma vertical */}
            <div className="modal-icons">
              <button
                className="modal-icon-button"
                onClick={() => alert("Ayuda 1: Idea")}
              >
                <img src="idea.gif" alt="Icono 1" className="modal-icon" />
              </button>

              <button
                className="modal-icon-button"
                onClick={() => alert("Ayuda 2: Apoyo")}
              >
                <img src="apoyo.gif" alt="Icono 2" className="modal-icon" />
              </button>

              <button
                className="modal-icon-button"
                onClick={() => alert("Ayuda 3: Cuaderno")}
              >
                <img src="cuaderno.gif" alt="Icono 3" className="modal-icon" />
              </button>
            </div>

            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DosNivel2;