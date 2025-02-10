import { useNavigate } from "react-router-dom";
import "../styles/1.css"; // Asegúrate de que la ruta sea correcta
import React from 'react';
const Mapa = () => {
    const navigate = useNavigate(); // Hook para la redirección

    const positions = [
        { top: 50, left: 50, icon: "/colombia.png" }, // Posición 1
        { top: 50, left: 100, icon: "/cohetee.png" }, // Posición 2
        { top: 50, left: 150, icon: "/empresario.png" }, // Posición 3
        { top: 50, left: 200, icon: "/tres.png" }, // Posición 4
        { top: 50, left: 250, icon: "/libero.png" }, // Posición 5
        { top: 100, left: 250, icon: "/ed.png" }, // Posición 6
        { top: 150, left: 250, icon: "/geometrico.png" }, // Posición 7
        { top: 200, left: 250, icon: "/41.png" }, // Posición 8
        { top: 250, left: 250, icon: "/42.png" }, // Posición 9
        { top: 250, left: 50, icon: "/43.png" }, // Posición 10
        { top: 250, left: 100, icon: "/44.png" }, // Posición 11
        { top: 250, left: 150, icon: "/45.png" }, // Posición 12
        { top: 250, left: 200, icon: "/46.png" }, // Posición 13

    ];
    return (
        <div className="circles-container-mapa" style={{ textAlign: "center" }}>
        {positions.map((pos, index) => (
            <div
            key={index}
            className={`circle ${
                index <= 7
                ? "circle-nivel1"
                : index <= 13
                ? "circle-nivel2"
                : "circle-nivel3"
            }`}
            style={{
                position: "absolute",
                top: `${pos.top}px`,
                left: `${pos.left}px`,
            }}
            onClick={() => {
                if (index === 0) {
                navigate('/nivel1'); 
                }
                if (index === 8){
                navigate('/nivel2');

                }
            }}
            >
            <img src={pos.icon} alt={`Icon ${index}`} />
            </div>
        ))}
        </div>
    );
};

export default Mapa;
