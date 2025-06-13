import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getCSRFToken,refreshAccessToken } from "../utils/validacionesGenerales.js";
import API_BASE_URL from "../config"; 

const useUsuario = () => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    const fetchUsuario = async () => {
        try {
        const accessToken = localStorage.getItem("access_token");

        let config = {
            headers: {
            "Content-Type": "application/json",
            }        };

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, config);
        setUsuario(response.data);
        setCargando(false);
        return response.data; 

        } catch (error) {
        if (error.response?.status === 401) {
            try {
            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken) throw new Error("No hay refresh_token");

            const refreshResponse = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
                refresh: refreshToken,
            });

            const newAccessToken = refreshResponse.data.access;
            localStorage.setItem("access_token", newAccessToken);

            const retryResponse = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, {
                headers: {
                "Authorization": `Bearer ${newAccessToken}`,
                "Content-Type": "application/json",
                }            });

            setUsuario(retryResponse.data);
            setCargando(false);
            return retryResponse.data; 

            } catch (refreshError) {
            console.error("Error al renovar token:", refreshError);
            }
        }

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/");
        }

        setCargando(false);
    };

    useEffect(() => {
        const hasSession =
        document.cookie.includes("sessionid") ||
        localStorage.getItem("access_token");

        if (hasSession) {
        fetchUsuario();
        } else {
        navigate("/");
        }
    }, [navigate]);

    return { usuario, fetchUsuario };
};

export default useUsuario;
