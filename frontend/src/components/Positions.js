import React, { useState } from 'react';
import '../styles/positions.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Positions = ({ toggleView }) => {
    const [loadingProgress2, setLoadingProgress2] = React.useState(0);
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate(); 
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const users = [
        { id: 1, avatar: '👩', name: 'Usuario01', points: 120 },
        { id: 2, avatar: '👩‍🦰', name: 'Usuario02', points: 100 },
        { id: 3, avatar: '👨‍💼', name: 'Usuario03', points: 80 },
        { id: 4, avatar: '👩‍🦳', name: 'Usuario04', points: 60 },
        { id: 5, avatar: '🐲', name: 'Usuario05', points: 44 },
    ];
    React.useEffect(() => {
        const interval2 = setInterval(() => {
        setLoadingProgress2((oldProgress) => {
            if (oldProgress === 100) {
            clearInterval(interval2);
            return 100;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
        });
        }, 500);

        return () => {
        clearInterval(interval2);
        };
    }, []);

    const handleControlPanelClick = () => {
    };

    const handleCerrarSesionClick = () => {
        setShowModal(true);
    };

    const handleConfirmCerrarSesion = () => {
        // Logic to log out
    setShowModal(false);
    window.location.href = 'http://localhost:3000/login'; // Redirect to login page
    };
    //"http://localhost:8000/myapp/login/",

    const handleCancelCerrarSesion = () => {
        setShowModal(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLessonClick = () => {
        navigate('/lesson');
    };

    const handlePositionsClick = () => {
        // Logic to handle click on positions box
        navigate('/posiciones');
    };

    const handleChallengesClick = () => {
        // Logic to handle click on challenges box
        navigate('/challenges');
    };

    const handlePythonIconClick = () => {
        navigate('/lecciones'); 
    };
    const handleForoIconClick = () => {
        navigate('/foro'); 
    };
    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    return (
        <div className="dashboard-container-posiciones">
        <Sidebar/>
        <Header/>

        <div className="dashboard-content-posiciones">
                <div className="medals">
                    <span role="img" aria-label="gold">🥇</span>
                    <span role="img" aria-label="silver">🥈</span>
                    <span role="img" aria-label="bronze">🥉</span>
                </div>
                <div className="info-text">
                    <span>Texto 1</span>
                    <span>Frase Informativa</span>
                </div>
        
        </div>
        <table className="leaderboard">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Avatar</th>
                        <th>Nombre</th>
                        <th>Puntos</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.avatar}</td>
                            <td>{user.name}</td>
                            <td>{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

export default Positions;