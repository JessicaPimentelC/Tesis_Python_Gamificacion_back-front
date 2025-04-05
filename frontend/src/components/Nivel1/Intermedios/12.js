import React, { useState, useEffect } from 'react';
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";
import axios from "axios";

const Doce = () => {
  const [inputFunction, setInputFunction] = useState('');
  const [printFunction, setPrintFunction] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate(); // Hook para la redirección
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [vidas, setVidas] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [errores, setErrores] = useState(0);
  const [successMessage,setSuccessMessage] = useState(null);
  const [errorMessage,setErrorMessage] = useState(null);
  const [insignias, setInsignias] = useState([]);
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
    if (inputFunction === 'input' && printFunction === 'print') {
      setOutput(`¡Correcto! Hola, ${inputFunction}`);
      setScore(score + 10); // Incrementa el puntaje si la respuesta es correcta
    } else {
      setOutput('Inténtalo de nuevo.');
    }
    setShowNext(true); // Muestra el botón de siguiente
  };
//Verifica respuesta ejercicio
  const handleVerify = async () => {
    if (!inputFunction || !printFunction) { 
      setErrorMessage("No puedes dejar la respuesta vacía.");
      setSuccessMessage("");
      setShowNext(false);
      return;
    }
  
    const isCorrect = inputFunction === 'input' && printFunction === 'print';
  
    setOutput(`¡Correcto! Hola, ${inputFunction}`);
    setResult(isCorrect ? 'correct' : 'incorrect');
    setShowNext(isCorrect); // Muestra u oculta el botón "Siguiente"
  
    if (!isCorrect) {
      new Audio("/perder.mp3").play();
      setOutput(''); // Limpia la salida si la respuesta es incorrecta
      return; // Si la respuesta es incorrecta, no continuar con la solicitud
    }
  
    try {
      const ejercicio_id = 12; 
  
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
        resultado: isCorrect,
        errores: isCorrect ? 0 : errores + 1,
      };
  
      console.log("Datos enviados:", requestData);
      const response = await axios.post(`${API_BASE_URL}/myapp/guardar-intento/`, requestData);
  
      if (response.status === 201) {
  
        const vidasRestantes = response.data.vidas;
        setVidas(vidasRestantes);
  
        if (isCorrect) {
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
  
  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
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
            <h2>EJERCICIO #12</h2>
            </div>
            <div className="nivel1-card-body">
              <p>Llena los espacios en blanco para completar el saludo.</p>
            </div>
            <div className="nivel1-card-body">
              <div className="code-box">
                <div className="code-header">PYTHON</div>
                <div className="code">
                  <pre>
                    nombre ={' '}
                    <input
                      type="text"
                      value={inputFunction}
                      onChange={(e) => setInputFunction(e.target.value)}
                      placeholder="funcion"
                    />
                    ("¿Cómo te llamas?")<br />
                    <input
                      type="text"
                      value={printFunction}
                      onChange={(e) => setPrintFunction(e.target.value)}
                      placeholder="funcion"
                    />
                    ("Hola, " + nombre)
                  </pre>
                </div>
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

              {output && (
                <div className="code-box">
                  <div className="code-header">SALIDA</div>
                  <div className="code">
                  <pre>{output}</pre>
                  </div>
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

export default Doce;
