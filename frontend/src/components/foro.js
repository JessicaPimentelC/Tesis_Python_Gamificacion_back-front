import React, { useState, useEffect  } from 'react';
import '../styles/foro.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Foro = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [responseUsername, setResponseUsername] = useState("");
    const [responseText, setResponseText] = useState("");
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [tema, setTema] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_creacion, setFecha_creacion] = useState('');
    const [questions, setQuestions] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [participaciones, setParticipaciones] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/myapp/registroForo/');
            if (Array.isArray(response.data)) {
                const questionsWithAnswers = response.data.map((q) => ({
                    ...q,
                    participaciones_foro: q.participaciones_foro || [],  
                }));
                setQuestions(questionsWithAnswers);
            } else {
                console.error('La respuesta de la API no es un array:', response.data);
            }
        } catch (error) {
            console.error('Error obteniendo los foros:', error);
        }
    };
    
    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleBackClick = () => {
        navigate("/dashboard");
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const openModalRespuesta = () => {
        setIsResponseModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setIsResponseModalOpen(false);
    };

    const handleSubmit = async () => {
        if (username && question && tema && descripcion && fecha_creacion) {
            setQuestions([
                ...questions,
                {
                    user: username,
                    time:
                        new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }) +
                        " " +
                        new Date().toLocaleDateString(),
                    text: question,
                    answers: [],
                },
            ]);
            
            try {
                await handleRegistroForo();

                setUsername("");
                setQuestion("");
                setTema("");
                setDescripcion("");
                setFecha_creacion("");
                setSuccessMessage("¡Pregunta publicada y foro registrado exitosamente!");
                setTimeout(() => setSuccessMessage(""), 3000);
                closeModal();

            } catch (error) {
                console.error('Error registrando el foro:', error);
            }
        } else {
            alert("Por favor, completa todos los campos.");
        }
    };
    const handleVote = async (participacionId, tipoVoto) => {
        try {
            const response = await axios.post('http://localhost:8000/myapp/votar_respuesta/', {
                id_participacion_foro: participacionId,
                voto: tipoVoto, // 'like' o 'dislike'
            });
    
            if (response.data.success) {
                alert(`Voto registrado: ${tipoVoto === 'like' ? 'Me gusta' : 'No me gusta'}`);
                // Aquí puedes actualizar la UI o el estado local para reflejar el cambio
            }
        } catch (error) {
            console.error('Error al registrar el voto:', error);
        }
    };

    const fetchParticipaciones = async () => {
        try {
            const response = await axios.get('http://localhost:8000/myapp/participaciones/');
            setParticipaciones(response.data);
        } catch (error) {
            console.error('Error al obtener las participaciones:', error);
        }
    };


    useEffect(() => {
        fetchParticipaciones();
    }, []);

    const handleRegistroForo = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/myapp/registroForo/",
                { tema, descripcion, fecha_creacion }
            );

            console.log('Success:', response.data);
            fetchQuestions();
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al registrar el foro. Por favor, intenta de nuevo.');
        }
    };
    const fetchUsuario = async () => {
        try {
            const userResponse = await axios.get("http://localhost:8000/myapp/usuario-info/", {
                withCredentials: true, // Incluir cookies en la petición
            });
            
            console.log("Usuario:", userResponse.data.username);
            const usuario_id = userResponse.data.id; // Ajusta según la respuesta de tu API
            
            if (!usuario_id) {
                alert("Error: Usuario no identificado.");
                return;
            }
            return userResponse.data.id;
            // Llamar a fetchScore con el usuario_id

        } catch (error) {
            console.error("Error al obtener usuario:", error);
        }
    };

    const handleRegistroRespuestaForo = async () => {
        try {
            console.log('responseUsername:', responseUsername);  
            const userId = await fetchUsuario(responseUsername);
            console.log("id",userId)

        if (!userId) {
            alert('Usuario no encontrado.');
            return;
        }

            const response = await axios.post(
                "http://localhost:8000/myapp/registroParti_foro/",
                { 
                    usuario_id: userId,
                    foro_id: questions[currentQuestionIndex].id_foro,  // Usar 'id_foro' según tu estructura
                    fecha_participacion: new Date().toISOString().split('T')[0], 
                    comentario: responseText,
                    resultado: true 
                }
            );
    
            console.log('Success:', response.data);
    
            // Actualizar el estado para reflejar la nueva respuesta
            
            fetchParticipaciones();
            // Resetea los campos y cierra el modal
            setResponseUsername('');
            setResponseText('');
            closeModal();
    
        } catch (error) {
            console.error('Error registrando la respuesta:', error);
            alert('Ocurrió un error al registrar la respuesta. Por favor, intenta de nuevo.');
        }
    };


    const openResponseModal = (index) => {
        setCurrentQuestionIndex(index);
        setIsResponseModalOpen(true);
    };    

    const handleDeletePregunta = async (id_foro, index) => {
        try {
            const response = await axios.delete(`http://localhost:8000/myapp/eliminarRegistro_foro/${id_foro}`);
            if (response.status === 200) {
                // Actualiza el estado en el frontend
                setQuestions(questions.filter((_, i) => i !== index));
                alert('Pregunta eliminada exitosamente');
            }
            fetchParticipaciones();

        } catch (error) {
            console.error('Error al eliminar la pregunta:', error);
            alert('Hubo un error al eliminar la pregunta');
        }
    };
    const handleDeleteRespuesta = async (id_participacion_foro, index) => {
        try {
            const response = await axios.delete(`http://localhost:8000/myapp/eliminarParti_foro/${id_participacion_foro}/`);            console.log('Eliminar:', response.data);

            if (response.status === 200) {
                // Actualiza el estado en el frontend
                setQuestions(questions.filter((_, i) => i !== index));
                alert('Respuesta eliminada exitosamente');
            }
            fetchParticipaciones();

        } catch (error) {
            console.error('Error al eliminar la respuesta:', error);
            alert('Hubo un error al eliminar la respuesta');
        }
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredQuestions = questions.filter((q) => {

        if (!searchText) return true;
    
        const temaMatch = q.tema?.toLowerCase().includes(searchText.toLowerCase());
        const descripcionMatch = q.descripcion?.toLowerCase().includes(searchText.toLowerCase());
    
        return temaMatch || descripcionMatch;
    });

    return (

<div className="foro-container">
    <div className="foro-header">
        <button onClick={handleBackClick} className="back-button">
            <img src="/atrasa.png" alt="Back" className="back-icon" onClick={handleBackClick}/>
        </button>
        <input
            type="text"
            placeholder="Buscar por tema o descripción..."
            className="search-bar"
            value={searchText}
            onChange={handleSearchChange}
        />
        <div className="icon-group">
            <img src="/ubicacion.png" alt="Icon 1" className="header-icon" />
            <img src="/informacion.png" alt="Icon 2" className="header-icon" />
            <img src="/mensaje.png" alt="Icon 3" className="header-icon" />
            <img src="/AYUDA.jpeg" alt="Profile" className="header-icon" />
        </div>
    </div>
    <div className="foro-content">
        <div className="foro-subheader">
            <button className="new-question" onClick={openModal}>
                Nueva Pregunta
            </button>
        </div>
        <div className="foro-title">
            Únete a la conversación en nuestro foro
        </div>
        {successMessage && (
            <div className="success-message">{successMessage}</div>
        )}
        <div className="foro-questions">
            {filteredQuestions.map((q, index) => (
                    <div className="question" key={q.id_foro || `question-${index}`}>                    
                    <div className="question-header">
                        <p className="question-info">
                            Tema: {q.tema} | Fecha: {q.fecha_creacion}
                        </p>
                    </div>
                    <p className="question-text">{q.descripcion}</p>
                    <button className='new-question' onClick={() => openResponseModal(index)}>Responder</button>
                    <div className="answers">
                    {q.participaciones_foro && q.participaciones_foro.map((a, id_participacion_foro) => (
    <div className="answer" key={a.id_participacion_foro || `answer-${q.id_foro}-${id_participacion_foro}`}>                                    <div className="answer-header">
                                    <p className="answer-info">
                                        Respuesta de {a.usuario} en {a.fecha_participacion}
                                    </p>
                                </div>
                                <p className="answer-text">{a.comentario}</p>
                                <div className="actions">
                                    <div className="like-dislike">
                                        <img
                                            src="/like.png"
                                            alt="Like"
                                            className="like-icon"
                                            onClick={() => handleVote(a.id, 'like')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <img
                                            src="/dislike.png"
                                            alt="Dislike"
                                            className="dislike-icon"
                                            onClick={() => handleVote(a.id, 'dislike')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                    <div className="additional-actions">
                                        <img
                                            src="/eliminar.png"
                                            alt="Eliminar"
                                            className="action-icon"
                                            onClick={() => handleDeleteRespuesta(a.id_participacion_foro, index)}                                            
                                            />
                                        <img
                                            src="/correo.png"
                                            alt="Correo"
                                            className="action-icon"
                                            onClick={() => openResponseModal(index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="actions">
                        <div className="additional-actions">
                            <img
                                src="/eliminar.png"
                                alt="Eliminar"
                                className="action-icon"
                                onClick={() => handleDeletePregunta(index)}
                            />
                            <img
                                src="/correo.png"
                                alt="Correo"
                                className="action-icon"
                                onClick={() => openResponseModal(index)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    {/* Modales */}
    {isModalOpen && (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Publicar Nueva Pregunta</h2>
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="modal-input"
                />
                <input
                    type="text"
                    placeholder="Tema"
                    value={tema}
                    onChange={(e) => setTema(e.target.value)}
                    className="modal-input"
                />
                <textarea
                    placeholder="Descripción de la Pregunta"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="modal-textarea"
                />
                <textarea
                    placeholder="Descripción del Foro"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="modal-textarea"
                />
                <input
                    type="date"
                    value={fecha_creacion}
                    onChange={(e) => setFecha_creacion(e.target.value)}
                    className="modal-input"
                />
                <button onClick={handleSubmit} className="modal-button">
                    Publicar
                </button>
                <button onClick={closeModal} className="modal-close">
                    Cerrar
                </button>
            </div>
        </div>
    )}
    {isResponseModalOpen && (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Responder Pregunta</h2>
                <textarea
                    placeholder="Descripción de la Respuesta"
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="modal-textarea"
                />
                <button
                    onClick={handleRegistroRespuestaForo}
                    className="modal-button response-button"
                >
                    Publicar Respuesta
                </button>
                <button onClick={closeModal} className="modal-close">
                    Cerrar
                </button>
            </div>
        </div>
    )}
</div>



    );
    
};

export default Foro;