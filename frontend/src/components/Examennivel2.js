import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Examennivel1.css";
import Sidebar from "./Sidebar";
import HeaderBody from "./HeaderBody";

function Examennivel2() {
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [codeOutput, setCodeOutput] = useState("");
  const navigate = useNavigate();

  const questions = [
    { id: "question1", text: "¿Cuál es la forma correcta de usar una estructura if en Python?", options: { A: "if x > 5 { print('Mayor a 5') }", B: "if (x > 5) print('Mayor a 5')", C: "if x > 5: print('Mayor a 5')", D: "if x > 5 then print('Mayor a 5')" }, correct: "C" },
    { id: "question2", text: "¿Qué palabra clave se usa para agregar una condición alternativa en un if?", options: { A: "otherwise", B: "else", C: "elif", D: "except" }, correct: "B" },
    { id: "question3", text: `Si x = 10 y y = 5, ¿qué valor imprimirá el siguiente código?\n\n\`\`\`python\nif x > y:\n    print('X es mayor')\nelse:\n    print('Y es mayor')\n\`\`\``, options: { A: "X es mayor", B: "Y es mayor", C: "Error", D: "No imprime nada" }, correct: "A" },
    { id: "question4", text: "¿Cuál es el operador lógico correcto para verificar si dos condiciones son verdaderas en Python?", options: { A: "&&", B: "||", C: "and", D: "or" }, correct: "C" },
    { id: "question5", text: "Escribe un programa en Python que solicite al usuario un número entero y luego lo muestre en pantalla.", type: "code" }
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
      <HeaderBody />
      <Sidebar />
      <div className="exam-content">
        <h1>EXAMEN NIVEL 2</h1>
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

export default Examennivel2;
