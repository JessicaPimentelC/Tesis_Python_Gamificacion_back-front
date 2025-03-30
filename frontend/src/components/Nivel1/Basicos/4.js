import React, { useState, useEffect } from 'react';
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

const Cuatro = () => {
  const [droppedWords, setDroppedWords] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();
  const [numerosUsados, setNumerosUsados] = useState([]); // Almacena los números ya utilizados
  const [showModal, setShowModal] = useState([]); // Almacena los números ya utilizados
  const [errores, setErrores] = useState(0);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas

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
  useEffect(() => {
    const now = new Date();
    const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.toLocaleDateString()}`;
    setCurrentTime(formattedTime);
  }, []);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (!droppedWords.includes(data)) {
      setDroppedWords([...droppedWords, data]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkAnswer = () => {
    if (droppedWords.includes('print')) {
      setScore(score + 10);
      setShowNext(true);
      setErrorMessage("");
      setSuccessMessage("¡Correcto!"); // Mostrar mensaje de éxito
    } else {
      setErrorMessage('Inténtalo de nuevo');
      setShowNext(false);
      setSuccessMessage(""); // Limpiar mensaje de éxito
    }
  };

  const handleInsigniaClick = () => {
    navigate('/insignias');
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
            <h2>EJERCICIO #4</h2>
            </div>
            <div className="nivel1-card-body">
              <p>Arrastra la palabra correcta al cuadro de código y verifica tu respuesta.</p>
            </div>
              <div className="code-box"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="code-header">Código:</div>
                <div className="code">
                  {droppedWords.includes('print') ? 'print("70 / 2")' : '______("70 / 2")'}
                </div>
              </div>

              <div className="draggable-words">
                <div
                  id="print"
                  className="draggable-word"
                  draggable
                  onDragStart={handleDragStart}
                >
                  print
                </div>
                <div
                  id="else"
                  className="draggable-word"
                  draggable
                  onDragStart={handleDragStart}
                >
                  else
                </div>
                <div
                  id="customWord"
                  className="draggable-word"
                  draggable
                  onDragStart={handleDragStart}
                >
                  While
                </div>
              </div>

              <div className="nivel1-card-button-container">
                <button className="nivel1-card-button" onClick={checkAnswer}>
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

              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}
            </div>
          </div>
          <Puntaje></Puntaje>
        </div>
      </div>
    </div>
  );
};

export default Cuatro;
