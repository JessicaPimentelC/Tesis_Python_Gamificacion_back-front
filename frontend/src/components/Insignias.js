import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Insignias.css";

const Insignias = () => {
  const navigate = useNavigate(); // Hook para la redirección

  // Estado para controlar el modal
  const [selectedInsignia, setSelectedInsignia] = useState(null);

  const user = {
    nombreCompleto: "Eduardo Jose Daza Palencia",
    nombreUsuario: "Eduardo223804",
    insignias: [
      { id: 1, nombre: "Insignia 1", icono: "fugaz.gif", descripcion: "La insignia fugaz se gana por completar una tarea rápidamente." },
      { id: 2, nombre: "Insignia 2", icono: "medalla.gif", descripcion: "Medalla por cumplir con todas las tareas asignadas durante la semana." },
      { id: 3, nombre: "Insignia 3", icono: "gps.gif", descripcion: "Se obtiene por haber asistido a todas las reuniones en un mes." },
      { id: 4, nombre: "Insignia 4", icono: "caja.gif", descripcion: "Insignia por creatividad al resolver problemas complejos." },
    ],
  };

  // Función para abrir el modal con la información de la insignia seleccionada
  const openModal = (insignia) => {
    setSelectedInsignia(insignia);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedInsignia(null);
  };

  // Función para manejar la redirección
  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <button className="sidebar-btn" onClick={() => handleRedirect('/1')}>ATRÁS</button>
        <button className="sidebar-btn" onClick={() => handleRedirect('/configuracion')}>CONFIGURACIÓN</button>
      </div>

      <div className="profile-container">
        {/* Cuadro alrededor del nombre y el icono */}
        <div className="profile-header">
          <div className="profile-box">
            <img src="hombre.png" alt="Icono" className="profile-box-icon" />
            <div className="profile-info">
              <h2>{user.nombreCompleto}</h2>
              <p>{user.nombreUsuario}</p>
              {/* Número 4 fijo debajo del nombre de usuario */}
              <p className="insignia-number">Insignia: 4</p>
            </div>
          </div>
        </div>

        {/* Lista de insignias */}
        <div className="insignias-list">
          {user.insignias.map((insignia) => (
            <div key={insignia.id} className="insignia-item" onClick={() => openModal(insignia)}>
              <div className="insignia-icon">
                <img src={insignia.icono} alt={insignia.nombre} />
              </div>
              <div className="insignia-nombre">{insignia.nombre}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedInsignia && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>{selectedInsignia.nombre}</h2>
            <p>{selectedInsignia.descripcion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insignias;
