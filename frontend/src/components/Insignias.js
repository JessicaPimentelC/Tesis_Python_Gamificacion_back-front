import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Insignias.css";
import axios from "axios";
import API_BASE_URL from "../config";
import Header from "./Header";
import {getCSRFToken,refreshAccessToken } from "../utils/validacionesGenerales.js";
import { fetchUserInfo } from '../utils/userService';

const Insignias = () => {
  const navigate = useNavigate(); // Hook para la redirección
  const [selectedInsignia, setSelectedInsignia] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [hoveredInsignia, setHoveredInsignia] = useState(null);
  const [error, setError] = useState(null);
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  // Función para manejar el click en una insignia (si necesitas alguna acción)
  const handleInsigniaClick = (insigniaNombre) => {
    console.log(`Insignia clickeada: ${insigniaNombre}`);
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserInfo(); // Usa la función centralizada
        setUserInfo(userData);
      } catch (error) {
        console.error("Error en insignias.js:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate('/');
        }
      }
    };
  
    loadUserData();
  }, [navigate]);
useEffect(() => {
  const fetchInsignias = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };

      const csrfToken = getCSRFToken();
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken;
      }

      const token = localStorage.getItem('access_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.get(
        `${API_BASE_URL}/myapp/insignias/`,
        {
          headers,
        }
      );

      console.log("Insignias obtenidas:", response.data);
      setInsignias(response.data.insignias);

    } catch (error) {
      console.error("Error al obtener insignias:", error);

      if (error.response?.status === 401) {
        try {
          const newToken = await refreshAccessToken();
          
          const headersWithNewToken = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${newToken}`            };

          // Vuelve a realizar la solicitud con el nuevo token
          const retryResponse = await axios.get(`${API_BASE_URL}/myapp/insignias/`, {
              headers: headersWithNewToken,
          });

          setInsignias(retryResponse.data.insignias);
          return; // Termina la ejecución si todo fue exitoso

      } catch (refreshError) {
          console.error("Error al renovar token:", refreshError);
          localStorage.removeItem('access_token');
          navigate('/'); // Redirige al login si no se puede renovar el token
          return;
      }
      }

      setError('No se pudieron cargar las insignias. Intenta recargar la página.');
    }
  };

  fetchInsignias();
}, [navigate]); 
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
      <Header></Header>
      <div className="profile-container">
      {/*<button onClick={handleBackClick} className="back-button-insignias">
        <img src="/atrasa.png" alt="Back" className="back-icon" onClick={handleBackClick}/>
      </button>*/}
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
