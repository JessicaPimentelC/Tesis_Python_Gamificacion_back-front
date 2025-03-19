import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/Editar-usuario.css';

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
                const response = await axios.get(`http://localhost:8000/myapp/editar-usuario/${user_id}/`, {
                    withCredentials: true,
                });

                console.log("Usuario recibido:", response.data);
                setUser(response.data); // Cargar los datos en el formulario
            } catch (error) {
                console.error("Error al obtener usuario:", error);
            }
        };

        if (user_id) {
            fetchUsuario();
        }
    }, [user_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const getCSRFToken = () => {
        const cookies = document.cookie.split("; ");
        const csrfCookie = cookies.find((cookie) => cookie.startsWith("csrftoken="));
        return csrfCookie ? csrfCookie.split("=")[1] : "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = getCSRFToken();
            const response = await axios.put(
                `http://localhost:8000/myapp/editar-usuario/${user_id}/`, 
                user, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    },
                    withCredentials: true,
                }
            );

            console.log("Usuario actualizado:", response.data);
            alert("Perfil actualizado correctamente");
            navigate("/listar-usuarios");
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            alert("Error al actualizar el perfil");
        }
    };

    return (
        <div className="editar-container">
            <Sidebar />
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
