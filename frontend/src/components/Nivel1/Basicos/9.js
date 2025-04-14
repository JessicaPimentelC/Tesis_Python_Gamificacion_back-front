import React, { useState, useEffect} from 'react';
import '../../../styles/1.css'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";
import axios from "axios";
import useVidasStore from "../../vidasStore";

// Crea un objeto de audio global para su uso
const audio = new Audio('/boton.mp3');
audio.preload = 'auto';

const Nueve = () => {
  const [draggedNumber, setDraggedNumber] = useState('');
  const [result, setResult] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [output, setOutput] = useState('');
  const [score, setScore] = useState(0); // Define el estado para el puntaje
  const [currentTime] = useState(new Date().toLocaleString()); // Hora y Fecha actual
  const navigate = useNavigate(); // Hook para la redirección
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [numerosUsados, setNumerosUsados] = useState([]); // Almacena los números ya utilizados
  const [errores, setErrores] = useState(0); 
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage,setErrorMessage] = useState(null);
  const [insignias, setInsignias] = useState([]);
  const [successMessage,setSuccessMessage] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas); 
  const [showNextButton, setShowNextButton] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const csrfToken = getCSRFToken();
        const response = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, {
          headers: {
            "X-CSRFToken": csrfToken,
        },
          withCredentials: true,
        });
        setUserInfo(response.data);
        console.log("Usuario recibido:", response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error.response?.data || error.message);
      }
    };
    fetchUsuario();
  },[]);

    //obtiene el id del ejercicio

  const obtenerEjercicioId = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/myapp/ejercicio/`);
      console.log("Datos completos recibidos:", response.data);

      if (response.status === 200 && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data[0].id_ejercicio; 
      } else {
        console.error("El array de ejercicios está vacío o no tiene la estructura esperada.");
      }
    } catch (error) {
      console.error("Error al obtener los ejercicios:", error);
    }
    return null;
  };
      
        /**Guarda el ejercicio en la BD */
    const guardarEjercicioEnBD = async (usuario_id, ejercicio_id) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/myapp/guardar_ejercicio/`,
            {
                usuario_id: usuario_id,
                ejercicio_id: ejercicio_id,
                fecha_asignacion: new Date().toISOString().split("T")[0], 
            },
            { withCredentials: true }
        );
  
        console.log("Respuesta del servidor:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al guardar el ejercicio:", error.response ? error.response.data : error.message);
    }
  };
  
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
  
        // 🔹 Actualizar el estado
        setNumerosUsados((prev) => [...prev, proximoEjercicio]);
        setShowModal(false);
  
        // 🔹 Redirigir al enunciado del próximo ejercicio
        redirigirAEnunciado(proximoEjercicio, navigate);
  
      } catch (error) {
        console.error("Error al avanzar al siguiente ejercicio:", error);
        }
      } else {
        console.log("No quedan ejercicios disponibles.");
      }
    };

  const checkAnswer = () => {
    // Compara si el número arrastrado es 46
    if (draggedNumber === '46') {
      setResult('correct');
      setShowNext(true); // Muestra el botón "Siguiente"
      setOutput(draggedNumber); // Muestra el valor en la salida
      setScore(score + 10); // Incrementa el puntaje cuando sea correcto
    } else {
      setResult('incorrect');
      setShowNext(false); // Oculta el botón "Siguiente"
      setOutput(''); // Limpia la salida si la respuesta es incorrecta
    }
  };
