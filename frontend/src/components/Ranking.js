import React, { useState, useEffect } from 'react';
import '../styles/ranking.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import API_BASE_URL from "../config";
import axios from 'axios';

const Ranking = () => {
    const [loadingProgress2, setLoadingProgress2] = React.useState(0);
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate(); 
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [usuarios, setUsuarios] = useState([]);  
    const [score, setScore] = useState(0);
    const [ranking, setRanking] = useState([]);

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

    useEffect(() => {
        const listarUsuarios = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/myapp/usuarios/`, {
                    withCredentials: true,  
                });
                setUsuarios(response.data); 
                setLoading(false); 
            } catch (error) {
                console.error("Error al obtener los usuarios:", error.response?.data || error.message);
                setLoading(false);
            }
        };

    listarUsuarios();
    }, []);
    useEffect(() => {
        const obtenerPuntaje = async () => {
            try {
                const rankingResponse = await axios.get(`${API_BASE_URL}/myapp/ranking`);
                setRanking(rankingResponse.data); 
                setLoading(false); 
            } catch (error) {
                console.error("Error al obtener los ranking:", error.response?.data || error.message);
                setLoading(false);
            }
        };

    obtenerPuntaje();
    }, []);
    const getMedalla = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `#${index + 1}`;
    };
    return (
        <div className="editar-container">
        <Header></Header>
        <div className="editar-content">
            <div className="editar-header">
            <h2>Ranking de usuarios</h2>
            </div>
            <div className="table-content">
            {loading ? (
                        <p>Cargando usuarios...</p>
                    ) : usuarios.length > 0 ? (
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Posición</th>
                                    <th>Nombre de usuario</th>
                                    <th>Puntaje acumulado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ranking.map((usuario, index) => (
                                    <tr key={index} className={`ranking-item ${index < 3 ? 'top3' : ''}`}>
                                        <td>{getMedalla(index)}</td>
                                        <td>{usuario.username}</td>
                                        <td>{usuario.puntos}</td> 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay usuarios registrados.</p>
                    )}
                </div>
            </div>
        </div> 

    );
};

export default Ranking;