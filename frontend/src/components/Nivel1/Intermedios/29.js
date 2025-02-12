import React, { useState } from "react";
import "../../../styles/1.css"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import HeaderBody from "../../HeaderBody";
import HeaderInfo from "../../HeaderInfo";
import Puntaje from "../../Puntaje";
import { obtenerEjercicioAleatorioEnunciado, redirigirAEnunciado } from '../../../utils/utils';	

const Veintiocho = () => {
  const [options, setOptions] = useState(["=","/","*"]); // Solo tenemos el signo "=" como opción
  const [hoveredInsignia, setHoveredInsignia] = useState(null);
  const [isModalOpenPinguino, setIsModalOpenPinguino] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const openModalPinguino = () => setIsModalOpenPinguino(true);
  const closeModal = () => setIsModalOpen(false);
  const [droppedItem, setDroppedItem] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
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

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData("text/plain", option);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    setDroppedItem(data);
  };

  const navigate = useNavigate();
  
  const handleVerify = () => {
    if (droppedItem === "=") {
      setIsCorrect(true);
      setShowNextButton(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleMouseEnter = (name) => {
    setHoveredInsignia(name);
  };

  const handleMouseLeave = () => {};

  const handleInsigniaClick = () => {
    navigate("/insignias");
  };

  const handlePythonIconClick = () => {
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
              <div className="nivel1-card-body-ejer1">
                <p>En este ejercicio, debes arrastrar el signo correcto para completar el siguiente código:</p>
                <div className="code-box">
                  <div className="code-header">Python</div>
                  <div className="code">
                    <pre>
                      <code>
                        variable1 = "Hola mundo"{"\n"}
                        variable2 = 100{"\n"}
                        ______(variable1, variable2)
                      </code>
                    </pre>
                  </div>
                </div>
                <div className="drag-container">
                  {options.map((option) => (
                    <div key={option} className="drag-option" draggable onDragStart={(e) => handleDragStart(e, option)}>
                      {option}
                    </div>
                  ))}
                </div>
                <div className="drop-zone" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                  {droppedItem ? `(${droppedItem})` : "Arrastra aquí el signo igual"}
                </div>
                <div className="button-container">
                  <button className="nivel1-card-button" onClick={handleVerify}>
                    Verificar
                  </button>
                  {showNextButton && (
                    <button className="nivel1-card-button next-button show" onClick={handleNext}>
                      Siguiente
                    </button>
                  )}
                </div>
                <div className="result-container">
                  {isCorrect !== null && (
                    <p className={`result ${isCorrect ? "correct" : "incorrect"}`}>
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

export default Veintiocho;
