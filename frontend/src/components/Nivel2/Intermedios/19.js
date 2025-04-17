import React, { useState, useEffect } from 'react';
import '../../../styles/1.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Puntaje from '../../Puntaje';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';
import {obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils_nivel2';
import Swal from "sweetalert2";
import API_BASE_URL from "../../../config";
import axios from "axios";
import useVidasStore from "../../vidasStore";
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId } from "../../../utils/validacionesGenerales";

const Nivel2Diecinueve= () => {
  const [elifFunction, setElifFunction] = useState('');
  const [output, setOutput] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas); 
  const [showNextButton, setShowNextButton] = useState(false);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [errores, setErrores] = useState(0);

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
    if (elifFunction.toLowerCase() === 'elif') {
      setOutput('¡Correcto! La estructura condicional elif es la correcta.');
      setScore(score + 10);
    } else {
      setOutput('Inténtalo de nuevo.');
    }
    setShowNext(true);
  };
//Verifica respuesta ejercicio
const handleVerify = async () => {
  // Validar la respuesta antes de continuar
  const userInput = elifFunction.trim().toLowerCase();
  const correctAnswer = "elif";
  const isCorrect = userInput === correctAnswer;

  setResult(isCorrect ? 'correct' : 'incorrect');
  setOutput('¡Correcto! La estructura condicional elif es la correcta.');
  setShowNext(isCorrect); // Mostrar o ocultar el botón "Siguiente"

  if (!isCorrect) {
    new Audio("/perder.mp3").play();
    return; // Si la respuesta es incorrecta, no continuar con la solicitud
  }

  try {
    const ejercicio_id = 69; 

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
      <Sidebar />
      <div className="nivel1-container">
        <div className="content">
          <div className="white-background">
            <HeaderBody />
            <div className="header-title">
              <h2>NIVEL 1</h2>
              <HeaderInfo />
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <h2>EJERCICIO 19</h2>
              </div>
              <div className="nivel1-card-body">
                <p>Llena los espacios en blanco para completar la estructura condicional.</p>
              </div>
              <div className="nivel1-card-body">
                <div className="code-box">
                  <div className="code-header">PYTHON</div>
                  <div className="code">
                    <pre>
                      num1 = int(input("Ingresa primer número: ")) <br />
                      num2 = int(input("Ingresa segundo número: ")) <br />
                      opcion = int(input("Seleccione la opción que desea \n 1.Suma \n 2.Resta \n 3.Multiplicación \n 4.División \n")) <br />
                      if opcion == 1: <br />
                      {'  '}suma = num1 + num2 <br />
                      {'  '}print("El resultado es", suma) <br />
                      <input
                        type="text"
                        value={elifFunction}
                        onChange={(e) => setElifFunction(e.target.value)}
                        placeholder="palabra clave"
                      />
                      {' opcion == 2:'} <br />
                      {'  '}resta = num1 - num2 <br />
                      {'  '}print("El resultado es", resta) <br />
                      <input
                        type="text"
                        value={elifFunction}
                        onChange={(e) => setElifFunction(e.target.value)}
                        placeholder="palabra clave"
                      />
                      {' opcion == 3:'} <br />
                      {'  '}multiplicacion = num1 * num2 <br />
                      {'  '}print("El resultado es", multiplicacion) <br />
                      else: <br />
                      {'  '}division = num1 / num2 <br />
                      {'  '}print("El resultado es", division) <br />
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

export default Nivel2Diecinueve;
