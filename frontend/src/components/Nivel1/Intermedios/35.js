import React, { useState } from "react";
import "../../../styles/1.css"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	

const Treintacinco = () => {
  // Estado para manejar las opciones disponibles
  const [options, setOptions] = useState(["print","Import","Float","If"]);
  const [hoveredInsignia, setHoveredInsignia] = useState(null); // Estado para mostrar los nombres al hacer hover
  const [isModalOpenPinguino, setIsModalOpenPinguino] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [numerosUsados, setNumerosUsados] = useState([]); // Almacena los números ya utilizados

  const handleNext = () => {
    const proximoEjercicio = obtenerEjercicioAleatorioEnunciado(numerosUsados);

    if (proximoEjercicio) {
        // Actualiza el estado
        setNumerosUsados([...numerosUsados, proximoEjercicio]);
        setShowModal(false);

        // Redirige al enunciado del próximo ejercicio
        redirigirAEnunciado(proximoEjercicio, navigate);
    } else {
        console.log('No quedan ejercicios disponibles.');
    }
};

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalPinguino = () => {
    setIsModalOpenPinguino(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  // Estado para manejar el ítem arrastrado
  const [droppedItem, setDroppedItem] = useState(null);

  // Estado para manejar la verificación del resultado
  const [isCorrect, setIsCorrect] = useState(null);

  // Estado para manejar la visibilidad del botón 'Siguiente'
  const [showNextButton, setShowNextButton] = useState(false);

  // Función para manejar el evento de arrastrar
  const handleDragStart = (e, option) => {
    e.dataTransfer.setData("text/plain", option);
  };

  // Función para manejar el evento de soltar
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    setDroppedItem(data);
  };

  const navigate = useNavigate();
  // Función para verificar si la respuesta es correcta
  const handleVerify = () => {
    if (droppedItem === "print") {
      setIsCorrect(true);
      setShowNextButton(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleMouseEnter = (name) => {
    setHoveredInsignia(name); // Establece el nombre inmediatamente
  };

  const handleMouseLeave = () => {
    // No hacemos nada aquí para evitar el parpadeo
  };

  // Función para redirigir a la página de insignias
  const handleInsigniaClick = () => {
    navigate("/insignias");
  };

  const handlePythonIconClick = () => {
    console.log("Botón de Python clickeado");
    setIsModalOpenPinguino((prevState) => !prevState);
  };

  return (
    <div className="nivel1-page">
      <Sidebar />
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
                <span>EJERCICIO #1</span>
              </div>
              <div className="nivel1-card-body">
                <p>
                  En este ejercicio, debes arrastrar la función correcta para mostrar el número en binario y en hexadecimal.
                </p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">
                    <pre>
                      <code>
                        numero = int(input("Ingresa un número entero: ")) {"\n"}
                        binario = bin(numero) {"\n"}
                        hexadecimal = hex(numero) {"\n"}
                        ____("En binario:", binario) {"\n"}
                        ____("En hexadecimal:", hexadecimal)
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
                    ? `${droppedItem}()`
                    : "Arrastra aquí la función correcta"}
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
        </div>
        <Puntaje></Puntaje>
      </div>
    </div>
  );
};

export default Treintacinco;
