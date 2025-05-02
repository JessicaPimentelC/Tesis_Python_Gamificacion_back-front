import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '../styles/Register.css';
import Loginsesion from './Loginsesion'; 
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para la redirección
  const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: ""
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
};
  const handleSubmit = async (e) => {
    e.preventDefault();  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }
  
    if (user.password.length <= 4) {
      alert('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/myapp/crear-usuario/`,
        user,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
        
    );
    console.log('Respuesta completa del servidor:', response.data);

    if (response.status === 201) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      if (response.data.access_token && response.data.refresh_token) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
      }
    
      console.log("Registro exitoso, redirigiendo...");
      navigate('/dashboard');
    }
    

    } 

    catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al registrar. Por favor, intenta de nuevo.');
    }
  };


  return (
    <div className="register-container">
      <div className="register-box">
        <img src="tesis.png" alt="Logo" className="register-logo" />
        <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Completa los siguientes espacios</h2>
        <div className="form-group">
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                    placeholder="Nombre de usuario"
                />
                    </div>
                    <div className="form-group">

                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    placeholder="Correo electrónico"
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    placeholder="Contraseña"
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleChange}
                    required
                    placeholder="Nombres"
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleChange}
                    required
                    placeholder="Apellidos"
                />
                </div>
                <button type="submit" className="login-button">Registarse</button>
                </form>
          <div className="social-register">
          
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <Loginsesion />
          </GoogleOAuthProvider>
        </div>
        <p className="terms">
          Al registrarte en PythonGo, aceptas nuestros <a href="">Términos y Política de privacidad</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;
