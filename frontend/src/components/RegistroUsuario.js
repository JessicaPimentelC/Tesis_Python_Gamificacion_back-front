import React, { useState, useEffect } from 'react';
import '../styles/Editar-usuario.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from './Sidebar';

const RegistroUsuario = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/myapp/crear-usuario/",
                user,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Usuario creado:", response.data);
            alert(`Usuario ${response.data.username} creado correctamente`);
            navigate("/listar-usuarios");
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            alert(error.response?.data?.message || "Error al crear el usuario");
        }
    };

    return (
        <div className="editar-container">
            <Sidebar></Sidebar>
            <div className="editar-content">
            <button onClick={() => navigate("/perfil")} className="back-button">
                    <img src="/atrasa.png" alt="Back" className="back-icon" />
                </button>
            <div className="editar-header">
                <h2>Registro de Usuario</h2>
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
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                <label>Nombres:</label>
                <input
                    type="text"
                    name="nombre"
                    value={user.first_name}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                <label>Apellidos:</label>
                <input
                    type="text"
                    name="Apellidos"
                    value={user.last_name}
                    onChange={handleChange}
                    required
                />
                </div>
                <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default RegistroUsuario;
