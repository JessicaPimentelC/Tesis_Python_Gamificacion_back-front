import React, { useState, useEffect } from "react";
import "../../../styles/1.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import axios from "axios";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import {obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';

const DiezNivel2 = () => {
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

  const handleNext = () => {
    const proximoEjercicio = obtenerEjercicioAleatorioEnunciado(numerosUsados);

    if (proximoEjercicio) {
        setNumerosUsados([...numerosUsados, proximoEjercicio]);
        setShowModal(false);
        redirigirAEnunciado(proximoEjercicio, navigate);
    } else {
        console.log('No quedan ejercicios disponibles.');
    }
  };

  const options = ["print", "world", "navigate"];

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

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
        );
        setScore(response.data.score);
      } catch (error) {
        console.error("Error al obtener score:", error);
      }
    };
    fetchScore();

    const fetchInsignias = async () => {
      try {
        const email = "usuario1@gmail.com";
        const response = await axios.get(
          `http://localhost:8000/myapp/insignias/?email=${email}`
        );
        setInsignias(response.data);
      } catch (error) {
        console.error("Error al obtener las insignias:", error);
      }
    };

    fetchInsignias();

    const handleClickOutside = (event) => {
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
    const isCorrectAnswer =
      (droppedItem === "print" && draggedItem === "print")
    setIsCorrect(isCorrectAnswer);

    try {
      const requestData = {
        usuario_id: 1,
        ejercicio_id: 1,
        fecha: new Date().toISOString().split("T")[0],
        resultado: isCorrectAnswer,
        errores: isCorrectAnswer ? 0 : errores + 1,
      };

      const response = await axios.post(
        "http://localhost:8000/myapp/intento/",
        requestData
      );

      if (response.status === 201) {
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

  const handleInsigniaClick = () => {
    navigate("/insignias");
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
                <span>EJERCICIO 10</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  
                  <br />
             
                  Arrastra el signo  correcto al espacio en blanco _______ en el siguiente código:
                                  </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code-area">
  <pre>
    <code>
{`contrasena_correcta = "1994*"
contrasena = input("Ingrese la contraseña: ")
if contrasena == contrasena_correcta:
    _______("Contraseña correcta. Acceso permitido.")
else:
    ______("Contraseña incorrecta. Acceso denegado.")



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

export default DiezNivel2;