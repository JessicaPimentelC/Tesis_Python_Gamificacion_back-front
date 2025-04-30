import React, { useState, useEffect } from 'react';
import '../../../styles/1.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils_nivel3';
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";
import axios from "axios";
import useVidasStore from "../../vidasStore";
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId, refreshAccessToken } from "../../../utils/validacionesGenerales";
import { fetchUserInfo } from '../../../utils/userService';

const Nivel3Dieciocho = () => {
  const [conditionFunction, setConditionFunction] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [errores, setErrores] = useState(0);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas); 
  const [showNextButton, setShowNextButton] = useState(false);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
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


  const checkAnswer = () => {
    if (conditionFunction.toLowerCase() === 'print') {
      setOutput('¡Correcto! Has completado la estructura correctamente.');
      setScore(score + 10);
      setShowNext(true);
    } else {
      setOutput('Inténtalo de nuevo.');
    }
  };
//Verifica respuesta ejercicio
const handleVerify = async () => {
  // Validar la respuesta antes de continuar
  const userInput = conditionFunction.trim().toLowerCase();
  const correctAnswer = "print";
  const isCorrect = userInput === correctAnswer;

  setResult(isCorrect ? 'correct' : 'incorrect');
  setOutput('¡Correcto! Has completado la estructura correctamente.');
  setShowNext(isCorrect); // Mostrar o ocultar el botón "Siguiente"

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
    console.log("Respuesta del usuario obtenida:", userResponse.data);

    if (!usuario_id) throw new Error("Usuario no identificado");

    const requestData = {
      usuario: usuario_id,
      ejercicio: 118,
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
    setVidas(vidasRestantes);
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
          title: "Error",
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
            <HeaderBody />
            <div className="header-title">
              <h2>NIVEL 3</h2>
              <HeaderInfo />
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <h2>NÚMEROS NEGATIVOS</h2>
              </div>
              <div className="nivel1-card-body">
                <p>Llena el espacio en blanco con la palabra clave correcta para completar el código.</p>
              </div>
              <div className="nivel1-card-body">
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code">
                  <pre>
    {`while True:
    num = int(input("Ingresa un número (negativo para salir): "))
    if num < 0:
        break`}<br />
  <input
    type="text"
    value={conditionFunction}
    onChange={(e) => setConditionFunction(e.target.value)}
    placeholder="palabra clave"
    style={{ width: '50px' }}
  />("Programa terminado.")
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
                <button className="nivel1-card-button" onClick={handleVerify}>
                  Verificar
                </button>
                {showNext && (
                  <button className="nivel1-card-button" onClick={handleNext}>
                    Siguiente
                  </button>
                )}
                {output && (
                  <div className="code-box">
                    <div className="code-header">SALIDA</div>
                    <div className="code"><pre>{output}</pre></div>                  </div>
                )}
              </div>
            </div>
          </div>
          <Puntaje />
        </div>
      </div>
    </div>
  );
};

export default Nivel3Dieciocho;
