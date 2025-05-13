import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Sidebar from './Sidebar';
import '../styles/Editar-usuario.css';
import Header from './Header';
import API_BASE_URL from "../config";
import {getCSRFToken,refreshAccessToken } from "../utils/validacionesGenerales.js";
import Swal from 'sweetalert2';

const EditarUsuario = () => {
    const navigate = useNavigate();
    const { user_id } = useParams(); // Obtener ID desde la URL

    const [user, setUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    useEffect(() => {
        const fetchUsuario = async () => {
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
                `${API_BASE_URL}/myapp/editar-usuario/${user_id}/`, 
                {
                headers,
                withCredentials: true
                }
            );
    
            console.log("Usuario recibido:", response.data);
            setUser(response.data);
    
            } catch (error) {
            console.error("Error al obtener usuario:", error);
            
            if (error.response?.status === 401) {
                try {
                const newToken = await refreshAccessToken();
                
                const retryResponse = await axios.get(
                    `${API_BASE_URL}/myapp/editar-usuario/${user_id}/`,
                    {
                    headers: {
                        'Authorization': `Bearer ${newToken}`,
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()
                    },
                    withCredentials: true
                    }
                );
                
                setUser(retryResponse.data);
                return;
                } catch (refreshError) {
                console.error("Error al renovar token:", refreshError);
                navigate('/login', { state: { from: 'edit-user' } });
                return;
                }
            }
    
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los datos del usuario',
                icon: 'error'
            });
            }
        };
    
        if (user_id) {
            fetchUsuario();
        }}, [user_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = getCSRFToken();
            const token = localStorage.getItem('access_token'); 
            const response = await axios.put(
                `${API_BASE_URL}/myapp/editar-usuario/${user_id}/`, 
                user, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, 
                        "X-CSRFToken": csrfToken,
                    },
                    withCredentials: true,
                }
            );

            console.log("Usuario actualizado:", response.data);
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Perfil actualizado correctamente',
                confirmButtonText: 'Aceptar'
            });
            navigate("/listar-usuarios");
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            alert("Error al actualizar el perfil");
        }
    };

    return (
        <div className="editar-container">
            <Header />
            <div className="editar-content">
                <button onClick={() => navigate("/perfil")} className="back-button">
                    <img src="/atrasa.png" alt="Back" className="back-icon" />
                </button>
                <div className="editar-header">
                    <h2>Editar Usuario</h2>
                </div>
                <div className="formulario">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre de usuario:</label>
                            <input type="text" name="username" value={user.username} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Nombre:</label>
                            <input type="text" name="first_name" value={user.first_name} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Apellido:</label>
                            <input type="text" name="last_name" value={user.last_name} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={user.email} onChange={handleChange} required />
                        </div>
                        <button type="submit">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarUsuario;
