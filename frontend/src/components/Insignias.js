import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Insignias.css";
import Usuario from "./Usuario";
import Sidebar from "./Sidebar";
import axios from "axios";

const Insignias = () => {
  const navigate = useNavigate(); // Hook para la redirección
  const [selectedInsignia, setSelectedInsignia] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [hoveredInsignia, setHoveredInsignia] = useState(null);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  // Función para manejar el click en una insignia (si necesitas alguna acción)
  const handleInsigniaClick = (insigniaNombre) => {
    console.log(`Insignia clickeada: ${insigniaNombre}`);
  };

  const handleMouseEnter = (insigniaNombre) => {
    setHoveredInsignia(insigniaNombre);
  };

  const handleMouseLeave = () => {
    setHoveredInsignia(null);
  };
  // Estado para controlar el modal
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/myapp/usuario-info/",
          {
            withCredentials: true,
          }
        );
        setUserInfo(response.data);
        console.log("Usuario recibido:", response.data);
      } catch (error) {
        console.error(
          "Error al obtener el usuario:",
          error.response?.data || error.message
        );
      }
    };

    fetchUsuario();
  }, []);
  useEffect(() => {
    const fetchInsignias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/myapp/insignias/",
          {
            withCredentials: true, // Para incluir cookies si las usas
          }
        );
        console.log("insignias obtenidas", response.data);
        setInsignias(response.data);
      } catch (error) {
        console.error("Error al obtener las insignias:", error);
      }
    };
    fetchInsignias();
  }, []);

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
  const handleBackClick = () => {
    navigate("/dashboard");
};
  return (
    <div className="container">
      <Sidebar></Sidebar>
      <div className="profile-container">
        {/* Cuadro alrededor del nombre y el icono */}
        <div className="profile-header">
          <div className="profile-box">
            <img src="/hombre.png" alt="Icono" className="profile-box-icon" />
            <div className="profile-info">
              <h3>¡Tus insignias!</h3>

              {userInfo ? (
                <div>
                  <p>
                    <strong>Nombre de usuario:</strong> {userInfo.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {userInfo.email}
                  </p>
                </div>
              ) : (
                <p>Cargando información del usuario...</p>
              )}
              {/* Número 4 fijo debajo del nombre de usuario */}
              <p>
              <strong>Cantidad de insignias:</strong> {setInsignias.length}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de insignias */}
        <div className="insignias-list">
          {insignias.map((item, index) => (
            <div
              key={index}
              className="insignia-item"
              onClick={() => handleInsigniaClick(item.insignia.nombre)}
              >
              <div className="insignia-icon">
                <img
                  src={`/insignias/${item.insignia.nombre.toLowerCase()}.png`}
                  alt={item.insignia.nombre}
                />{" "}
              </div>
              <div className="insignia-nombre">{item.insignia.nombre}</div>
            </div>
          ))}
        </div>
        <button onClick={handleBackClick} className="back-button">
        <img src="/atrasa.png" alt="Back" className="back-icon" onClick={handleBackClick}/>
      </button>
      </div>

      {/* Modal */}
      {selectedInsignia && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedInsignia.nombre}</h2>
            <p>{selectedInsignia.descripcion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insignias;
