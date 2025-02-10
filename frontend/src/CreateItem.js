import React from 'react';
import './Dashboard.css';

const CreateItem = () => {
  return (
    <div className="dashboard-container">
      <h1>Crear Nuevo Item</h1>
      <form>
        <div className="form-group">
          <input type="text" placeholder="Nombre del Item" />
        </div>
        <div className="form-group">
          <textarea placeholder="Descripción del Item"></textarea>
        </div>
        <button type="submit">Crear</button>
      </form>
      {/* Añade más contenido de creación aquí */}
    </div>
  );
};

export default CreateItem;
