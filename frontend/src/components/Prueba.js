import React, { useState } from "react";
import "../styles/prueba.css";

const Prueba1 = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
            ☰
        </button>
        <nav>
            <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Perfil</a></li>
            <li><a href="#">Configuración</a></li>
            </ul>
        </nav>
        </div>
    );
    };

const Prueba = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
    <div className="dashboard-container">
      {/* Botón de menú visible en móviles */}
        <button className="menu-btn" onClick={toggleSidebar}>
            ☰
        </button>

        <Prueba1 isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

        <div className="main-content">
            <header>
            <h1>Dashboard</h1>
            </header>
            <section className="cards">
            <div className="card">Card 1</div>
            <div className="card">Card 2</div>
            <div className="card">Card 3</div>
            </section>
        </div>
        </div>
    );

};

export default Prueba;