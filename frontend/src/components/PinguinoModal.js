import React, { useState } from 'react';
import '../styles/PinguinoModal.css';

const PinguinoModal = ({ onPenguinClick }) => {
    const [showPenguinModal, setShowPenguinModal] = useState(false);

    const handlePenguinClick = () => {
        setShowPenguinModal(true);
    };

    const closePinguino = () => {
        setShowPenguinModal(false);
    };

    const handleHelpClick = () => {
        if (onPenguinClick) {
            onPenguinClick(); // 🔥 Este activa el chatbot
        }
        setShowPenguinModal(false); // Opcional: cerrar el modal
    };

    return (
        <div className="penguin-content">
            {!showPenguinModal && (
                <div className="penguin-container" onClick={handlePenguinClick}>
                    <div className="penguin">
                        <div className="eye left"></div>
                        <div className="eye right"></div>
                        <div className="beak"></div>
                        <div className="foot left"></div>
                        <div className="foot right"></div>
                    </div>
                </div>
            )}

            {showPenguinModal && (
                <div className="modal-overlay" onClick={closePinguino}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>¡Hola, soy Pingui!</h2>
                        <p>Aquí podrás encontrar todas las ayudas que necesites para completar los ejercicios.</p>

                        <div className="nivel1-card-header">
                            <p>Seleccione una Ayuda:</p>
                        </div>

                        <div className="modal-icons">
                            <button className="modal-icon-button" onClick={handleHelpClick}>
                                <img src="/idea.gif" alt="Icono 1" className="modal-icon" />
                            </button>

                            <button className="modal-icon-button" onClick={handleHelpClick}>
                                <img src="/apoyo.gif" alt="Icono 2" className="modal-icon" />
                            </button>

                            <button className="modal-icon-button" onClick={handleHelpClick}>
                                <img src="/cuaderno.gif" alt="Icono 3" className="modal-icon" />
                            </button>
                        </div>

                        <button onClick={closePinguino}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PinguinoModal;
