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

const QuinceNivel2 = () => {
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
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [output, setOutput] = useState('');
  const [errorMessage,setErrorMessage] = useState(null);
  const [successMessage,setSuccessMessage] = useState(null);
  const [showNext, setShowNext] = useState(false);

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

  const options = ["input", "print", "break"];

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDroppedItem(draggedItem);
  };

  const handleVerify = async (answer) => {
    setSelectedAnswer(answer);
    if (!answer.trim()) { 
      setErrorMessage("No puedes dejar la respuesta vacía.");
      setSuccessMessage("");
      setShowNext(false);
      return;
    }
    
    const isCorrectAnswer = answer === "input";
    if (isCorrectAnswer) {
      setOutput("Respuesta correcta");
    }
    else{
      setOutput("Respuesta incorrecta. Inténtalo de nuevo.");
    }
    setResult(isCorrectAnswer ? 'correct' : 'incorrect');
    setShowNext(isCorrectAnswer);


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
            ejercicio: 65,
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
    setIsModalOpen(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePythonIconClick = () => {
    setIsModalOpenPinguino((prevState) => !prevState);
  };

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
                <span>EJERCICIO 15</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  
                  <br />
             
                  Selecciona el signo  correcto al espacio en blanco _______ en el siguiente código:
                                  </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">
  <pre>
    <code>
{`hora = int(_____("Ingresa la hora (0-23): "))

if 6 <= hora < 12:
    print("Turno de la mañana.")
elif 12 <= hora < 18:
    print("Turno de la tarde.")
elif 18 <= hora <= 23 or 0 <= hora < 6:
    print("Turno de la noche.")
else:
    print("Hora no válida.")
`}
    </code>
  </pre>
</div>                </div>
<div className="options">
                  {["input", "print", "break"].map((option) => (
                    <div
                      key={option}
                      className={`option ${selectedAnswer === option ? "selected" : ""}`}
                      onClick={() => handleVerify(option)}
                    >
                      {option}
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
                    <div className="code"><pre>{output}</pre></div>
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

export default QuinceNivel2;