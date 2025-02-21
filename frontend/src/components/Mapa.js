import { useNavigate } from "react-router-dom";
import { redirigirAEnunciado,obtenerEjerciciosDesdeBD } from "../utils/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Mapa = ({ usuario_id }) => {
    const navigate = useNavigate();
    const [ejercicios, setEjercicios] = useState([]);

    useEffect(() => {
        const obtenerEjerciciosDesdeBD = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/myapp/ejercicios_usuario/${usuario_id}/`);
                setEjercicios(response.data.ejercicios);
            } catch (error) {
                console.error("Error al obtener ejercicios:", error);
            }
        };

        obtenerEjerciciosDesdeBD();
    }, [usuario_id]);

    const positions = [
        { top: 50, left: 50, icon: "/colombia.png" },
        { top: 50, left: 100, icon: "/cohetee.png" },
        { top: 50, left: 150, icon: "/empresario.png" },
        { top: 50, left: 200, icon: "/tres.png" },
        { top: 50, left: 250, icon: "/libero.png" },
        { top: 100, left: 250, icon: "/ed.png" },
        { top: 150, left: 250, icon: "/geometrico.png" },
        { top: 200, left: 250, icon: "/41.png" },
        { top: 250, left: 250, icon: "/42.png" },
        { top: 250, left: 50, icon: "/43.png" },
        { top: 250, left: 100, icon: "/44.png" },
        { top: 250, left: 150, icon: "/45.png" },
        { top: 250, left: 200, icon: "/46.png" },
    ];

    return (
        <div className="circles-container-mapa" style={{ textAlign: "center" }}>
            {positions.map((pos, index) => {
                const ejercicio = ejercicios[index]; // Asigna un ejercicio a cada posición
                return (
                    <div
                        key={index}
                        className={`circle ${
                            index <= 7 ? "circle-nivel1" :
                            index <= 13 ? "circle-nivel2" :
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
