import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Examen.css';
import Header from './Header';

function Examen() {
  const navigate = useNavigate();

  const startExam = () => {
    navigate('/examennivel1'); // Navegar al módulo Examennivel1
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
  <h1>EXAMEN FINAL NIVEL 1</h1>

  <div className="exam-instructions">
    <h2>INSTRUCCIONES PARA EL EXAMEN FINAL</h2>
    <ul>
      <li>
        <strong >⏳ Tiempo límite: </strong> Tienen <strong>30 minutos</strong> para completar el examen. Administra tu tiempo sabiamente.
      </li>
      <li>
        <strong>📋 Formato del examen: </strong> Cada pregunta tiene cuatro opciones de respuesta (<strong>A, B, C, D</strong>). Solo una es correcta.
      </li>
      <li>
        <strong>✅ Método de respuesta: </strong> Selecciona la opción correcta en el sistema digital.
      </li>
      <li>
        <strong>📊 Cálculo del puntaje: </strong> Al finalizar el examen, recibirás tu resultado final basado en tus respuestas.
      </li>
    </ul>

    <p>
      💡 <strong>Consejo: </strong> Lee bien cada pregunta antes de responder y asegúrate de marcar la opción correcta. ¡Mucho éxito! 🎯
    </p>

  <button className="start-exam" onClick={startExam}>Iniciar Examen</button>
  <span className="tooltip-text">¡Buena Suerte! 🍀</span>
</div>
      </main>
    </div>
  );
}

export default Examen;
