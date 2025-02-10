import React, { useState, useEffect } from "react";
import "../../../styles/1.css";
import { useNavigate } from "react-router-dom";
import HeaderBody from "../../HeaderBody";
import axios from "axios";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import {verificarYOtorgarInsignia,obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';
import SidebarToggle from "../../SidebarToggle";
import Sidebar from "../../Sidebar";

const Uno = () => {
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
  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNext = () => {
    const proximoEjercicio = obtenerEjercicioAleatorioEnunciado();

    if (proximoEjercicio) {
        // Actualiza el estado
        setNumerosUsados([...numerosUsados, proximoEjercicio]);
        setShowModal(false);

        // Redirige al enunciado del próximo ejercicio
        redirigirAEnunciado(proximoEjercicio, navigate);
        verificarYOtorgarInsignia([...numerosUsados, proximoEjercicio], setInsignias);
    } else {
        console.log('No quedan ejercicios disponibles.');
    }
};
  const options = ["Mundo", "Hola", "Eduardo"];

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModalPinguino = () => {
    setIsModalOpenPinguino(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDroppedItem(draggedItem);
  };
  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/myapp/score/1"
        ); // Reemplaza "1" con el ID del usuario actual
        setScore(response.data.score);
      } catch (error) {
        console.error("Error al obtener score:", error);
      }
    };
    fetchScore();

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

  const handleVerify = async () => {
    const isCorrectAnswer = droppedItem === "Mundo";
    setIsCorrect(isCorrectAnswer);

    try {
      const requestData = {
        usuario_id: 1,
        ejercicio_id: 1,
        fecha: new Date().toISOString().split("T")[0], // Fecha actual en formato 'YYYY-MM-DD'
        resultado: isCorrectAnswer, // True o False dependiendo si es correcto
        errores: isCorrectAnswer ? 0 : errores + 1, // Incrementar errores si la respuesta es incorrecta
      };

      // Realizar la petición POST con axios
      const response = await axios.post(
        "http://localhost:8000/myapp/intento/",
        requestData
      );

      if (response.status === 201) {
        // 201 significa que se creó correctamente
        if (isCorrectAnswer) {
          setShowNextButton(true);
          setScore(score + 10);
          new Audio("/ganar.mp3").play();
        } else {
          setShowNextButton(false);
          new Audio("/perder.mp3").play();
        }
      } else {
        console.error("Error en la respuesta de la API:", response.data);
      }
    } catch (error) {
      console.error(
        "Error al guardar el intento:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Función para redirigir a la página de insignias
  const handleInsigniaClick = () => {
    navigate("/insignias");
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };
  const closeModalPinguino = () => {
    setIsModalOpenPinguino(false); // Cerrar el modal
  };
  const handleMouseEnter = (name) => {
    setHoveredInsignia(name); // Establece el nombre inmediatamente
  };

  const handleMouseLeave = () => {
    // No hacemos nada aquí para evitar el parpadeo
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  const handlePythonIconClick = () => {
    console.log("Botón de Python clickeado"); // Para verificar el clic
    setIsModalOpenPinguino((prevState) => !prevState); // Alterna el estado del modal
  };
 
  return (
    <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">
        {/* Contenedor principal con el cuadro de información y el contenido principal */}
        <div className="content">
          {/* Sección principal con el ejercicio */}
          <div className="white-background">
            <HeaderBody></HeaderBody>
            <div className="header-title">
              <h2>NIVEL 1</h2>
              <HeaderInfo></HeaderInfo>
            </div>
            <div className="nivel1-card">
              <div className="nivel1-card-header">
                <span>EJERCICIO #1</span>
              </div>
              <div className="nivel1-card-body-ejer1">
                <p>
                  A continuación, te presentamos nuestro primer ejercicio de
                  nivel 1. El ejercicio consiste en identificar la palabra
                  correcta en relación con el siguiente enunciado. ¡Buena
                  suerte!
                  <br />
                  <br />
                  Por favor, arrastra la palabra que falta en el código para
                  poder imprimir “Hola, Mundo:”
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code-content">
                    <pre>
                      <code>print("Hola, ________!")</code>
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
                    ? `print("Hola, ${droppedItem}!")`
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
                        isCorrect ? "correct" : "incorrect"
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
    </div>
  );
};

export default Uno;
