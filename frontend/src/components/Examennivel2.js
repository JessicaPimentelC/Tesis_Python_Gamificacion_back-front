import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Examennivel1.css';
import Sidebar from './Sidebar';
import HeaderBody from './HeaderBody';

function Examennivel1() {
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [codeOutput, setCodeOutput] = useState(""); // Estado para mostrar salida del código

  const questions = [
    {
      id: "question1",
      text: "¿Cuál es la forma correcta de usar una estructura if en Python?",
      options: {
        A: "if x > 5 { print('Mayor a 5') }",
        B: "if (x > 5) print('Mayor a 5')",
        C: "if x > 5: print('Mayor a 5')",
        D: "if x > 5 then print('Mayor a 5')"
      },
      correct: "C",
    },
    {
      id: "question2",
      text: "¿Qué palabra clave se usa para agregar una condición alternativa en un if?",
      options: {
        A: "otherwise",
        B: "else",
        C: "elif",
        D: "except"
      },
      correct: "B",
    },
    {
      id: "question3",
      text: "Si `x = 10` y `y = 5`, ¿qué valor imprimirá el siguiente código?\n\n```python\nif x > y:\n    print('X es mayor')\nelse:\n    print('Y es mayor')\n```",
      options: {
        A: "X es mayor",
        B: "Y es mayor",
        C: "El código genera un error",
        D: "El código no imprime nada"
      },
      correct: "A",
    },
    {
      id: "question4",
      text: "¿Cuál es el operador lógico correcto para verificar si dos condiciones son verdaderas en Python?",
      options: {
        A: "&&",
        B: "||",
        C: "and",
        D: "or"
      },
      correct: "C",
    },
    {
      id: "question5",
      text: "Escribe un programa en Python que determine si un número ingresado por el usuario es par o impar.",
      type: "code",
    },
  ];

  const handleChange = (value) => {
    const questionId = questions[currentQuestion].id;
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    let incorrect = 0;

    questions.forEach((question) => {
      if (question.type !== "code" && answers[question.id] === question.correct) {
        correct += 1;
      } else if (question.type !== "code") {
        incorrect += 1;
      }
    });

    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/Dashboard');
  };

  const ejecutarCodigo = async () => {
  try {
    const response = await fetch('http://localhost:5000/run-python', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: answers[questions[currentQuestion].id] || "" }),
    });

    const data = await response.json();
    setCodeOutput(data.output);
  } catch (error) {
    setCodeOutput('Error al ejecutar el código.');
  }
};

  
  return (
    <div className="exam-container">
      <HeaderBody />
      <Sidebar />

      <div className="exam-content">
        <h1>EXAMEN NIVEL 2</h1>
        <div className="exam-form">
          <div className="form-group">
            <label>{currentQuestion + 1}. {questions[currentQuestion].text}</label>

            {questions[currentQuestion].type === "code" ? (
              <>
                <textarea
                  className="code-input"
                  value={answers[questions[currentQuestion].id] || ""}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Escribe tu código aquí..."
                />
                <button className="run-button" onClick={ejecutarCodigo}>
                  Ejecutar Código
                </button>
                <pre className="output">{codeOutput}</pre>
              </>
            ) : (
              <div className="button-group">
                {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    className={`btn ${answers[questions[currentQuestion].id] === key ? 'primary' : 'secondary'}`}
                    onClick={() => handleChange(key)}
                  >
                    {key}) {value}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="submit-button"
            onClick={handleNext}
            disabled={!answers[questions[currentQuestion].id] && questions[currentQuestion].type !== "code"}
          >
            {currentQuestion < questions.length - 1 ? "Siguiente" : "Enviar Examen"}
          </button>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <h2>Examen Enviado Correctamente</h2>
              <p><strong>Nombre:</strong> Eduardo Jose Daza Palencia</p>
              <p><strong>Fecha y Hora:</strong> {new Date().toLocaleString()}</p>
              <p><strong>Calificación:</strong> {correctCount}/{questions.length - 1}</p>
              <div className="result-summary">
                <div className="result-item">
                  <img src="si.png" alt="Icono de respuesta correcta" />
                  <span>Respuestas Buenas: {correctCount}</span>
                </div>
                <div className="result-item">
                  <img src="borrar.png" alt="Icono de respuesta incorrecta" />
                  <span>Respuestas Malas: {incorrectCount}</span>
                </div>
              </div>
              <img src="2dv.gif" alt="GIF de resultado" className="result-gif" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Examennivel1;
