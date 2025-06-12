import React, { useState, useEffect, useRef } from "react";
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
  const setVidas = useVidasStore((state) => state.setVidas); // Asegúrate de que este acceso es correcto
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [errorMessage,setErrorMessage] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [output, setOutput] = useState("");
  const [result, setResult] = useState(null);
  const [successMessage,setSuccessMessage] = useState(null);

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
  const handleVerify = async (answer) => {
    setSelectedAnswer(answer);
    if (!answer.trim()) { 
      setErrorMessage("No puedes dejar la respuesta vacía.");
      setSuccessMessage("");
      setShowNext(false);
      return;
    }
  
    const isCorrectAnswer = answer === "mundo";
    if (isCorrectAnswer) {
      setOutput("Respuesta correcta: Hola Mundo!");
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
        ejercicio: 1, 
        fecha: new Date().toISOString().split("T")[0],
        resultado: isCorrectAnswer,
        errores: isCorrectAnswer ? 0 : errores + 1
      };
  
      const response = await axios.post(
        `${API_BASE_URL}/myapp/guardar-intento/`,
        requestData,
        { headers }
      );
  
      if (response.status !== 201) {
        throw new Error("Respuesta inesperada de la API");
      }
  
      const vidasRestantes = response.data.vidas;
      setVidas(vidasRestantes);

      /*const vidasIlimitadas = response.data.vidas_ilimitadas; 

      if (vidasIlimitadas) {
        await Swal.fire({
          title: "¡Vidas Ilimitadas!",
          text: "🛡️ ¡Tienes vidas ilimitadas por 10 minutos!",
          icon: "info",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#007bff"
        });
        return;
      }*/

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
  
      if (vidasRestantes === 0) {
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
        title: "Oh oh",
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
                  Por favor, selecciona la palabra que falta en el código para
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
                {/* Opciones de respuesta */}
                <div className="options">
                  {["hola", "print", "mundo"].map((option) => (
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
    </div>
  );
};

export default Uno;