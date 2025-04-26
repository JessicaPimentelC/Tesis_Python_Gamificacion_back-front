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

const Treinta = () => {
  const [options, setOptions] = useState(["=", "<>", "*", "''"]);
  const [hoveredInsignia, setHoveredInsignia] = useState(null); // Estado para mostrar los nombres al hacer hover
  const [isModalOpenPinguino, setIsModalOpenPinguino] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [numerosUsados, setNumerosUsados] = useState([]); // Almacena los números ya utilizados
  const [score, setScore] = useState(0);
  const [errores, setErrores] = useState(0); 
  const [successMessage,setSuccessMessage] = useState(null);
  const [errorMessage,setErrorMessage] = useState(null);
  const [insignias, setInsignias] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas);
  const [result, setResult] = useState(null);
  const [output, setOutput] = useState('');
  const navigate = useNavigate();

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

  const [droppedItem, setDroppedItem] = useState(null);

  const [isCorrect, setIsCorrect] = useState(null);

  const [showNextButton, setShowNextButton] = useState(false);

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData("text/plain", option);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    setDroppedItem(data);
  };



//Verifica respuesta ejercicio
const handleVerify = async () => {
  if (!droppedItem) {
    alert("Por favor, selecciona una palabra antes de verificar.");
    return;
}

  const isCorrect = droppedItem === "=";

  setIsCorrect(isCorrect);

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
      ejercicio: 30,
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
    <div className="nivel1-page">
      <Sidebar />
      <div className="nivel1-container">
        <div className="content">
          <div className="white-background">
            <HeaderBody></HeaderBody>
            <div className="header-title">
            <h1>NIVEL 1</h1>
            <HeaderInfo></HeaderInfo>
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
              <span>EJERCICIO #30</span>

              </div>
              <div className="nivel1-card-body">
                <p>
                  En este ejercicio, debes identificar el signo correcto para
                  completar el siguiente código y hacer que se imprima un mensaje con las variables.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">
                    <pre>
                      <code>
                        variable1 ___ "Hola mundo"{"\n"}
                        variable2 ___ 100{"\n"}
                        print(variable1, variable2)
                      </code>
                    </pre>
                  </div>
                </div>
                <div className="drag-container">
                  {options.map((option) => (
                    <div
                      key={option}
                      className="drag-option"
                      draggable
                      onDragStart={(e) => handleDragStart(e, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div
                  className="drop-zone"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {droppedItem
                    ? `("${droppedItem}")`
                    : "Arrastra aquí el signo correcto"}
                </div>
                <div className="button-container">
                  <button className="nivel1-card-button" onClick={handleVerify}>
                    Verificar
                  </button>
                  {showNextButton && (
                    <button
                      className="nivel1-card-button next-button show"
                      onClick={handleNext}
                    >
                      Siguiente
                    </button>
                  )}
                </div>
                <div className="result-container">
                  {isCorrect !== null && (
                    <p
                      className={`result ${isCorrect ? "correct" : "incorrect"}`}
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

export default Treinta;
