import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/Avances.css'; // Importa el archivo CSS

const Avances = () => {
  const navigate = useNavigate();

  // Función para navegar a challenges.js
  const handleChallengeClick = () => {
    navigate('/challenges');
  };

  // Función para navegar a Avances.js
  const handleAvancesClick = () => {
    navigate('/avances');
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <Header />

      {/* Componente de Desafíos del día */}
      <div className="desafios-container">
        <div className="header">
          <h2>Desafíos del día</h2>
          <div className="tiempo-restante">
            <img src="Despertador.png" alt="reloj" />
            <span>Cada 12 horas</span>
          </div>
        </div>

        {/* Primer desafío */}
        <div className="desafio" onClick={handleChallengeClick}>
          <div className="icono">
            <img src="objetivo.png" alt="Ejercicio 1" />
          </div>
          <div className="contenido">
            <div className="titulo">DESAFIO1</div>
            <div className="progreso">
              <div className="barra">
                <div className="progreso-barra"></div>
              </div>
            </div>
            <div className="puntos">45 puntos</div>
            <div className="cofre">
              <img src="cofre.png" alt="Cofre" />
            </div>
          </div>
        </div>

        {/* Segundo desafío */}
        <div className="desafio" onClick={handleChallengeClick}>
          <div className="icono">
            <img src="cima.png" alt="Ejercicio 2" />
          </div>
          <div className="contenido">
            <div className="titulo">DESAFIO2</div>
            <div className="progreso">
              <div className="barra">
                <div className="progreso-barra avance-85"></div>
              </div>
            </div>
            <div className="puntos">85 puntos</div>
            <div className="cofre">
              <img src="cofre.png" alt="Cofre" />
            </div>
          </div>
        </div>

        {/* Desafío bloqueado */}
        <div className="desafio bloqueado">
          <div className="icono">
            <img src="candado.png" alt="Bloqueado" />
          </div>
          <div className="contenido">
            <div className="bloqueado-texto">Bloqueado</div>
          </div>
          <div className="icono">   
            <img src="candado.png" alt="Bloqueado" />
          </div>
        </div>
      </div>

      {/* Botón de "Ver Avances" */}
      <button className="ver-avances-btn" onClick={handleAvancesClick}>
        Ver Avances
      </button>
    </div>
  );
};

export default Avances;
