import React, { useState } from 'react';
import '../styles/Login.css';
import API_BASE_URL from "../config";
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import '../styles/Register.css';
import Loginsesion from './Loginsesion';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Email:", email, "Password:", password);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/myapp/login/`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh); 
      }
      Swal.fire({
        title: "¡Login Exitoso!",
        text: `"${response.data.message}".`,
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#007bff"
        }).then(() => {
            navigate("/dashboard");
            });
          } catch (error) {
            console.error(error);
            let mensaje = "Credenciales incorrectas";
        
            if (error.response && error.response.data) {
                // Si viene con un mensaje de error personalizado
                if (typeof error.response.data === 'string') {
                    mensaje = error.response.data;
                } else if (error.response.data.error) {
                    mensaje = error.response.data.error;
                }
            }
        
            Swal.fire({
                title: "Error",
                text: mensaje,
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
  };

<GoogleLogin
  clientId="567858506235-sd9fvbkheo3rnggdfpmnfjp63t6rgej3.apps.googleusercontent.com"
  onSuccess={response => console.log('Inicio de sesión exitoso', response)}
  onError={() => console.log('Error al iniciar sesión')}
/>

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>¡Bienvenido a PythonGo!</h1>
        <p className="login-description">
        "𝘿𝙚𝙨𝙘𝙪𝙗𝙧𝙚 𝙚𝙡 𝙥𝙤𝙙𝙚𝙧 𝙙𝙚 𝙡𝙖 𝙥𝙧𝙤𝙜𝙧𝙖𝙢𝙖𝙘𝙞ó𝙣 𝙚𝙣 𝙋𝙮𝙩𝙝𝙤𝙣 𝙮 𝙩𝙧𝙖𝙣𝙨𝙛𝙤𝙧𝙢𝙖 𝙩𝙪𝙨 𝙞𝙙𝙚𝙖𝙨 𝙚𝙣 𝙧𝙚𝙖𝙡𝙞𝙙𝙖𝙙."        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">LOGIN</h2>
          <div className="form-group">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <div className="social-login">
          <Loginsesion/>
        </div>
        <div className="login-footer">
          <a href="#" onClick={() => navigate('/register')}>Registrarse</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
