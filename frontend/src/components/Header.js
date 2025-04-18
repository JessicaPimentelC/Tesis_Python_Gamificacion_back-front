import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import PinguinoModal from "./PinguinoModal";
import Mapa from "./Mapa";
import Chatbot from "./Chatbot";


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
                <button className="icon-button-mapa" onClick={handleInsigniasIconClick}>
                    <img src="/bandera_header.png" alt="Icono Insignias" className="header-icon" />
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
