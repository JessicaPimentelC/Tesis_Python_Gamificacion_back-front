import React, { useState } from 'react';
import '../styles/PinguinoModal.css';

const PinguinoModal = () => {
    const [showPenguinModal, setShowPenguinModal] = useState(false);
    const [showPengui, setShowPenguin] = useState(false);


    const handlePenguinClick = () => {
        setShowPenguinModal(true); // Al hacer clic, se muestra el modal y se oculta el pingüino
    };

    const closeShowPinguino = () => {
        setShowPenguinModal(false); // Al cerrar el modal, vuelve a aparecer el pingüino
    };    
    const closePinguino = () => {
        setShowPenguinModal(false); // Al cerrar el modal, vuelve a aparecer el pingüino
    };
    console.log("estado pinguino", showPenguinModal)
    return (
        <div className="penguin-content">
            {/* Renderiza el pingüino solo si el modal está cerrado */}
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
                        <p>Aquí podrás encontrar todas las ayudas que necesites para completar los ejercicios. ¡No dudes en consultarlo cuando lo necesites!</p>
                        
                        <div className="nivel1-card-header">
                            <p>Seleccione una Ayuda:</p>
                        </div>
                        
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

                        <button onClick={closePinguino}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PinguinoModal;
