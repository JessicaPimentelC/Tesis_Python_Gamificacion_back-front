import React, { useState, useEffect } from 'react'; // Asegúrate de incluir useEffect
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";
import axios from "axios";
import useVidasStore from "../../vidasStore";
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId, refreshAccessToken } from "../../../utils/validacionesGenerales";
import { fetchUserInfo } from '../../../utils/userService';

const Once = () => {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [insignias, setInsignias] = useState(0); // Estado para las insignias
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate(); // Hook para la redirección
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [errores, setErrores] = useState(0);
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [errorMessage, setErrorMessage ] = useState(null);
  const [succesMessage , setSuccessMessage] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas); 

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
    

  // Función para actualizar la hora y fecha
  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleString()); // Ajusta el formato según tus necesidades
  };

  useEffect(() => {
    updateTime();

    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const checkAnswer = () => {
    const estatura = parseFloat(inputValue);
    if (!isNaN(estatura)) {
      setOutput(estatura);
      setShowNext(true);
      setScore(score + 10);
    } else {
      setOutput('Por favor, ingrese un número válido.');
      setShowNext(false);
    }
  };

  //Verifica respuesta ejercicio
    const handleVerify = async () => {
      const userInput = inputValue.trim();
  
      if (!userInput) {
        setErrorMessage("No puedes dejar la respuesta vacía.");
        setSuccessMessage("");
        setIsCorrect(false);
        setShowNext(false);
        return;
      }

      const estatura = parseFloat(userInput);
      if (isNaN(estatura)) {
        setErrorMessage("Por favor ingresa un número válido (ej. 1.75)");
        setSuccessMessage("");
        setIsCorrect(false);
        setShowNext(false);
        return;
      }
      setIsCorrect(true);
      setOutput(estatura.toString());
      setErrorMessage("");
      setSuccessMessage("¡Número válido!");
      setShowNext(true);
      const isCorrect = true; 


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
          ejercicio: 11,
          fecha: new Date().toISOString().split("T")[0],
          resultado: true,
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
            setShowNext(true);
            setScore(score + 10);
            new Audio("/ganar.mp3").play();
          }else {
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
      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>NIVEL 1</h2>
            </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
            <h2>EJERCICIO #11</h2>
            </div>
            <div className="nivel1-card-body">
              <p>Ingrese su estatura en el campo de abajo y presione "verificar".</p>
            </div>
            <div className="nivel1-card-body">
              <div className="code-box">
                <div className="code-header">PYTHON</div>
                <div className="code">
                  <pre>
                    estatura = float(input(<span className="input-text">"Ingrese su estatura: "</span>))<br />
                    print(estatura)
                  </pre>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ingrese su estatura"
                    className="code-input-inline"
                  />
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

export default Once;
