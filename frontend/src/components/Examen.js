import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Examen.css';
import Sidebar from './Sidebar';
import Header from './Header';

function Examen() {
  const navigate = useNavigate();

  const startExam = () => {
    navigate('/examennivel1'); // Navigate to Examennivel1 module
  };

  return (
    <div className="app-container">
      <Sidebar></Sidebar>
      <Header></Header>
      <main className="main-content">
        <h1>Bienvenidos al Examen Final</h1>
        <div className="exam-instructions">
          <p>Instrucciones para el examen...</p>
        </div>
        <button className="start-exam" onClick={startExam}>Iniciar Examen</button>
      </main>
    </div>
  );
}

export default Examen;
