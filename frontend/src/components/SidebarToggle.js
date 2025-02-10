import React from 'react';
import '../styles/Sidebar.css';
import { useNavigate } from "react-router-dom";

const SidebarToggle = ({ isOpen }) => {  
    const navigate = useNavigate();
    
    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <nav>
                <img 
                    className="sidebar-imagen" 
                    src="/tesis.png" 
                    alt="Icono" 
                    onClick={() => navigate('/dashboard')} 
                    style={{ cursor: 'pointer' }} 
                />
            </nav>
        </div>
    );
};

export default SidebarToggle;
