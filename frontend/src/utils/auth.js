import axios from "axios";
import API_BASE_URL from "../config";

export const fetchUsuarioConCookies = async (setUsuario) => {
    const response = await axios.get(`${API_BASE_URL}/myapp/login/`, {
        withCredentials: true, 
        headers: {
        "Content-Type": "application/json",
        },
    });

    setUsuario(response.data);
    };

export const fetchUsuarioConToken = async (token, setUsuario) => {
    const response = await axios.get(`${API_BASE_URL}/myapp/google-login/`, {
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    });

    setUsuario(response.data);
    };
