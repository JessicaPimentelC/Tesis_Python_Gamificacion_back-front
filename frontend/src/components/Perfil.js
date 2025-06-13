import React, { useState, useEffect } from "react";
import "../styles/Perfil.css"; 
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import API_BASE_URL from "../config";
import { esAdmin } from "../utils/validacionUsuario"; 
import {getCSRFToken,refreshAccessToken } from "../utils/validacionesGenerales.js";
import Swal from 'sweetalert2';

const Perfil = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [logros, setLogros] = useState(null);
  const navigate = useNavigate(); // Hook para la redirección
  const [insignias, setInsignias] = useState([]); // Insignias dinámicas
  const { user_id } = useParams(); 
  const [error, setError] = useState(null);

  // Función para manejar el click en una insignia (si necesitas alguna acción)


useEffect(() => {
  const fetchUsuario = async () => {
      try {
          const csrfToken = getCSRFToken();
          const config = {
              headers: {
                  "Content-Type": "application/json"              }          };

          const googleToken = localStorage.getItem("access_token");
          if (googleToken) {
              config.headers.Authorization = `Bearer ${googleToken}`;
          }

          const response = await axios.get(
              `${API_BASE_URL}/myapp/usuario-info/`,
              config
          );

          setUserInfo(response.data);
          console.log("Usuario recibido:", response.data);
          
      } catch (error) {
          console.error("Error al obtener el usuario:", error.response?.data || error.message);
          
          if (error.response?.status === 401) {
              localStorage.removeItem("access_token");
              localStorage.removeItem("user");
              navigate('/perfil');
          }
      }
  };

  const hasSession = document.cookie.includes('sessionid') || localStorage.getItem("access_token");
  if (hasSession) {
      fetchUsuario();
  } else {
      navigate('/');
  }
}, [navigate]); 
  useEffect(() => {
    const fetchLogros = async () => {
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
          `${API_BASE_URL}/myapp/logros-usuario/`,
          {
            headers          }
        );
  
        console.log("Logros obtenidas:", response.data);
        setLogros(response.data);
  
      } catch (error) {
        console.error("Error al obtener los logros:", error);
  
        if (error.response?.status === 401) {
          try {
            const newToken = await refreshAccessToken();
            
            const retryResponse = await axios.get(
              `${API_BASE_URL}/myapp/logros-usuario/`,
              {
                headers: {
                  'Authorization': `Bearer ${newToken}`,
                  'Content-Type': 'application/json'                }              }
            );
            
            setLogros(retryResponse.data);
            return;
          } catch (refreshError) {
            console.error("Error al renovar token:", refreshError);
            navigate('/perfil');
            return;
          }
        }
  
        setError('No se pudieron cargar las logros. Intenta recargar la página.');
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
      hour12: true,
      timeZone: "America/Bogota",
    });
  };
  const handleBackClick = () => {
    navigate("/dashboard");
  };
  
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
            headers          }
        );
  
        console.log("Insignias obtenidas:", response.data);
        setInsignias(response.data.insignias);
  
      } catch (error) {
        console.error("Error al obtener insignias:", error);
  
        if (error.response?.status === 401) {
          try {
            const newToken = await refreshAccessToken();
            
            const retryResponse = await axios.get(
              `${API_BASE_URL}/myapp/insignias/`,
              {
                headers: {
                  'Authorization': `Bearer ${newToken}`,
                  'Content-Type': 'application/json'                }              }
            );
            
            setInsignias(retryResponse.data.insignias);
            return;
          } catch (refreshError) {
            console.error("Error al renovar token:", refreshError);
            // Redirigir a login si no se puede renovar
            navigate('/perfil');
            return;
          }
        }
  
        setError('No se pudieron cargar las insignias. Intenta recargar la página.');
      }
    };
  
    fetchInsignias();
  }, [navigate]); 
    const handleInsigniaClick = (insignia) => {
    Swal.fire({
      title: `🏅 ${insignia.nombre}`,
      text: insignia.descripcion,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#007bff"
    });
  };
  const handleLogroClick = (logro, fecha) => {
    Swal.fire({
      title: `🏆 ${logro.nombre}`,
      html: `
        <img src="/logros/${logro.id_logro}.png" alt="${logro.nombre}" style="width: 100px; margin-bottom: 10px;" />
        <p><strong>Descripción:</strong> ${logro.descripcion}</p>
        <p><strong>Fecha completado:</strong> ${new Date(fecha).toLocaleDateString('es-ES')}</p>
      `,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#007bff'
    });
  };  
  const handleEditar = (user_id) => {
    navigate(`/editar-usuario/${user_id}`);
  };
  const handleListarUsuarios = () => {
    navigate("/listar-usuarios");
  };
  const handleCrear = () => {
    navigate("/crear-usuario");
  };
  return (
    <div className="perfil-container">
      <Header></Header>
      <div className="perfil-content">
        {/***<button onClick={handleBackClick} className="boton-atras">
          <img
            src="/atrasa.png"
            alt="Back"
            className="back-icon"
            onClick={handleBackClick}
          />
        </button>***/}
        <div className="perfil-header">
          <h2>Perfil de Usuario</h2>
        </div>
        <div className="perfil-info">
          <div className="text-content">
            <h3>¡Bienvenido!</h3>
            {userInfo ? (
              <div>
                <p className="texto-usuario">
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
          {esAdmin(userInfo) && (
            <div className="botones-container">
            <button className="boton-editar" onClick={handleCrear}>
              Crear usuario
            </button>
            <button className="boton-editar"  onClick={() => handleEditar(userInfo.id)}>
              Editar usuario
            </button>
            <button className="boton-editar" onClick={handleListarUsuarios}>
              Listar usuarios
            </button>
          </div>
          )}
        </div>
        <h3>🏅 Logros</h3>
        <div className="perfil-logros">
          {logros &&
            logros.map((item, index) =>
              item.logro ? ( // ✅ Verifica que 'logro' no sea undefined
                <div key={index} className="perfil-stats-table"
                    onClick={() => handleLogroClick(item.logro, item.fecha_completado)}>
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
              onClick={() => handleInsigniaClick(item.insignia)}
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
