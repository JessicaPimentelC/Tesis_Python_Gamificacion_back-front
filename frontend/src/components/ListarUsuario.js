import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/Editar-usuario.css';
import { useParams,useNavigate } from "react-router-dom";

const ListarUsuario = () => {
    const navigate = useNavigate(); // Hook para la redirección
    const [userInfo, setUserInfo] = useState(null);
    const [usuarios, setUsuarios] = useState([]);  
    const [loading, setLoading] = useState(true); 
    const { user_id } = useParams(); 
    
    const [user, setUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    const formatearFecha = (fechaISO) => {
        if (!fechaISO) return "Sin fecha de última vez";
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
        const listarUsuarios = async () => {
            try {
                const response = await axios.get("http://localhost:8000/myapp/usuarios/", {
                    withCredentials: true,  
                });
                setUsuarios(response.data); 
                setLoading(false); 
            } catch (error) {
                console.error("Error al obtener los usuarios:", error.response?.data || error.message);
                setLoading(false);
            }
        };

    listarUsuarios();
}, []);
    
    const handleBackClick = () => {
        navigate("/perfil");
    };
    const handleEditar = (user_id) => {
        navigate(`/editar-usuario/${user_id}`);
    };

    const handleEliminar = () => {
        navigate("/editar-usuario");
    };
    return (
        <div className="editar-container">
        <Header></Header>
        <div className="editar-content">
            <div className="editar-header">
            <h2>Usuarios Registrados</h2>
            </div>
            <div className="table-content">
            {loading ? (
                        <p>Cargando usuarios...</p>
                    ) : usuarios.length > 0 ? (
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
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.username}</td>
                                        <td>{usuario.email}</td>
                                        <td>{formatearFecha(usuario.last_login)}</td>
                                        <td>
                                            <button className="edit-btn" onClick={() => handleEditar(usuario.id)}>Editar</button>
                                            <button className="delete-btn" onClick={() => handleEliminar(usuario.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay usuarios registrados.</p>
                    )}
                </div>
            </div>
        </div> 

    );
};

export default ListarUsuario;