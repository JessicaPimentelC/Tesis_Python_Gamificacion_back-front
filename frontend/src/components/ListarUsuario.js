import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/Editar-usuario.css';
import { useParams,useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import {getCSRFToken, refreshAccessToken} from "../utils/validacionesGenerales.js";
import Swal from 'sweetalert2';

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
    const listarUsuarios = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/myapp/usuarios/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            });
            setUsuarios(response.data);
            setLoading(false); 
        }catch (error) {
            if (error.response && error.response.status === 401) {
                try {
                    const newAccessToken = await refreshAccessToken(); 
                    localStorage.setItem('access_token', newAccessToken);
                    
                    const retryResponse = await axios.get(`${API_BASE_URL}/myapp/usuarios/`, {
                        headers: {
                            'Authorization': `Bearer ${newAccessToken}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    setUsuarios(retryResponse.data);
                } catch (refreshError) {
                    console.error('Error al refrescar token:', refreshError);
                }
            } else {
                console.error('Error al listar usuarios:', error);
            }
        } finally {
            setLoading(false);
        }
    };
        
    useEffect(() => {
        listarUsuarios();
    }, [navigate]);        
    const handleBackClick = () => {
        navigate("/perfil");
    };
    const handleEditar = (user_id) => {
        navigate(`/editar-usuario/${user_id}`);
    };

    const handleEliminar = async (usuarioId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/myapp/eliminar-usuario/${usuarioId}`);
            
            if (response.status === 200) {
                Swal.fire({
                icon: "success",
                title: "Usuario eliminado",
                text: "Usuario eliminado correctamente.",
                });
                listarUsuarios();  
                
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            alert('Error al eliminar el usuario');
        }
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