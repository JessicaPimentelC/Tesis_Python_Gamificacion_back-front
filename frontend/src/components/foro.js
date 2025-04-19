import React, { useState, useEffect } from "react";
import "../styles/foro.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_BASE_URL from "../config";
import { esAdmin } from "../utils/validacionUsuario"; 
import Swal from 'sweetalert2';

const Foro = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [responseUsername, setResponseUsername] = useState("");
  const [responseText, setResponseText] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [tema, setTema] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_creacion, setFecha_creacion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [participaciones, setParticipaciones] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);
  const [score, setScore] = useState(0);
  
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/myapp/registroForo/`
      );
      if (Array.isArray(response.data)) {
        const questionsWithAnswers = response.data.map((q) => ({
          ...q,
          participaciones_foro: q.participaciones_foro || [],
        }));
        setQuestions(questionsWithAnswers);
      } else {
        console.error("La respuesta de la API no es un array:", response.data);
      }
    } catch (error) {
      console.error("Error obteniendo los foros:", error);
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
    console.log("Valores antes de enviar:", {
      tema,
      descripcion,
      fecha_creacion,
    });

    if (tema && descripcion && fecha_creacion) {
      setQuestions([
        ...questions,
        {
          time:
            new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) +
            " " +
            new Date().toLocaleDateString(),
          text: descripcion,
          answers: [],
        },
      ]);

      try {
        await handleRegistroForo();

        setTema("");
        setDescripcion("");
        setFecha_creacion("");
        setSuccessMessage(
          "¡Pregunta publicada y foro registrado exitosamente!"
        );
        setTimeout(() => setSuccessMessage(""), 3000);
        closeModal();
      } catch (error) {
        console.error("Error registrando el foro:", error);
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };
  useEffect(() => {
    fetchUsuario();
  }, []);

  const getCSRFToken = () => {
    const cookies = document.cookie.split("; ");
    const csrfCookie = cookies.find((cookie) => cookie.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : "";
  };

  const handleVote = async (participacionId, tipoVoto) => {

    try {
      const csrfToken = getCSRFToken();
      const response = await axios.post(
        `${API_BASE_URL}/myapp/votar_respuesta/`,
        {
          id_participacion_foro: participacionId,
          resultado: tipoVoto,  // 'like' es true, 'dislike' es false
        },
        {headers: {
          "X-CSRFToken": csrfToken,  // Incluir el token CSRF en el header
        },
        withCredentials: true,  // Asegurarse de incluir cookies de sesión
      }
      );
  
      if (response.data.success) {
        console.log("puntaje",response.data.puntaje)
        setScore(response.data.puntaje);  // Actualizar el puntaje con el valor devuelto por la API
        Swal.fire({
          icon: "success",
          title: "¡Voto registrado!",
          text:
            tipoVoto === "like"
              ? "Le diste un Me Gusta a la respuesta"
              : "No te gustó esta respuesta",
        });
      }
    } catch (error) {
      console.error("Error al registrar el voto:", error.response || error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data.error : "No se pudo registrar tu voto.",
      });
    }
  };
  

  const fetchParticipaciones = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/myapp/participaciones/`
      );
      setParticipaciones(response.data);
    } catch (error) {
      console.error("Error al obtener las participaciones:", error);
    }
  };

  useEffect(() => {
    fetchParticipaciones();
  }, []);

  const handleRegistroForo = async () => {
    console.log("Usuario ID:", usuarioId);  // 🔍 Verifica si usuarioId tiene un valor correcto
    if (!usuarioId) {
      alert("Error: usuario_id no definido");
      return;
    }
    try {

      const response = await axios.post(
        `${API_BASE_URL}/myapp/registroForo/`,
        { usuario_id: usuarioId, tema, descripcion, fecha_creacion }
      );

      console.log("Success:", response.data);
      fetchQuestions();
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Ocurrió un error al registrar el foro. Por favor, intenta de nuevo."
      );
    }
  };
  const fetchUsuario = async () => {
    try {
      const userResponse = await axios.get(
        `${API_BASE_URL}/myapp/usuario-info/`,
        {
          withCredentials: true, // Incluir cookies en la petición
        }
      );

      console.log("Usuario:", userResponse.data.username);
      const usuario_id = userResponse.data.id; // Ajusta según la respuesta de tu API
      setUsername(userResponse.data.username);
      setUsuarioId(userResponse.data.id);

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
      console.log("responseUsername:", responseUsername);
      const userId = await fetchUsuario(responseUsername);
      console.log("id", userId);

      if (!userId) {
        alert("Usuario no encontrado.");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/myapp/registroParti_foro/`,
        {
          usuario: userId,
          foro: questions[currentQuestionIndex].id_foro, // Usar 'id_foro' según tu estructura
          fecha_participacion: new Date().toISOString().split("T")[0],
          comentario: responseText,
          resultado: true,
        }
      );

      console.log("Success:", response.data);

      setTimeout(() => {
        fetchQuestions();
        fetchParticipaciones();
      }, 300);
      // Resetea los campos y cierra el modal
      setResponseUsername("");
      setResponseText("");
      closeModal();
    } catch (error) {
      console.error("Error registrando la respuesta:", error);
      alert(
        "Ocurrió un error al registrar la respuesta. Por favor, intenta de nuevo."
      );
    }
  };

  const openResponseModal = (index) => {
    setCurrentQuestionIndex(index);
    setIsResponseModalOpen(true);
  };
  const handleDeletePregunta = async (id_foro, index) => {
    if (!id_foro) {
      console.error("Error: id_foro no válido:", id_foro);
      alert("Error: No se pudo obtener el ID de la pregunta.");
      return;
    }

    try {
      console.log(`Intentando eliminar pregunta con ID: ${id_foro}`); 
      const response = await axios.delete(
        `${API_BASE_URL}/myapp/eliminarRegistro_foro/${id_foro}`
      );

      if (response.status === 200) {
        setQuestions(questions.filter((_, i) => i !== index));
        alert("Pregunta eliminada exitosamente");
      }
      fetchParticipaciones();
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error);
      alert("Hubo un error al eliminar la pregunta");
    }
  };
  const handleDeleteRespuesta = async (id_participacion_foro, index) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/myapp/eliminarParti_foro/${id_participacion_foro}/`
      );
      console.log("Eliminar:", response.data);

      if (response.status === 200) {
        // Actualiza el estado en el frontend
        setQuestions(questions.filter((_, i) => i !== index));
        alert("Respuesta eliminada exitosamente");
      }
      fetchParticipaciones();
    } catch (error) {
      console.error("Error al eliminar la respuesta:", error);
      alert("Hubo un error al eliminar la respuesta");
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredQuestions = questions.filter((q) => {
    if (!searchText) return true;

    const temaMatch = q.tema?.toLowerCase().includes(searchText.toLowerCase());
    const descripcionMatch = q.descripcion
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return temaMatch || descripcionMatch;
  });

    return (
        <div className="foro-container">
        <Header></Header>
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
                    Tema: {q.tema} <br></br>Fecha: {q.fecha_creacion}<br></br>
                    Pregunta de: {username}
                    </p>
                </div>
                <p className="question-text">{q.descripcion}</p>
                <button
                    className="new-question"
                    onClick={() => openResponseModal(index)}
                >
                    Responder
                </button>
                <div className="answers">
                    {q.participaciones_foro &&
                    q.participaciones_foro.map((a, id_participacion_foro) => (
                        <div
                        className="answer"
                        key={
                            a.id_participacion_foro ||
                            `answer-${q.id_foro}-${id_participacion_foro}`
                        }
                        >
                        {" "}
                        <div className="answer-header">
                            <p className="answer-info">
                            Respuesta de {username} en {a.fecha_participacion}
                            </p>
                        </div>
                        <p className="answer-text">{a.comentario}</p>
                        <div className="actions">
                            <div className="like-dislike">
                            <img
                                src="/like.png"
                                alt="Like"
                                className="like-icon"
                                onClick={() => handleVote(a.id_participacion_foro, "like")}
                                style={{ cursor: "pointer" }}
                            />
                            <img
                                src="/dislike.png"
                                alt="Dislike"
                                className="dislike-icon"
                                onClick={() => handleVote(a.id_participacion_foro, "dislike")}
                                style={{ cursor: "pointer" }}
                            />
                                </div>
                            <div className="additional-actions">
                            <img
                                src="/eliminar.png"
                                alt="Eliminar"
                                className="action-icon"
                                onClick={  () =>{
                                  if (esAdmin(userInfo)) {
                                  handleDeleteRespuesta(
                                    a.id_participacion_foro,
                                    index
                                )
                                }else {
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Acceso denegado',
                                    text: 'No tienes permiso para eliminar esta respuesta.',
                                    confirmButtonColor: '#d33',
                                  });
                                }
                              }}
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
                        onClick={() =>{
                          if (esAdmin(userInfo)) {
                            handleDeletePregunta(q.id_foro, index)
                          }else {
                            Swal.fire({
                              icon: 'error',
                              title: 'Acceso denegado',
                              text: 'No tienes permiso para eliminar esta pregunta.',
                              confirmButtonColor: '#d33',
                            });
                          }}
                        }
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
                placeholder="Tema"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                className="modal-input"
                />
                <textarea
                placeholder="Descripción de la pregunta"
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
