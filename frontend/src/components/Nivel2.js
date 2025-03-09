import React, { useState, useEffect } from "react";
import "../styles/Nivel1.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Nivel2 = () => {
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
                <button className="icon-button">
                    <img src="python1.png" alt="Icono Nivel" />
                </button>
                <div className="header-title">
                    <h2>NIVEL 2</h2>
                </div>
                <div className="header-status">
                    <span></span>
                    <button className="icon-button">
                    <img src="informacion.png" alt="Icono Moneda" />
                    </button>
                    <button className="icon-button">
                    <img src="ubicacion.png" alt="Icono Pregunta" />
                    </button>
                    <button className="icon-button">
                    <img src="AYUDA.jpeg" alt="Icono Perfil" />
                    </button>
                </div>
                </div>
                <p>¡𝙀𝙡 𝙥𝙧𝙞𝙢𝙚𝙧 𝙣𝙞𝙫𝙚𝙡 𝙚𝙨𝙩á 𝙘𝙤𝙢𝙥𝙡𝙚𝙩𝙖𝙙𝙤, 𝙥𝙪𝙚𝙙𝙚𝙨 𝙘𝙤𝙣𝙩𝙞𝙣𝙪𝙖𝙧 𝙖𝙡 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 𝙣𝙞𝙫𝙚𝙡!</p>
                <div className={`nivel1-card ${showNext ? "fade-out" : ""}`}>
                <div className="nivel1-card-header">
                    <span>Estructuras de decisión                    </span>
                </div>
                <div className="nivel1-card-body">
                    <p>Las estructuras de decisión controlan el flujo del programa según condiciones lógicas. Estas condiciones generalmente se expresan mediante operadores relacionales (<code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>) y operadores lógicos (<code>and</code>, <code>or</code>, <code>not</code>).</p>

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

        {/* Modal */}
        {showModal && (
            <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>¡Hola, soy pingui!</h2>
                <p>
                Aquí podrás encontrar todas las ayudas que necesites para
                completar los ejercicios. ¡No dudes en consultarlo cuando lo
                necesites!
                </p>

                <div className="nivel1-card-header">
                <p>Seleccione una Ayuda:</p>
                </div>

                {/* Contenedor de los iconos en forma vertical */}
                <div className="modal-icons">
                <button
                    className="modal-icon-button"
                    onClick={() => alert("Ayuda 1: Idea")}
                >
                    <img src="idea.gif" alt="Icono 1" className="modal-icon" />
                </button>

                <button
                    className="modal-icon-button"
                    onClick={() => alert("Ayuda 2: Apoyo")}
                >
                    <img src="apoyo.gif" alt="Icono 2" className="modal-icon" />
                </button>

                <button
                    className="modal-icon-button"
                    onClick={() => alert("Ayuda 3: Cuaderno")}
                >
                    <img src="cuaderno.gif" alt="Icono 3" className="modal-icon" />
                </button>
                </div>

                <button onClick={closeModal}>Cerrar</button>
            </div>
            </div>
        )}
        </div>
    );
};

export default Nivel2;
