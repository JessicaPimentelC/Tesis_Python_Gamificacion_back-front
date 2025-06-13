import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import Mapa from "./Mapa";
import Chatbot from "./Chatbot";
import API_BASE_URL from "../config";
import axios from "axios";
import {getCSRFToken } from "../utils/validacionesGenerales.js";


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
    const [isModalOpenMapa, setIsModalOpenMapa] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    
    const openModalMapa = () => {
        setIsModalOpenMapa((prevState) => !prevState); // Alterna el estado del modal
        console.log("clikeado mapa", isModalOpenMapa);

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
    const handleLogout = async () => {
        try {
        // 1. Obtener el CSRF token antes de hacer logout
        const csrfToken = getCSRFToken();
        
        // 2. Hacer la petición de logout al backend
        await axios.post(`${API_BASE_URL}/logout/`, {}, {
            headers: {
                "Content-Type": "application/json"
            }        });
        
    } catch (error) {
        console.error("Error en logout:", error);
    } finally {
        // 3. Limpiar todo en el frontend
        localStorage.clear();
        sessionStorage.clear();
        
        // 4. Borrar manualmente las cookies relacionadas con la sesión
        document.cookie = 'sessionid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'csrftoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
        // 5. Redirigir al inicio
        navigate('/', { replace: true });
        
        // 6. Recargar la página para asegurar limpieza completa
        window.location.reload();
    }
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
        navigate('/')
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
        navigate(-1);
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
    const closeModalMapa = () => {
        setIsModalOpenMapa(false); // Cerrar el modal
    };
    const openModalPinguino = () => {
        setIsModalOpenPinguino(!isModalOpenPinguino);
    };
    
    const handlePenguinClick = () => {
        setShowChatbot(true);
    };

    const handleCloseChatbot = () => {
        setShowChatbot(false);
    };
    const handlePositionsClick = () => {
        // Logic to handle click on positions box
        navigate("/ranking");
    };
    return (
        <div className="dashboard-header">
            <div className="header-buttons">
            <button className="boton-inicio" onClick={() => navigate('/dashboard')}>
            <img 
                className="header-icon" 
                src="/tesis.png" 
                alt="Icono"  
            />
            </button>
            {/**<button onClick={handleBackClick} className="button-atras">
                <img src="/atrasa.png" alt="Back" className="header-icon" onClick={handleBackClick}/>
            </button>**/}
            </div>
            <div className="icon-group-header">

            <button className="icon-button-mapa" onClick={openModalMapa}>
            <img src="/colombia.png" alt="Icono Mapa" className="header-icon" />
        </button>
        {isModalOpenMapa && (
            <div className="modal-mapa">
            <div className="modal-content-mapa">
                <h2 style={{ textAlign: "center" }}>Mapa</h2>
                <button className="close-button" onClick={closeModalMapa}>
                Cerrar
                </button>
                <Mapa /> {/* Aquí se muestra el mapa dentro del modal */}
            </div>
            </div>
        )}
                <button className="icon-button-mapa" onClick={handlePositionsClick}>
                    <img src="/ranking.png" alt="Icono Insignias" className="header-icon" />
                </button>
                <button className="icon-button-mapa" onClick={handlePenguinClick}>
                    <img src="/muñeco.png" alt="Icono Moneda" className="header-icon"/>
                </button>           
                    {showChatbot && (
                    <Chatbot onClose={handleCloseChatbot} />
                    )}
                <button className="icon-button-mapa" onClick={handleForoIconClick}>
                    <img src="/foro.png" alt="Icon 3" className="header-icon" />
                </button>
                <button className="icon-button-mapa" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img
                    src="/perfil.png"
                    alt="Imagen de perfil"
                    className="profile-picture"
                />
                </button>

                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <button
                            onClick={() => navigate("/perfil")}
                            className="dropdown-item"
                        >
                            Perfil
                        </button>
                        <button onClick={handleLogout} className="dropdown-item">
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
