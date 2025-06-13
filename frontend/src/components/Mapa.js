import { useNavigate } from "react-router-dom";
import { redirigirAEnunciado } from "../utils/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import {getCSRFToken,  refreshAccessToken,} from "../utils/validacionesGenerales.js";

const Mapa = () => {
    const navigate = useNavigate();
    const [ejercicios, setEjercicios] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
        try {
            const csrfToken = getCSRFToken();
            const config = {
            headers: {
                "Content-Type": "application/json",
            }        };

        const googleToken = localStorage.getItem("access_token");
        if (googleToken) {
            config.headers.Authorization = `Bearer ${googleToken}`;
        }

        const response = await axios.get(
            `${API_BASE_URL}/myapp/usuario-info/`,
            config
        );

        setUserInfo(response.data);
        console.log("Usuario recibido:", response.data);
        } catch (error) {
        console.error(
            "Error al obtener el usuario:",
            error.response?.data || error.message
        );

        if (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            navigate("/");
        }
        }
    };

    const hasSession =
        document.cookie.includes("sessionid") ||
        localStorage.getItem("access_token");
    if (hasSession) {
        fetchUsuario();
    } else {
        navigate("/");
    }
    }, [navigate]);
  // Cargar ejercicios cuando userInfo esté disponible
    useEffect(() => {
    if (userInfo) {
        const obtenerEjerciciosDesdeBD = async () => {
        try {
            const response = await axios.get(
            `${API_BASE_URL}/myapp/ejercicios_usuario/${userInfo.id}/`
            );
            setEjercicios(response.data.ejercicios);
        } catch (error) {
            console.error("Error al obtener ejercicios:", error);
        }
        };

        obtenerEjerciciosDesdeBD();
    }
    }, [userInfo]);

    const generarEspiralVertical = (
    numElementos,
    centroX,
    centroY,
    radioInicial,
    factorExp
    ) => {
    return Array.from({ length: numElementos }, (_, i) => {
      const angle = i * 0.6; 
      const radio = radioInicial + factorExp * i; 

        return {
        top: centroY + i * 70, 
        left: centroX + Math.sin(angle) * 100, 
        icon: `/mapa/${(i % 10) + 1}.png`,
        };
    });
    };

    const positions = generarEspiralVertical(20, 100, 20, 20, 15);

    return (
        <>
        <div className="nivel-container nivel-1">
            <div className="nivel-header">
            <h2>NIVEL 1</h2>
            </div>
            <div className="espiral-container" style={{ textAlign: "center" }}>
            {positions.map((pos, index) => {
                const ejercicio = ejercicios[index] || null;
                const isAssigned = Boolean(ejercicio);

                return (
                <div
                key={`nivel1-${index}`}
                className={`map-circle circle-nivel1 ${
                    !isAssigned ? 'circle-disabled' : ''
                    }`}
                style={{
                    top: `${pos.top}px`,
                    left: `${pos.left}px`,
                    cursor: ejercicio ? "pointer" : "default",
                }}
                onClick={() =>
                    ejercicio && redirigirAEnunciado(ejercicio, navigate)
                }
                >
                <img src={pos.icon} alt={`${index + 1}`} className="map-icon" />
                {/*<p>{ejercicio ? `Ejercicio ${ejercicio}`}</p>*/}
                </div>
            );
            })}
        </div>
        </div>
        <div className="nivel-container nivel-2">
        <div className="nivel-header">
            <h2>NIVEL 2</h2>
        </div>
        <div className="nivel-placeholder">
            <p>Disponible pronto</p>
        </div>
        </div>

        <div className="nivel-container nivel-3">
            <div className="nivel-header">
            <h2>NIVEL 3</h2>
        </div>
        <div className="nivel-placeholder">
            <p>Disponible pronto</p>
        </div>
        </div>
    </>
    );
};

export default Mapa;
