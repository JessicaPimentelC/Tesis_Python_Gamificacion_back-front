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

const Nivel3Veinte = () => {
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
    if (conditionFunction.toLowerCase() === 'int') {
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
  const correctAnswer = "int";
  const isCorrect = userInput === correctAnswer;

  setResult(isCorrect ? 'correct' : 'incorrect');
  setOutput('¡Correcto! Has completado la estructura correctamente.');
  setShowNext(isCorrect); // Mostrar o ocultar el botón "Siguiente"

  if (!isCorrect) {
    new Audio("/perder.mp3").play();
    return; // Si la respuesta es incorrecta, no continuar con la solicitud
  }

  try {
    const ejercicio_id = 120; 

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
                <h2>EJERCICIO 20 - SUMA DE NÚMEROS PARES</h2>
              </div>
              <div className="nivel1-card-body">
                <p>Llena el espacio en blanco con la palabra clave correcta para completar el código.</p>
              </div>
              <div className="nivel1-card-body">
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code">
                  <pre>
                    {`num = `}
                    <input
                      type="text"
                      value={conditionFunction}
                      onChange={(e) => setConditionFunction(e.target.value)}
                      placeholder="palabra clave"
                    />
                    {`(input("Ingresa un número: ")) 
suma = 0
for num in range(2, num + 1, 2):
    suma += num
print("La suma es", suma)`}
                  </pre>
                  </div>
                </div>
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

export default Nivel3Veinte;
