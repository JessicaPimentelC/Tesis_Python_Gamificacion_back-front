import { useNavigate } from "react-router-dom";
import { redirigirAEnunciado } from "../utils/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Mapa = () => {
    const navigate = useNavigate();
    const [ejercicios, setEjercicios] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    // Cargar usuario
    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get("http://localhost:8000/myapp/usuario-info/", {
                    withCredentials: true,
                });
                setUserInfo(response.data);
                console.log("Usuario recibido:", response.data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error.response?.data || error.message);
            }
        };

        fetchUsuario();
    }, []); // Se ejecuta solo una vez al montar el componente

    // Cargar ejercicios cuando userInfo esté disponible
    useEffect(() => {
        if (userInfo) {
            const obtenerEjerciciosDesdeBD = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/myapp/ejercicios_usuario/${userInfo.id}/`);
                    setEjercicios(response.data.ejercicios);
                } catch (error) {
                    console.error("Error al obtener ejercicios:", error);
                }
            };

            obtenerEjerciciosDesdeBD();
        }
    }, [userInfo]); // Se ejecuta cuando userInfo cambia

   /* const positions = [
        { top: 50, left: 50, icon: "/colombia.png" },
        { top: 50, left: 110, icon: "/cohetee.png" },
        { top: 50, left: 170, icon: "/empresario.png" },
        { top: 50, left: 230, icon: "/tres.png" },
        { top: 50, left: 290, icon: "/libero.png" },
        { top: 110, left: 290, icon: "/ed.png" },
        { top: 170, left: 290, icon: "/geometrico.png" },
        { top: 230, left: 290, icon: "/41.png" },
        { top: 290, left: 290, icon: "/42.png" },
        { top: 290, left: 50, icon: "/43.png" },
        { top: 290, left: 110, icon: "/44.png" },
        { top: 290, left: 170, icon: "/45.png" },
        { top: 290, left: 230, icon: "/46.png" },
    ];*/
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