//Verifica respuesta ejercicio
const handleVerify = async () => {
  if (!draggedNumber) {
    alert("Por favor, selecciona una palabra antes de verificar.");
    return;
}
  const isCorrectAnswer = draggedNumber === "46";
  setIsCorrect(isCorrectAnswer);

  try {
    const ejercicio_id = 9; 

    const userResponse = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, { withCredentials: true });
    const usuario_id = userResponse.data.id;
    console.log("Respuesta del usuario obtenida:", userResponse.data);

    if (!usuario_id) {
      alert("Error: Usuario no identificado.");
      return;
    }
    const requestData = {
      usuario: usuario_id,
      ejercicio: ejercicio_id,
      fecha: new Date().toISOString().split("T")[0],
      resultado: isCorrectAnswer,
      errores: isCorrectAnswer ? 0 : errores + 1,
    };
    console.log("Datos enviados:", requestData);
    const csrfToken = getCSRFToken();
    const response = await axios.post(`${API_BASE_URL}/myapp/guardar-intento/`, requestData,{
      headers: {
        "X-CSRFToken": csrfToken,
    },
        withCredentials: true,
    });
    const vidasRestantes = response.data.vidas;
    setVidas(vidasRestantes);
    if (response.status === 201) {

      if (isCorrectAnswer) {
        setShowNextButton(true);
        setScore(score + 10);
        new Audio("/ganar.mp3").play();
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

      await verificarYOtorgarLogro(usuario_id);
    } else {
      console.error("Error en la respuesta de la API:", response.data);
    }
  } catch (error) {
    console.error("Error al guardar el intento:", error.response ? error.response.data : error.message);
  }
};
  const getCSRFToken = () => {
    const cookies = document.cookie.split("; ");
    const csrfCookie = cookies.find((cookie) => cookie.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : "";
  };
//Verifica y otorga los logros
const verificarYOtorgarLogro = async (usuario_id) => {
  try {
    const csrfToken = getCSRFToken();
    const response = await axios.post(
      `${API_BASE_URL}/myapp/otorgar_logros/`,
      { usuario_id },
      { headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
    },
    withCredentials: true }
    );

    console.log("Logros verificados:", response.data);
    
    if (response.data.nuevo_logro) {
      Swal.fire({
        title: "🎉 ¡Felicidades!",
        text: `Has desbloqueado un nuevo logro: ${response.data.nuevo_logro.nombre}`,
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#007bff" 
      });        
      // Opcional: actualizar la lista de insignias en el frontend
      setInsignias((prev) => [...prev, response.data.nuevo_logro]);
    }
  } catch (error) {
    console.error("Error al verificar logros:", error.response?.data || error.message);
  }
};
//Verificar nivel
const verificarNivel = async (nivelId) => {
  const csrfToken = getCSRFToken(); // Obtener el token dinámico

    try {
        const response = await axios.post(
            `${API_BASE_URL}/myapp/verificar_nivel_completado/`,
            { nivel_id: nivelId },
            { 
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": csrfToken, // Se obtiene dinámicamente
              },  
            }
        );
        if (response.status === 200 && response.data.mensaje) {
          console.log("Respuesta de la api de verificar nivel:", response.data); 
          Swal.fire({
            title: "¡Verificación de Nivel!",
            text: response.data.mensaje,  // Mensaje que viene del backend
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#007bff" 
          });
        }
    
    } catch (error) {
        console.error("Error al verificar nivel:", error);
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
            </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
            <h2>EJERCICIO #9</h2>
            </div>
            <div className="nivel1-card-body">
              <p>Cree una variable de tipo numérico que almacene el número 46</p>
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

              <div className="options">
                <div
                  className="option"
                  draggable
                  onDragStart={() => handleDragStart('46')}
                >
                  46
                </div>
                <div
                  className="option"
                  draggable
                  onDragStart={() => handleDragStart('23')}
                >
                  23
                </div>
                <div
                  className="option"
                  draggable
                  onDragStart={() => handleDragStart('82')}
                >
                  82
                </div>
                <div
                  className="option"
                  draggable
                  onDragStart={() => handleDragStart('59')}
                >
                  59
                </div>
              </div>

              {result === 'correct' && (
                <div className="code-box">
                  <div className="code-header">SALIDA</div>
                  <input
                    type="text"
                    value={output}
                    className="code-input"
                    readOnly
                  />
                </div>
              )}

              <div className="nivel1-card-button-container">
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

export default Nueve;
