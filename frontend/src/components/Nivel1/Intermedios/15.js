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
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId, refreshAccessToken } from "../../../utils/validacionesGenerales";
import { fetchUserInfo } from '../../../utils/userService';

const Quince = () => {
  const [centimetros, setCentimetros] = useState('');
  const [printFunction, setPrintFunction] = useState('');
  const [output, setOutput] = useState('');
  const [errores, setErrores] = useState(0); 
  const [successMessage,setSuccessMessage] = useState(null);
  const [errorMessage,setErrorMessage] = useState(null);
  const [insignias, setInsignias] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas);
  const [showNextButton, setShowNextButton] = useState(false);
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate(); // Hook para la redirección
  const [score, setScore] = useState(0); // Estado para el puntaje

 
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

  // Actualiza la hora y fecha al cargar el componente
  useEffect(() => {
    updateTime();

    // Actualiza la hora y fecha cada minuto
    const intervalId = setInterval(updateTime, 60000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);


  const checkAnswer = () => {
    // Lógica del ejercicio: convierte centímetros a metros
    const centimetrosValue = parseFloat(centimetros);

    // Validar que el valor ingresado en centímetros sea un número válido
    if (isNaN(centimetrosValue) || centimetrosValue === '') {
      setOutput('1.0');
      return;
    }

    // Realizar la conversión de centímetros a metros
    const correctMeters = centimetrosValue / 100;

    // Verifica si los campos son correctos
    if (
      printFunction.trim() === 'print' && // Verificar que se haya ingresado 'print'
      centimetrosValue === 100 // Verificar que el valor de centímetros es 100
    ) {
      setOutput(`¡Correcto! La conversión es: ${correctMeters} metros`);
      setScore(score + 10); // Incrementa el puntaje si la respuesta es correcta
      setShowNext(true); // Muestra el botón de siguiente
    } else {
      setOutput('Inténtalo de nuevo. Asegúrate de que la función y el valor son correctos.');
    }
  };

//Verifica respuesta ejercicio
const handleVerify = async () => {
  if (!printFunction || !centimetros) {
    setErrorMessage("No puedes dejar la respuesta vacía.");
    setSuccessMessage("");
    setShowNext(false);
    return;
  }
  const centimetrosValue = parseFloat(centimetros);   

    // Validar que el valor ingresado en centímetros sea un número válido
  if (isNaN(centimetrosValue)) {
    setOutput("1.0");
    setErrorMessage("Debes ingresar un número válido.");
    setShowNext(false);
    return;
  }
  // Realizar la conversión de centímetros a metros
  const correctMeters = centimetrosValue / 100;

  // Verificar si la respuesta es correcta
  const isCorrect = printFunction.trim() === "print" && centimetrosValue === 100;

  setOutput(`¡Correcto! La conversión es: ${correctMeters} metros`);
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
      ejercicio: 15,
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
    <div className="nivel1-container">
      <Sidebar></Sidebar>
      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>nivel 1</h2>
              <HeaderInfo></HeaderInfo>
            </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span>Ejercicio de Conversión de Unidades</span>
            </div>
            <div className="nivel1-card-body">
            <p>Llena los espacios en blanco para completar el código que convierte centímetros a metros.</p>

              <div className="code-box">
                <div className="code-header">PYTHON</div>
                <pre className="code">
                    centimetros = <input
                      type="text"
                      value={centimetros}
                      onChange={(e) => setCentimetros(e.target.value)}
                      placeholder="en centimetros"
                    />
                    <br />
                    metros = centimetros / 100<br />
                    <input
                      type="text"
                      value={printFunction}
                      onChange={(e) => setPrintFunction(e.target.value)}
                      placeholder="funcion"
                    />
                    (metros)
                  </pre>
              </div>
              <div className="button-container">

              <button className="nivel1-card-button" onClick={handleVerify}>
                Verificar
              </button>
              {showNext && (
                <button
                  className="nivel1-card-button"
                  onClick={handleNext} // Ajusta la ruta según sea necesario
                >
                  Siguiente
                </button>
              )}
              </div>
              {/* Mostrar el resultado aquí */}
              {output && (
                <div className="code-box">
                  <div className="code-header">SALIDA</div>
                  <div className="code"><pre>{output}</pre></div>
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

export default Quince;
