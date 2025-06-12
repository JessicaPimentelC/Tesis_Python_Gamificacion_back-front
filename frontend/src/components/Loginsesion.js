import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import API_BASE_URL from "../config.js";
import {getCSRFToken } from "../utils/validacionesGenerales.js";

const Loginsesion = () => {
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = async (response) => {
    // console.log("Token recibido:", response.credential); 
        try {
            const csrfToken = getCSRFToken(); 
            const res = await axios.post(
                `${API_BASE_URL}/myapp/google-login/`,
                { token: response.credential },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    }
            );
            if (res.data.message != "Inicio de sesión exitoso") {
                console.error('Mensaje:', res.data.message);
                alert(`ERROR: ${res.data.message}`);
            } 
            console.log('Inicio de sesión exitoso:', res.data);
            if (res.data.access_token && res.data.refresh_token) {
                localStorage.setItem("access_token", res.data.access_token);
                localStorage.setItem("refresh_token", res.data.refresh_token);
                localStorage.setItem("authType", "jwt");

            }
            
            if (res.data.user) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
            }
            navigate('/dashboard');
            
        } catch (error) {
            console.error("Error en la autenticación", error);
            let errorMessage = "Error al iniciar sesión con Google.";
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
                console.error("Detalles del error:", error.response.data);
            }
            
            alert(errorMessage);
        }
    };

    return (
        <GoogleOAuthProvider clientId="567858506235-sd9fvbkheo3rnggdfpmnfjp63t6rgej3.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                    console.log("Error al iniciar sesión");
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default Loginsesion;

