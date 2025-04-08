import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Examennivel1.css';
import Header from './Header';

function Examennivel3() {
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [codeOutput, setCodeOutput] = useState("");
  const navigate = useNavigate();

  const questions = [
    { id: "question1", text: "¿Cómo se declara una lista en Python?", options: { A: "list = {}", B: "list = []", C: "list()", D: "new list" }, correct: "B" },
    { id: "question2", text: "¿Cuál de las siguientes estructuras se usa para iterar sobre una lista en Python?", options: { A: "for", B: "while", C: "foreach", D: "loop" }, correct: "A" },
    { id: "question3", text: "¿Cuál es el resultado de 5 // 2 en Python?", options: { A: "2.5", B: "2", C: "3", D: "Error" }, correct: "B" },
    { id: "question4", text: "¿Cómo se define una función en Python?", options: { A: "function myFunc()", B: "def myFunc():", C: "def myFunc[]", D: "func myFunc:" }, correct: "B" },
    { id: "question5", text: "Escribe un programa en Python que sume dos números ingresados por el usuario y muestre el resultado.", type: "code" }
  ];

  const handleChange = (value) => {
    const questionId = questions[currentQuestion].id;
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let correct = 0, incorrect = 0;
    questions.forEach((q) => {
      if (q.type !== "code" && answers[q.id] === q.correct) correct++;
      else if (q.type !== "code") incorrect++;
    });
    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/Dashboard");
  };

  const ejecutarCodigo = async () => {
    const userCode = answers[questions[currentQuestion].id] || "";
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: "python", version: "3.10.0", files: [{ content: userCode }] })
      });
      const result = await response.json();
      setCodeOutput(result.run.stdout || result.run.stderr || "⚠ No se recibió salida.");
    } catch (error) {
      setCodeOutput("🚨 Error al ejecutar el código.");
    }
  };

  return (
    <div className="exam-container">
      <Header></Header>
      <div className="exam-content">
        <h1>EXAMEN NIVEL 3</h1>
        <div className="exam-form">
          <div className="form-group">
            <label>{currentQuestion + 1}. {questions[currentQuestion].text}</label>
            {questions[currentQuestion].type === "code" ? (
              <>
                <textarea className="code-input" value={answers[questions[currentQuestion].id] || ""} onChange={(e) => handleChange(e.target.value)} placeholder="Escribe tu código aquí..." />
                <button className="run-button" onClick={ejecutarCodigo}>Ejecutar Código</button>
                <pre className="output">{codeOutput}</pre>
              </>
            ) : (
              <div className="button-group">
                {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
                  <button key={key} type="button" className={`btn ${answers[questions[currentQuestion].id] === key ? "primary" : "secondary"}`} onClick={() => handleChange(key)}>{key}) {value}</button>
                ))}
              </div>
            )}
          </div>
          <button type="button" className="submit-button" onClick={handleNext} disabled={!answers[questions[currentQuestion].id] && questions[currentQuestion].type !== "code"}>{currentQuestion < questions.length - 1 ? "Siguiente" : "Enviar Examen"}</button>
        </div>
      </div>
    </div>
  );
}

export default Examennivel3;
