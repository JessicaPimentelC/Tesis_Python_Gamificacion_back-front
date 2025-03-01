import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/Editar-usuario.css';
import { useNavigate } from "react-router-dom";

const ListarUsuario = () => {
    const navigate = useNavigate(); // Hook para la redirección
    const [userInfo, setUserInfo] = useState(null);

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
    
    const handleBackClick = () => {
        navigate("/perfil");
    };
    const handleEditar = () => {
        navigate("/editar-usuario");
    };

    const handleEliminar = () => {
        navigate("/editar-usuario");
    };
    return (
        <div className="editar-container">
        <Sidebar />
        <div className="editar-content">
        <button onClick={handleBackClick} className="back-button">
            <img src="/atrasa.png" alt="Back" className="back-icon" onClick={handleBackClick}/>
        </button>
            <div className="editar-header">
            <h2>Usuarios</h2>
            </div>
            <div className="table-content">
    {userInfo ? (
        <table className="user-table">
            <thead>
                <tr>
                    <th>Nombre de usuario</th>
                    <th>Email</th>
                    <th>Última fecha de login</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{userInfo.username}</td>
                    <td>{userInfo.email}</td>
                    <td>{formatearFecha(userInfo?.last_login)}</td>
                    <td>
                        <button className="edit-btn" onClick={() => handleEditar(userInfo)}>Editar</button>
                        <button className="delete-btn" onClick={() => handleEliminar(userInfo.id)}>Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    ) : (
        <p>Cargando información del usuario...</p>
    )}
</div>
</div>

    
    </div>

    );
};

export default ListarUsuario;