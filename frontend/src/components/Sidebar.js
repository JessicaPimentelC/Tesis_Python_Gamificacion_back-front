import React, { useState } from 'react';
import SidebarToggle from './SidebarToggle'; // Asegúrate de tener el componente Sidebar importado

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Función para alternar el estado del sidebar
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
        <button className="menu-btn" onClick={toggleSidebar}>
            ☰
        </button>
        {/* Sidebar con estado isOpen */}
        <SidebarToggle isOpen={isOpen} />
        {/* Fondo oscuro cuando el sidebar esté abierto */}
        {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        </>
    );
};

export default Sidebar;
