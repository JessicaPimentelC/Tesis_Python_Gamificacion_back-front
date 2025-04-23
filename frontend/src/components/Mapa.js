import { useNavigate } from "react-router-dom";
import { redirigirAEnunciado } from "../utils/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import {getCSRFToken,refreshAccessToken } from "../utils/validacionesGenerales.js";

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
                        "X-CSRFToken": csrfToken,
                    },
                    withCredentials: true
                };
    
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
                console.error("Error al obtener el usuario:", error.response?.data || error.message);
                
                if (error.response?.status === 401) {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("user");
                    navigate('/');
                }
            }
        };
    
        const hasSession = document.cookie.includes('sessionid') || localStorage.getItem("access_token");
        if (hasSession) {
            fetchUsuario();
        } else {
            navigate('/');
        }
    }, [navigate]); 
    // Cargar ejercicios cuando userInfo esté disponible
    useEffect(() => {
        if (userInfo) {
            const obtenerEjerciciosDesdeBD = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/myapp/ejercicios_usuario/${userInfo.id}/`);
                    setEjercicios(response.data.ejercicios);
                } catch (error) {
                    console.error("Error al obtener ejercicios:", error);
                }
            };

            obtenerEjerciciosDesdeBD();
        }
    }, [userInfo]); 


    const generarEspiralVertical = (numElementos, centroX, centroY, radioInicial, factorExp) => {
        return Array.from({ length: numElementos }, (_, i) => {
            const angle = i * 0.6; // Ajuste del ángulo para separación horizontal
            const radio = radioInicial + factorExp * i; // Expansión radial
    
            return {
                top: centroY + i * 70, // Incremento uniforme en la vertical
                left: centroX + Math.sin(angle) * 100, // Mayor amplitud horizontal
                icon: `/mapa/${(i % 10) + 1}.png`
            };
        });
    };
    
    const positions = generarEspiralVertical(20, 100, 20, 20, 15);
    
    return (
        <div className="circles-container-mapa" style={{ textAlign: "center" }}>
            {positions.map((pos, index) => {
                const ejercicio = ejercicios[index] || null;
                return (
                    <div
                        key={index}
                        className={`circle ${
                            index <= 20 ? "circle-nivel1" :
                            index <= 21 ? "circle-nivel2" :
                            "circle-nivel3"
                        }`}
                        style={{
                            position: "absolute",
                            top: `${pos.top}px`,
                            left: `${pos.left}px`,
                        }}
                        onClick={() => {
                            if (ejercicio) {
                                redirigirAEnunciado(ejercicio, navigate);
                            } else {
                                console.log("No hay ejercicio asignado a esta posición.");
                            }
                        }}
                    >
                    <img src={pos.icon} alt={`Icon ${index}`} />                    
                    <p>{ejercicio ? `Ejercicio ${ejercicio}` : "No asignado"}</p>
                    </div>
                );
            })}
        </div>    
    );
};

export default Mapa;
