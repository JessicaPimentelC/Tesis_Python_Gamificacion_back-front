import React, { useState, useEffect } from "react";
import "../../../styles/1.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import axios from "axios";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import {obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils_nivel2';
import API_BASE_URL from "../../../config";
import Swal from "sweetalert2";
import useVidasStore from "../../vidasStore";
import { verificarYOtorgarLogro, getCSRFToken, verificarNivel, guardarEjercicioEnBD, obtenerEjercicioId } from "../../../utils/validacionesGenerales";

const OnceNivel2 = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItem, setDroppedItem] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [score, setScore] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [isOpen, setIsOpen] = useState(false); // Estado para la barra lateral
  const [hoveredInsignia, setHoveredInsignia] = useState(null); // Estado para mostrar los nombres al hacer hover
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPinguino, setIsModalOpenPinguino] = useState(false);
  const [errores, setErrores] = useState(0);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const setVidas = useVidasStore((state) => state.setVidas);
  
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const csrfToken = getCSRFToken();
        console.log("token",csrfToken)
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

    const handleClickOutside = (event) => {
      // Si se hace clic fuera de los iconos, se oculta el nombre
      if (!event.target.closest(".circular-icon-container")) {
        setHoveredInsignia(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
  const options = ["aeiou", "12345", "abcde"];

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDroppedItem(draggedItem);
  };

  const handleVerify = async () => {
    if (!droppedItem) {
      alert("Por favor, selecciona una palabra antes de verificar.");
      return;
    }
    
    const isCorrectAnswer = droppedItem === "aeiou";
    setIsCorrect(isCorrectAnswer);

      try {
        const ejercicio_id = 61; 

        const userResponse = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, { withCredentials: true });
        const usuario_id = userResponse.data.id;

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
          } else {
                  setShowNextButton(false);
                  new Audio("/perder.mp3").play();
              }
  
              if (vidasRestantes === 0) {
                Swal.fire({
                  title: "Oh oh!",
                  text: `No tienes más vidas. Espera o recarga vidas`,
                  icon: "success",
                  confirmButtonText: "Aceptar",
                    confirmButtonColor: "#007bff" 
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

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModalPinguino = () => {
    setIsModalOpenPinguino(false);
  };
  const handleMouseEnter = (name) => {
    setHoveredInsignia(name);
  };

  const handleMouseLeave = () => {
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePythonIconClick = () => {
    setIsModalOpenPinguino((prevState) => !prevState);
  };

  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">
        <div className="content">
          <div className="white-background">
            <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>NIVEL 2</h2>
              <HeaderInfo></HeaderInfo>
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <span>EJERCICIO 11</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  
                  <br />
             
                  Arrastra el signo  correcto al espacio en blanco _______ en el siguiente código:
                                  </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">
  <pre>
    <code>
{`letra = input("Ingrese una letra: ")

if letra in ('_', '_', '_', '_', '_'):
    print(letra, "es una vocal.")
else:
    print(letra, "no es una vocal.")


`}
    </code>
  </pre>
</div>                </div>
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
                    ? `El operador es ${droppedItem}`
                    : "Arrastra aquí la palabra correcta"}
                </div>
                <div className="button-container">
                  <button className="nivel1-card-button" onClick={handleVerify}>
                    Verificar
                  </button>
                  {showNextButton && (
                    <button
                      className={`nivel1-card-button next-button show`}
                      onClick={handleNext}
                    >
                      Siguiente
                    </button>
                  )}
                </div>
                <div className="result-container">
                  {isCorrect !== null && (
                    <p
                      className={`result ${
                        isCorrect ? "correct" : "incorrecto"
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
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>¡Hola, soy pingui jessica!</h2>
            <p>
              Aquí podrás encontrar todas las ayudas que necesites para
              completar los ejercicios. ¡No dudes en consultarlo cuando lo
              necesites!
            </p>

            <div className="nivel1-card-header">
              <p>Seleccione una Ayuda:</p>
            </div>

            {/* Contenedor de los iconos en forma vertical */}
            <div className="modal-icons">
              <button
                className="modal-icon-button"
                onClick={() => alert("Ayuda 1: Idea")}
              >
                <img src="idea.gif" alt="Icono 1" className="modal-icon" />
              </button>

              <button
                className="modal-icon-button"
                onClick={() => alert("Ayuda 2: Apoyo")}
              >
                <img src="apoyo.gif" alt="Icono 2" className="modal-icon" />
              </button>

              <button
                className="modal-icon-button"
                onClick={() => alert("Ayuda 3: Cuaderno")}
              >
                <img src="cuaderno.gif" alt="Icono 3" className="modal-icon" />
              </button>
            </div>

            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OnceNivel2;