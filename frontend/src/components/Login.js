import React, { useState } from 'react';
import '../styles/Login.css';
import API_BASE_URL from "../config";
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import '../styles/Register.css';
import Loginsesion from './Loginsesion';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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

      alert(response.data.message);
      navigate('/dashboard'); 
    }catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
          alert(error.response.data.error || "Credenciales incorrectas");
        } else {
          alert("Credenciales incorrectas");
        }
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
        <h1>¡Bienvenido a PythonLearner!</h1>
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
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        <div className="social-login">
         <Loginsesion/>
        </div>
        <div className="login-footer">
          <a href="#" onClick={() => navigate('/register')}>Crear una cuenta</a>
          <a href="#" onClick={() => navigate('reset')}>Olvidó la contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
