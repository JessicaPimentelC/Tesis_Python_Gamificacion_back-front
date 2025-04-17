import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/1.css'; // Asegúrate de que la ruta sea correcta
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

const Diecinueve = () => {
  const [celsiusInput, setCelsiusInput] = useState('');
  const [printInput, setPrintInput] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate(); // Hook para la redirección
  const audioRef = useRef(null); // Referencia al elemento de audio
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
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCurrentTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
  }, []);

  const checkAnswer = () => {
    const correctPrintInput = 'print';

    if (printInput.trim() === correctPrintInput) {
      const celsius = parseFloat(celsiusInput);
      const fahrenheit = (celsius * 9 / 5) + 32;
      setOutput(`La temperatura en Fahrenheit es: ${fahrenheit.toFixed(2)}`);
      setShowNext(true);
      setScore(score + 10); // Ejemplo: aumenta el puntaje en 10 puntos
    } else {
      setOutput('Inténtalo de nuevo.');
    }
  };
  //Verifica respuesta ejercicio
  const handleVerify = async () => {
    // Validar la respuesta antes de continuar
    const userInput = printInput.trim().toLowerCase();
    const correctAnswer = "print";
    const isCorrect = userInput === correctAnswer;
    const celsius = parseFloat(celsiusInput);
    const fahrenheit = (celsius * 9 / 5) + 32;
    setOutput(`La temperatura en Fahrenheit es: ${fahrenheit.toFixed(2)}`);
    setResult(isCorrect ? 'correct' : 'incorrect');
    setShowNext(isCorrect); // Mostrar o ocultar el botón "Siguiente"
  
    if (!isCorrect) {
      new Audio("/perder.mp3").play();
      setOutput(''); // Limpia la salida si la respuesta es incorrecta
      return; // Si la respuesta es incorrecta, no continuar con la solicitud
    }
  
    try {
      const ejercicio_id = 19; 
  
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
  const handleShowModal = () => {
    setShowModal(true); // Muestra el modal
    if (audioRef.current) {
      audioRef.current.play(); // Reproduce el sonido cuando se muestra el modal
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/examen'); // Redirige al módulo Examen después de cerrar el modal
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
          </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span>Conversión de Temperatura</span>
            </div>
            <div className="nivel1-card-body">
            <p>En este ejercicio, debes completar el código para convertir una temperatura de grados Celsius a Fahrenheit. Completa el campo con la función correcta para imprimir el resultado.</p>

              <div className="code-box">
                <div className="code-header">PYTHON</div>
                <div className="code">
                  <pre>
                    celsius = float(input("Ingresa la temperatura en grados Celsius: "))<br />
                    fahrenheit = (celsius * 9/5) + 32<br />
                    <input
                      type="text"
                      value={printInput}
                      onChange={(e) => setPrintInput(e.target.value)}
                      placeholder="funcion"
                      style={{ width: '100px', marginRight: '5px' }}
                    />
                    ("La temperatura en Fahrenheit es:", fahrenheit)
                  </pre>
                </div>
              </div>

              <input
                type="number"
                value={celsiusInput}
                onChange={(e) => setCelsiusInput(e.target.value)}
                placeholder="Ingresa grados Celsius"
                style={{ width: '250px', marginTop: '10px' }}
              />

              <button className="nivel1-card-button" onClick={handleVerify}>
                Verificar
              </button>
              {showNext && (
                <button
                  className="nivel1-card-button"
                  onClick={handleNext} // Llama a la función que muestra el modal y reproduce el sonido
                >
                  Siguiente
                </button>
              )}

              {output && (
                <div className="code-box">
                  <div className="code-header">SALIDA</div>
                  <div className='code'>
                  <pre>{output}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Puntaje></Puntaje>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¡Bien hecho!</h2>
            <p>¡Excelente! Ahora que has completado este ejercicio, estás listo para pasar al siguiente. ¡Vamos al examen y demostremos lo que aprendimos!</p>
            <img src="Ntx5.gif" alt="GIF de bienvenida" className="modal-gif" />
            <button className="modal-close-button" onClick={handleCloseModal}>
              Continuar al Examen
            </button>
          </div>
        </div>
      )}

      {/* Audio */}
      <audio ref={audioRef} src="examen.mp3" />
    </div>
  );
};

export default Diecinueve;
