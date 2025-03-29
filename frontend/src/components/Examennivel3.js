import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Examennivel1.css';
import Sidebar from './Sidebar';
import HeaderBody from './HeaderBody';

function Examennivel3() {
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [codeOutput, setCodeOutput] = useState("");

  const questions = [
    {
        id: "question1",
        text: "¿Cuál de las siguientes palabras es un valor booleano en Python?",
        options: {
          A: `"Verdadero"`,
          B: `"Falso"`,
          C: `True`,
          D: `"1"`
        },
        correct: "C",
    },
    {
      id: "question2",
      text: "¿Cuál de las siguientes palabras clave se usa para múltiples condiciones en Python?",
      options: {
        A: "elseif",
        B: "elif",
        C: "switch",
        D: "otherwise"
      },
      correct: "B",
    },
    {
        id: "question3",
        text: "¿Cuál de los siguientes operadores se usa para verificar si un valor está en una lista?",
        options: {
          A: `<=`,
          B: `in`,
          C: `==`,
          D: `!=`
        },
        correct: "B",
    },
    {
      id: "question4",
      text: "¿Qué operador se usa en Python para verificar si dos condiciones son ambas verdaderas?",
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
      text: "Escribe un programa en Python que determine si un número ingresado por el usuario es positivo, negativo o cero.",
      type: "code",
    }
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
  const ejecutarCodigo = () => {
    const codigoUsuario = answers[questions[currentQuestion].id] || "";
  
    if (!codigoUsuario.trim()) {
      setCodeOutput("Por favor, ingresa un código antes de ejecutarlo.");
      return;
    }
  
    try {
      let output = evalBrython(codigoUsuario);
      setCodeOutput(output);
    } catch (error) {
      setCodeOutput("Error al ejecutar el código.");
    }
  };
  
  function evalBrython(code) {
    let output = "";
    try {
      window.brython(1);
      let result = eval(`(function() { ${code} })()`);
      output = result !== undefined ? String(result) : "Código ejecutado correctamente.";
    } catch (error) {
      output = error.message;
    }
    return output;
  }
  

  return (
    <div className="exam-container">
      <HeaderBody />
      <Sidebar />

      <div className="exam-content">
        <h1>EXAMEN NIVEL 3</h1>
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
      </div>
    </div>
  );
}

export default Examennivel3;
