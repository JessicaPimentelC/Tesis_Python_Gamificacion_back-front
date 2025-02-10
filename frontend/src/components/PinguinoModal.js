import React, { useState } from 'react';
import '../styles/PinguinoModal.css';
import { useNavigate } from 'react-router-dom';

const PinguinoModal = () => {
    const navigate = useNavigate(); // Hook para la redirección
    const [showPenguinModal, setShowPenguinModal] = useState(false); // Estado para controlar el modal

    const handlePenguinClick = () => {
        setShowPenguinModal((prevState) => !prevState); 

    };

    const closeModal = () => {
        setShowPenguinModal(false); 
    };
    const closePinguino = () => {
        setShowPenguinModal(false); 
    };
    return (
        <div className="penguin-content">
            <div className="penguin-container" onClick={handlePenguinClick}>
                <div className="penguin" >
                    
                    <div className="eye left"></div>
                    <div className="eye right"></div>
                    <div className="beak"></div>
                    <div className="foot left"></div>
                    <div className="foot right"></div>
                </div>
            </div>

            {showPenguinModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>¡Hola, soy pingui!</h2>
                        <p>Aquí podrás encontrar todas las ayudas que necesites para completar los ejercicios. ¡No dudes en consultarlo cuando lo necesites!</p>
                        
                        <div className="nivel1-card-header">
                            <p>Seleccione una Ayuda:</p>
                        </div>
                        
                        {/* Contenedor de los iconos en forma vertical */}
                        <div className="modal-icons">
                            <button className="modal-icon-button" onClick={() => alert('Ayuda 1: Idea')}>
                                <img src="/idea.gif" alt="Icono 1" className="modal-icon" />
                            </button>
                            
                            <button className="modal-icon-button" onClick={() => alert('Ayuda 2: Apoyo')}>
                                <img src="/apoyo.gif" alt="Icono 2" className="modal-icon" />
                            </button>

                            <button className="modal-icon-button" onClick={() => alert('Ayuda 3: Cuaderno')}>
                                <img src="/cuaderno.gif" alt="Icono 3" className="modal-icon" />
                            </button>
                        </div>

                        <button onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PinguinoModal;
