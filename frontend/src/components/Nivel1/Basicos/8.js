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

const Ocho = () => {
  const [inputValue, setInputValue] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [output, setOutput] = useState('');
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [currentTime] = useState(new Date().toLocaleString()); // Hora y Fecha actual
  const navigate = useNavigate(); // Hook para la redirección
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [errores, setErrores] = useState(0);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas); 
  const [showNextButton, setShowNextButton] = useState(false);
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
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
    // Compara si el texto ingresado es "programacion"
    if (inputValue === 'programacion') {
      setResult('correct');
      setShowNext(true); // Muestra el botón "Siguiente"
      setOutput(inputValue); // Muestra el valor ingresado en la salida
      setScore(score + 10); // Incrementa el puntaje cuando sea correcto
    } else {
      setResult('incorrect');
      setShowNext(false); // Oculta el botón "Siguiente"
      setOutput(''); // Limpia la salida si la respuesta es incorrecta
    }
  };
//Verifica respuesta ejercicio
  const handleVerify = async () => {
    // Validar la respuesta antes de continuar
    const userInput = inputValue.trim().toLowerCase();
    const correctAnswer = "programacion";
    const isCorrect = userInput === correctAnswer;
    setOutput(inputValue); // Muestra el valor ingresado en la salida

    setResult(isCorrect ? 'correct' : 'incorrect');
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
        ejercicio: 8,
        fecha: new Date().toISOString().split("T")[0],
        resultado: isCorrect,
        errores: isCorrect ? 0 : errores + 1,
      };
  
      console.log("Datos enviados:", requestData);
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
            <h2>EJERCICIO #8</h2>
            </div>
            <div className="nivel1-card-body">
              <p>Cree una variable de tipo texto que almacene la palabra “programacion”</p>
            </div>
            <div className="nivel1-card-body">
              <div className="code-box">
                <div className="code-header">PYTHON</div>
                <div className="code">
                  <pre>
                    variable = "
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="code-input-inline"
                      placeholder="Ingrese la palabra"
                    />
                    "
                  </pre>
                </div>
              </div>

              {result === 'correct' && (
                <div className="code-box">
                  <div className="code-header">SALIDA</div>
                  <input
                    type="text"
                    value={output}
                    className="code-input-inline"
                    readOnly
                  />
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
                {showNext && (
                  <button
                    className="nivel1-card-button"
                    onClick={handleNext} // Ajusta el número de vista siguiente si es necesario
                  >
                    Siguiente
                  </button>
                )}
              </div>
              {result && (
                <div className={`result ${result}`}>
                  {result === 'correct' ? 'Correcto' : 'Inténtalo de nuevo'}
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

export default Ocho;
