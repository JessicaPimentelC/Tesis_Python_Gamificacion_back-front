import React, { useState, useEffect} from 'react';
import "../../../styles/1.css"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";
import axios from "axios";
import useVidasStore from "../../vidasStore";
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId, refreshAccessToken } from "../../../utils/validacionesGenerales";
import { fetchUserInfo } from '../../../utils/userService';

const Treintaseis = () => {
  // Estado para manejar las opciones disponibles
  const [options, setOptions] = useState(["()","////","$$$","If"]);
  const [hoveredInsignia, setHoveredInsignia] = useState(null); // Estado para mostrar los nombres al hacer hover
  const [isModalOpenPinguino, setIsModalOpenPinguino] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [score, setScore] = useState(0);
  const [errores, setErrores] = useState(0); 
  const [successMessage,setSuccessMessage] = useState(null);
  const [errorMessage,setErrorMessage] = useState(null);
  const [insignias, setInsignias] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas);
  const [output, setOutput] = useState('');
  const navigate = useNavigate();
  const [verificationMessage, setVerificationMessage] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState(null);

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
  
        const nivelResponse = await axios.get(`${API_BASE_URL}/myapp/nivel_ejercicio_asignado/${ejercicio_id}/`);
            
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
  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalPinguino = () => {
    setIsModalOpenPinguino(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  const [droppedItem, setDroppedItem] = useState(null);

  const [isCorrect, setIsCorrect] = useState(null);

  const [showNextButton, setShowNextButton] = useState(false);

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData("text/plain", option);
  };

  // Función para manejar el evento de soltar
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    setDroppedItem(data);
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

  const isCorrect = answer === "()";
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
      "Content-Type": "application/json"    };

    const token = localStorage.getItem("access_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const userResponse = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, {
      headers    });

    const usuario_id = userResponse.data.id;
    if (!usuario_id) throw new Error("Usuario no identificado");

    const requestData = {
      usuario: usuario_id,
      ejercicio: 36,
      fecha: new Date().toISOString().split("T")[0],
      resultado: isCorrect,
      errores: isCorrect ? 0 : errores + 1,
    };
    const response = await axios.post(
      `${API_BASE_URL}/myapp/guardar-intento/`,
      requestData,
      { headers}
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
      if (isCorrect) {
        setShowNextButton(true);
        setScore(score + 10);
        setVerificationMessage("✅ ¡Ganaste 10 puntos!");
        setOutputVisible(true);
        setTimeout(() => setOutputVisible(false), 3000); 
        new Audio("/ganar.mp3").play();
      }
      else {
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
      title: "Oh oh",
      text: error.response?.data?.message || "Ocurrió un error al verificar",
      icon: "error"
    });
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
                <span>EJERCICIO #1</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                En este ejercicio, debes seleccionar la palabra correcta.

                    </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">
                    <pre>
                      <code>
                      a = input("Ingresa el primer valor: "){"\n"}b =
                        input("Ingresa el segundo valor: "){"\n"}a, b = b, a
                        print("Después de intercambiar:"){"\n"}
                        print("Primer valor:",a){"\n"} 
                        print___"Segundo valor:", b___{"\n"}
                      </code>
                    </pre>
                  </div>
                </div>
                <div className="options">
                  {["{}", "()", "[]"].map((option) => (
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

export default Treintaseis;
