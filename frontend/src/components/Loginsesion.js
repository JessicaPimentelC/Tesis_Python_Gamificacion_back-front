import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import API_BASE_URL from "../config.js";
const Loginsesion = () => {
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = async (response) => {
       // console.log("Token recibido:", response.credential); 
        try {
            const res = await axios.post(
                `${API_BASE_URL}/myapp/google-login/`,
                { token: response.credential }
            );
            if (res.data.message != "Inicio de sesión exitoso") {
                console.error('Mensaje:', res.data.message);
                alert(`ERROR: ${res.data.message}`);
            } else {
                console.log('Inicio de sesión exitoso:', res.data);

                // Guardar token y usuario en localStorage
                localStorage.setItem("access_token", res.data.access_token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                // Redirigir al dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Error en la autenticación", error);
            alert("Error al iniciar sesión con Google.");
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

