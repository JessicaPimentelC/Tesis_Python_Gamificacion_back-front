import React, { useState, useEffect} from 'react';
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Puntaje from '../../Puntaje';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";
import axios from "axios";
import useVidasStore from "../../vidasStore";
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId, refreshAccessToken } from "../../../utils/validacionesGenerales";
import { fetchUserInfo } from '../../../utils/userService';

// Crea un objeto de audio global para su uso
const audio = new Audio('/nivel6.mp3');
audio.preload = 'auto';

const Seis = () => {
  const [draggedNumber, setDraggedNumber] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [output, setOutput] = useState('');
  const [score, setScore] = useState(0); // Define el estado para el puntaje
  const [currentTime] = useState(new Date().toLocaleString()); // Hora y Fecha actual
  const navigate = useNavigate(); // Hook para la redirección
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [errores, setErrores] = useState(0);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas);   const [showNextButton, setShowNextButton] = useState(false);
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [successMessage,setSuccessMessage] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [errorMessage,setErrorMessage] = useState(null);
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

//Verifica respuesta ejercicio
const handleVerify = async (answer) => {
  setSelectedAnswer(answer);
  if (!answer.trim()) { 
    setErrorMessage("No puedes dejar la respuesta vacía.");
    setSuccessMessage("");
    setShowNext(false);
    return;
  }

  const isCorrect = answer === "37"; 
  if (isCorrect) {
    setOutput("Respuesta correcta");
  }
  else{
    setOutput("Respuesta incorrecta. Inténtalo de nuevo.");
  }
  setResult(isCorrect ? 'correct' : 'incorrect');
  setShowNext(isCorrect); // Muestra u oculta el botón "Siguiente"

  try {
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken()
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
      ejercicio: 6,
      fecha: new Date().toISOString().split("T")[0],
      resultado: isCorrect,
      errores: isCorrect ? 0 : errores + 1,
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
      if (isCorrect) {
        setShowNextButton(true);
        setScore(score + 10);
        setVerificationMessage("✅ ¡Ganaste 10 puntos!");
        setOutputVisible(true);
        setTimeout(() => setOutputVisible(false), 3000);
        new Audio("/ganar.mp3").play();
      }else {
        setShowNextButton(false);
        new Audio("/perder.mp3").play();
      }

      if (vidasRestantes === 0 && !vidasIlimitadas) {
        Swal.fire({
          title: "Oh oh!",
          text: "No tienes más vidas. Espera o recarga vidas",
          icon: "warning",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#007bff",
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

  const handleDragStart = (number) => {
    setDraggedNumber(number);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleVerify();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Función para reproducir sonido
  const playSound = () => {
    audio.currentTime = 0; // Reinicia el tiempo de reproducción para reproducir desde el principio
    audio.play().catch((error) => {
      // Maneja errores si ocurren
      console.error('Error reproduciendo el sonido:', error);
    });
  };

  const handleInsigniaClick = () => {
    navigate('/insignias'); // Redirige a la página de insignias
  };

  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
    <div className="nivel1-container">
      {/* Contenedor principal con el cuadro de información y el contenido principal */}
      <div className="content">
        {/* Contenedor de información */}
        <div className="white-background">
            <HeaderBody></HeaderBody>            
            <div className="header-title">
              <h2>NIVEL 1</h2>
              <HeaderInfo></HeaderInfo>
            </div>
            
          <div className="nivel1-card">
            <div className="nivel1-card-header">
            <h2>Ejercicio de variables</h2>
            </div>
            <div className="nivel1-card-body">
              <p>Crea una variable de tipo numérico que almacene el número 37</p>
            </div>
            <div className="nivel1-card-body">
              <div className="code-box">
                <div className="code-header">PYTHON</div>
                <div 
                  className="code"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <pre>
                    variable = <span className="drop-area">________</span>
                  </pre>
                </div>
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
              <div className="options">
                  {["40", "37", "20", "27"].map((option) => (
                    <div
                      key={option}
                      className={`option ${selectedAnswer === option ? "selected" : ""}`}
                      onClick={() => handleVerify(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>

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

export default Seis;
