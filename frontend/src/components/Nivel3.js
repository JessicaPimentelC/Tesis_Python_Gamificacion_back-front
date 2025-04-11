import React, { useState, useEffect } from "react";
import "../styles/Nivel1.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderInfo from "./HeaderInfo";

const Nivel3 = () => {
    const [input1, setInput1] = useState("");
    const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
    const [showNext, setShowNext] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate(); // Hook para la redirección
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

    const closeModal = () => {
        setShowModal(false); // Cerrar el modal
    };

    const handleMouseLeave = () => {
        // No hacemos nada aquí para evitar el parpadeo
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleNextClick = () => {
        setShowNext(true);
    };

    const handleContinueClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmYes = () => {
        navigate("/Nivel2/Basicos/1"); // Cambia la vista al módulo Ejercicios1
    };

    const handleConfirmNo = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="nivel1-page">
        <Sidebar></Sidebar>
        {/* Barra de carga alineada a la izquierda de la pantalla */}
        {/**<div className="loading-indicator-outer">
            <LoadingIndicator /> {/* Reemplaza ProgressBar con LoadingIndicator </div>**/}
        <div className="nivel1-container">
            {/* Contenedor principal con el cuadro de información y el contenido principal */}
            <div className="content">
            {/* Contenedor de información sin GIF */}

            {/* Sección principal con el ejercicio */}

            <div className="white-background">

                <div className="header">
                <HeaderInfo></HeaderInfo>
                </div>
                <div className="header-title">
                    <h2>NIVEL 3</h2>
                </div>
                <p>¡𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙖𝙨𝙩𝙚 𝙚𝙡 𝙣𝙞𝙫𝙚𝙡 𝟮 𝙘𝙤𝙣 é𝙭𝙞𝙩𝙤, 𝙛𝙚𝙡𝙞𝙘𝙞𝙩𝙖𝙘𝙞𝙤𝙣𝙚𝙨! ¡𝙀𝙨𝙩á𝙨 𝙚𝙣 𝙚𝙡 ú𝙡𝙩𝙞𝙢𝙤 𝙣𝙞𝙫𝙚𝙡!</p>
                <div className={`nivel1-card ${showNext ? "fade-out" : ""}`}>
                <div className="nivel1-card-header">
                    <span>Estructuras de repetición                    </span>
                </div>
                <div className="nivel1-card-body">
                    <p>Las estructuras de repetición permiten ejecutar instrucciones mas de una vez. Se caracterizan por tener un punto inicial de partida y una condiición final</p>

                    <div className="nivel1-card-button-container">
                    {!showNext && (
                        <button
                        className="nivel1-card-button"
                        onClick={handleNextClick}
                        >
                        Siguiente
                        </button>
                    )}
                    </div>
                </div>
                {showNext && !showConfirmation && (
                    <div className="nivel1-next-section show">
                    <h2>¿Por qué aprender las estructuras de decisión en Python?</h2>
                    <p>
                    Las estructuras de decisión son fundamentales en la programación porque permiten que un programa tome decisiones y ejecute diferentes bloques de código según condiciones específicas. Su importancia radica en varios aspectos clave
                    </p>
                    <div className="nivel1-next-button-container">
                        <button
                        className="nivel1-next-button"
                        onClick={handleContinueClick}
                        >
                        Continuar
                        </button>
                    </div>
                    </div>
                )}
                {showConfirmation && (
                    <div className="confirmation-popup">
                    <p>
                        ¿Estás listo para empezar esta aventura de la programación?
                    </p>
                    <div className="confirmation-buttons">
                        <button
                        className="confirmation-button"
                        onClick={handleConfirmYes}
                        >
                        Sí
                        </button>
                        <button
                        className="confirmation-button"
                        onClick={handleConfirmNo}
                        >
                        No
                        </button>
                    </div>
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Nivel3;
