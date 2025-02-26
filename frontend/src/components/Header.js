import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import PinguinoModal from "./PinguinoModal";

const Header = () => {
    const [currentTime, setCurrentTime] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isModalOpenPinguino, setIsModalOpenPinguino] = useState(false);

    const openModalPinguino = () => {
        setIsModalOpenPinguino((prevState) => !prevState); // Alterna el estado del modal
        console.log("clikeado pinguino", isModalOpenPinguino);
    };
    const handleForoIconClick = () => {
        navigate("/foro");
    };
    const handleInsigniasIconClick = () => {
        navigate("/insignias");
    };
    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    const handleCerrarSesionClick = () => {
        setShowModal(true);
    };

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleString());
        }, 1000); // Actualiza cada segundo

        return () => clearInterval(interval);
    }, []);

    const handleConfirmCerrarSesion = () => {
        // Logic to log out
        setShowModal(false);
        window.location.href = '"http://localhost:8000/myapp/login/';
    };
    //"http://localhost:8000/myapp/login/",

    const handleCancelCerrarSesion = () => {
        setShowModal(false);
    };
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const openResponseModal = (index) => {
        setCurrentQuestionIndex(index);
        setIsResponseModalOpen(true);
    };
    const handleBackClick = () => {
        navigate("/dashboard");
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const openModalRespuesta = () => {
        setIsResponseModalOpen(true);
    };

    const closePinguino = () => {
        setIsModalOpenPinguino(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsResponseModalOpen(false);
    };


    return (
        <div className="dashboard-header">
            <button onClick={handleBackClick} className="back-button">
                <img src="/atrasa.png" alt="Back" className="back-icon" onClick={handleBackClick}/>
            </button>
            <div className="icon-group-header">

                <img src="ubicacion.png" alt="Icon 1" className="header-icon" />
                <button className="icon-button-mapa" onClick={handleInsigniasIconClick}>
                    <img src="/bandera.png" alt="Icono Insignias" className="header-icon" />
                </button>
                <button className="icon-button-mapa" onClick={openModalPinguino}>
                    <img src="/muñeco.png" alt="Icono Moneda" className="header-icon"/>
                </button>
                {isModalOpenPinguino && <PinguinoModal onClick={openModalPinguino} />}
                <button className="icon-button-mapa" onClick={handleForoIconClick}>
                    <img src="mensaje.png" alt="Icon 3" className="header-icon" />
                </button>
                <img
                    src="/AYUDA.jpeg"
                    alt="Imagen de perfil"
                    className="profile-picture"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <button
                            onClick={() => navigate("/perfil")}
                            className="dropdown-item"
                        >
                            Perfil
                        </button>
                        <button onClick={handleCerrarSesionClick} className="dropdown-item">
                            Cerrar Sesión
                        </button>
                    </div>
                )}
            </div>
            <div
                className="user-profile"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            ></div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>¿Deseas cerrar sesión?</p>
                        <button onClick={handleConfirmCerrarSesion}>Sí</button>
                        <button onClick={handleCancelCerrarSesion}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Header;
