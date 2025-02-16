import React, { useState, useEffect } from "react";
import "../styles/HeaderInfo.css";
import { useNavigate } from "react-router-dom";
import Mapa from "./Mapa";
import PinguinoModal from "./PinguinoModal";

const HeaderInfo = () => {
    const [isModalOpenPinguino, setIsModalOpenPinguino] = useState(false);
    const navigate = useNavigate();
    const [isModalOpenMapa, setIsModalOpenMapa] = useState(false);

    const openModalPinguino = () => {
        setIsModalOpenPinguino((prevState) => !prevState); // Alterna el estado del modal
        console.log("clikeado pinguino", isModalOpenPinguino);
    };
    const openModalMapa = () => {
        setIsModalOpenMapa((prevState) => !prevState); // Alterna el estado del modal
        console.log("clikeado mapa", isModalOpenMapa);

    };

    const closeModal = () => {
        setIsModalOpenMapa(false); // Cerrar el modal
    };
    const closeModalPinguino = () => {
        setIsModalOpenPinguino(false); // Cerrar el modal
    }
    return (
    <div className="header-status">
        <span></span>
        <button className="icon-button-mapa" onClick={openModalPinguino}>
            <img src="/muñeco.png" alt="Icono Moneda" />
        </button>
        {isModalOpenPinguino && <PinguinoModal onClick={openModalPinguino} />}
        
        <button className="icon-button-mapa" onClick={openModalMapa}>
            <img src="/colombia.png" alt="Icono Mapa" className="info-icon" />
        </button>
        {isModalOpenMapa && (
            <div className="modal-mapa">
            <div className="modal-content-mapa">
                <h2 style={{ textAlign: "center" }}>Mapa</h2>
                <button className="close-button" onClick={closeModal}>
                Cerrar
                </button>
                <Mapa /> {/* Aquí se muestra el mapa dentro del modal */}
            </div>
            </div>
        )}
        </div>
    );
};

export default HeaderInfo;
