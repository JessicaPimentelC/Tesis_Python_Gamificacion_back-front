import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const Usuario = () => {
    const [userInfo, setUserInfo] = useState(null);


useEffect(() => {
    const fetchUsuario = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/myapp/usuario-info/`, {
            withCredentials: true,
            });
            setUserInfo(response.data);
            console.log("Usuario recibido:", response.data);
        } catch (error) {
            console.error("Error al obtener el usuario:", error.response?.data || error.message);
        }
        };
        fetchUsuario();
    }, []);
}

export default Usuario;