import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarUsuario = () => {
    const [usuario, setUsuario] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    // Obtener los datos del usuario actual
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
    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({
            ...user,
            [name]: value,
        });
    };

    // Enviar los datos actualizados al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/myapp/editar-usuario/', user);
            console.log('Usuario actualizado:', response.data);
            alert('Perfil actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            alert('Error al actualizar el perfil');
        }
    };

    return (
        <div>
            <h2>Editar Perfil</h2>
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
    );
};

export default EditarUsuario;