import React, { useState, useEffect } from "react";
import "../styles/Perfil.css"; // Archivo CSS mejorado
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [logros, setLogros] = useState(null);
  const navigate = useNavigate(); // Hook para la redirección
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  // Función para manejar el click en una insignia (si necesitas alguna acción)
  const handleInsigniaClick = (insigniaNombre) => {
    console.log(`Insignia clickeada: ${insigniaNombre}`);
  };

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
    const fetchLogros = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/myapp/logros-usuario/",
          {
            withCredentials: true, // Para incluir cookies si las usas
          }
        );
        console.log("Logros obtenidos", response.data);
        setLogros(response.data);
      } catch (error) {
        console.error("Error al obtener las insignias:", error);
      }
    };
    fetchLogros();
  }, []);

  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "Fecha no disponible";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Argentina/Buenos_Aires",
    });
  };
  const handleBackClick = () => {
    navigate("/dashboard");
  };
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
  return (
    <div className="perfil-container">
      <Sidebar />
      <div className="perfil-content">
      <button onClick={handleBackClick} className="back-button">
        <img src="/atrasa.png" alt="Back" className="back-icon" onClick={handleBackClick}/>
      </button>
        <div className="perfil-header">
          <h2>Perfil de Usuario</h2>
        </div>

        <div className="perfil-info">
          <img
            src="foto_usuario.jpg"
            alt="Foto de usuario"
            className="perfil-picture"
          />
          <div className="text-content">
            <h3>¡Bienvenido!</h3>
            {userInfo ? (
              <div>
                <p>
                  <strong>Nombre de usuario:</strong> {userInfo.username}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>Última fecha de login:</strong>{" "}
                  {formatearFecha(userInfo?.last_login)}
                </p>
              </div>
            ) : (
              <p>Cargando información del usuario...</p>
            )}
          </div>
        </div>
        <h3>🏅 Logros</h3>
        <div className="perfil-logros">
            {logros &&
              logros.map((item, index) =>
                item.logro ? ( // ✅ Verifica que 'logro' no sea undefined
                  <div key={index} className="perfil-stats-table">
                    <div className="stat-box">
                      <img
                        src={`/logros/${item.logro.id_logro}.png`} // Usa el ID del logro
                        alt={item.logro.nombre}
                      />
                      <div className="insignia-nombre">{item.logro.nombre}</div>

                    </div>
                  </div>
                ) : null
              )}
        </div>
        <h3>🏅 Insignias</h3>
        <div className="perfil-logros">
        {insignias.map((item, index) => (
            <div
              key={index}
              className="perfil-stats-table"
              onClick={() => handleInsigniaClick(item.insignia.nombre)}
              >
              <div className="stat-box">
                <img
                  src={`/insignias/${item.insignia.nombre.toLowerCase()}.png`}
                  alt={item.insignia.nombre}
                />{" "}
                <div className="insignia-nombre">{item.insignia.nombre}</div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
