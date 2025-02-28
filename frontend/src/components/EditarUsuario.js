import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/Editar-usuario.css';
import { useNavigate } from "react-router-dom";

const EditarUsuario = () => {
      const navigate = useNavigate(); // Hook para la redirección

    const [user, setUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        fetchUsuario();
    }, []);

    const fetchUsuario = async () => {
        try {
            const userResponse = await axios.get("http://localhost:8000/myapp/usuario-info/", {
                withCredentials: true, // Incluir cookies en la petición si usas sesiones
            });

            console.log("Usuario recibido:", userResponse.data);

            if (!userResponse.data.id) {
                alert("Error: Usuario no identificado.");
                return;
            }

            setUsuario(userResponse.data); // Guardar el usuario en el estado

        } catch (error) {
            console.error("Error al obtener usuario:", error);
        }
    };


    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const getCSRFToken = () => {
        const cookies = document.cookie.split("; ");
        const csrfCookie = cookies.find((cookie) => cookie.startsWith("csrftoken="));
        return csrfCookie ? csrfCookie.split("=")[1] : "";
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const csrfToken = getCSRFToken(); // Obtener el token dinámico
    
            const response = await axios.put("http://localhost:8000/myapp/editar-usuario/", user, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken, // Se obtiene dinámicamente
                },
                withCredentials: true,  // Enviar cookies para autenticación
            });
    
            console.log("Usuario actualizado:", response.data);
            alert("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            alert("Error al actualizar el perfil");
        }
    };
    
    const handleBackClick = () => {
        navigate("/perfil");
      };

    return (
        <div className="editar-container">
        <Sidebar />
        <div className="editar-content">
        <button onClick={handleBackClick} className="back-button">
            <img src="/atrasa.png" alt="Back" className="back-icon" onClick={handleBackClick}/>
        </button>
            <div className="editar-header">
            <h2>Editar Usuario</h2>
            </div>
            <div className="formulario">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de usuario:</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={user.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={user.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
            </div>
        </div>
    </div>

    );
};

export default EditarUsuario;