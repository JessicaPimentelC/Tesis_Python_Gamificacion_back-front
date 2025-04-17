import React, { useState, useEffect} from 'react';
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
import useVidasStore from "../../vidasStore";
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId } from "../../../utils/validacionesGenerales";

const Enunciado20 = () => {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0); // Estado para el puntaje
  const navigate = useNavigate(); // Hook para la redirección
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [errores, setErrores] = useState(0);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas); 

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
    const celsius = parseFloat(inputValue);
    const fahrenheit = (celsius * 9/5) + 32;

    if (!isNaN(fahrenheit)) {
      setOutput(`Temperatura en Fahrenheit: ${fahrenheit}`);
      setScore(score + 10); 
    } else {
      setOutput('Inténtalo de nuevo.');
    }
    setShowNext(true); 
  };
//Verifica respuesta ejercicio
  const handleVerify = async () => {
    const correctAnswer = "print";
    const celsius = parseFloat(inputValue);
    const fahrenheit = (celsius * 9 / 5) + 32;
    setOutput(`Temperatura en Fahrenheit: ${fahrenheit}`);
    setResult(isCorrect ? 'correct' : 'incorrect');
    setShowNext(isCorrect); 
  
    if (!isCorrect) {
      new Audio("/perder.mp3").play();
      setOutput(''); 
      return; 
    }
  
    try {
      const ejercicio_id = 20; 
  
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
              <span>Ejercicio de Conversión de Temperatura</span>
            </div>
            <div className="nivel1-card-body">
            <p>Ingresa la temperatura en Celsius para convertirla a Fahrenheit.</p>

              <div className="code-box">
                <div className="code-header">PYTHON</div>
                <div className="code">
                  <pre>
                    fahrenheit = (celsius * 9/5) + 32 <br></br>
                    print(fahrenheit)
                  </pre>
                </div>
              </div>

              <div className="input-container">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ingrese la temperatura en Celsius"
                />
              </div>

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

              {output && (
                <div className="code-box">
                  <div className="code-header">SALIDA</div>
                  <pre>{output}</pre>
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

export default Enunciado20;
