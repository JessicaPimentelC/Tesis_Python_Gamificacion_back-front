import React, { useState, useEffect} from 'react';
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
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId } from "../../../utils/validacionesGenerales";

const Dos = () => {
  const [input1, setInput1] = useState('');
  const [showNext, setShowNext] = useState(false);
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]); // Almacena los números ya utilizados
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas); // Asegúrate de que este acceso es correcto
  const [errores, setErrores] = useState(0);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
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
  
//Verifica respuesta ejercicio
const handleVerify = async () => {
  // Validar la respuesta antes de continuar
  const userInput = input1.trim().toLowerCase();
  const correctAnswer = "75";
  const isCorrect = userInput === correctAnswer;

  setResult(isCorrect ? 'correct' : 'incorrect');
  setShowNext(isCorrect); // Mostrar o ocultar el botón "Siguiente"

  if (!isCorrect) {
    new Audio("/perder.mp3").play();
    return; // Si la respuesta es incorrecta, no continuar con la solicitud
  }

  try {
    const ejercicio_id = 2; 

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
              <span>EJERCICIO #2</span>
            </div>
            <div className="nivel1-card-body">
              <p>
              Completa el siguiente código en Python para que funcione correctamente. El codigo debe imprimir el número 75
              </p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code">
                  <code>
                  <pre>
                    <code>
                      print(" <input
                        type="text"
                        value={input1}
                        onChange={(e) => setInput1(e.target.value)}
                        className="code-input-inline"
                      />{' '}")
                    </code>
                  </pre>
                  </code>
                </pre>
              </div>
              <div className="nivel1-card-button-container">
                <button className="nivel1-card-button" onClick={handleVerify}>
                  Verificar
                </button>
                {showNext && (
                  <button
                    className="nivel1-card-button"
                    onClick={handleNext}
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

export default Dos;
