// src/EditProfileModal.js

import React from 'react';
import '../styles/EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, profilePicture, onLogout }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>
          <img src={profilePicture} alt="Profile Logo" className="profile-logo" />
          Editar Perfil
        </h2>
        <form>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" placeholder="Nombre" />
          </div>
          <div className="form-group">
            <label>Usuario</label>
            <input type="text" placeholder="Usuario" />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" placeholder="Correo Electrónico" />
          </div>
          <button type="submit" className="save-button">Guardar Cambios</button>
        </form>
        <div className="modal-footer">
          <button className="delete-button">Eliminar Cuenta</button>
          <button className="logout-button" onClick={onLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
