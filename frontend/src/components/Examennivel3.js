import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Examennivel1.css";
import Sidebar from "./Sidebar";
import HeaderBody from "./HeaderBody";

function Examennivel3() {
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [codeOutput, setCodeOutput] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [randomExercise, setRandomExercise] = useState(null);
  const navigate = useNavigate();

  const exerciseOptions = [
    {
      id: "exercise1",
      text: `Objetivo: Crea una función en Python que cuente cuántos números impares hay en un rango de números del 1 al N, utilizando un bucle for.

Función: Define una función llamada contar_impares(n) que reciba un número entero n.

Lógica: La función debe contar cuántos números impares hay entre 1 y n, incluyendo ambos límites, utilizando un bucle for.

Ejemplo de uso:
\`\`\`python
print(contar_impares(10))  # Debería imprimir: 5
\`\`\`
`,
      validationText: "contar_impares"
    },
    {
      id: "exercise2",
      text: `Objetivo: Crea una función en Python que cuente cuántos números pares hay en un rango de números del 1 al N, utilizando un bucle for.

Función: Define una función llamada contar_pares(n) que reciba un número entero n.

Lógica: La función debe contar cuántos números pares hay entre 1 y n, incluyendo ambos límites, utilizando un bucle for.

Ejemplo de uso:
\`\`\`python
print(contar_pares(10))  # Debería imprimir: 5
\`\`\`
`,
      validationText: "contar_pares"
    }
  ];

  const expectedOutputs = [
    { function: "contar_impares", outputs: ["Impares: 5", "Impares: 6"] },
    { function: "contar_pares", outputs: ["Pares: 5", "Pares: 6"] }
  ];

  const questions = [
    { id: "question1", text: "¿Cómo se declara una lista en Python?", options: { A: "list = {}", B: "list = []", C: "list()", D: "new list" }, correct: "B" },
    { id: "question2", text: "¿Cuál de las siguientes estructuras se usa para iterar sobre una lista en Python?", options: { A: "for", B: "while", C: "foreach", D: "loop" }, correct: "A" },
    { id: "question3", text: "¿Cuál es el resultado de 5 // 2 en Python?", options: { A: "2.5", B: "2", C: "3", D: "Error" }, correct: "B" },
    { id: "question4", text: "¿Cómo se define una función en Python?", options: { A: "function myFunc()", B: "def myFunc():", C: "def myFunc[]", D: "func myFunc:" }, correct: "B" },
    { id: "question5", type: "code" }
  ];

  useEffect(() => {
    if (questions[currentQuestion].id === "question5") {
      const randomIndex = Math.floor(Math.random() * exerciseOptions.length);
      setRandomExercise(exerciseOptions[randomIndex]);
    }
  }, [currentQuestion]);

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
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (q.type !== "code" && answers[q.id] === q.correct) {
        correct++;
      } else if (q.type !== "code") {
        incorrect++;
      }
    }
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
    const isPregunta5 = questions[currentQuestion].id === "question5";

    let codigoNormalizado = userCode.replace(/\t/g, "    ");
    codigoNormalizado = codigoNormalizado
      .split("\n")
      .map(line => line.replace(/\s+$/, ""))
      .join("\n");

    if (isPregunta5 && randomExercise && !codigoNormalizado.includes(`def ${randomExercise.validationText}`)) {
      setCodeOutput(`⚠ Debes definir la función '${randomExercise.validationText}' para resolver este ejercicio.`);
      setVerificationMessage("");
      setOutputVisible(true);
      return;
    }

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "python",
          version: "3.10.0",
          files: [{ content: codigoNormalizado }]
        })
      });

      const result = await response.json();
      const salida = result.run.stdout?.trim() || result.run.stderr?.trim() || "⚠ No se recibió salida.";

      setCodeOutput(`🖨 Salida:\n${salida}`);

      if (isPregunta5) {
        const expectedOutput = expectedOutputs.find(e => e.function === randomExercise.validationText);
        if (expectedOutput && expectedOutput.outputs.includes(salida)) {
          setVerificationMessage("✅ ¡Función ejecutada correctamente!");
        } else {
          setVerificationMessage("❌ La salida no es la esperada.");
        }
      }

      setOutputVisible(true);

      setTimeout(() => {
        setOutputVisible(false);
      }, 3000);

    } catch (error) {
      setCodeOutput("🚨 Error al ejecutar el código.");
      setVerificationMessage("❌ Hubo un error al ejecutar el código.");
      setOutputVisible(true);
    }
  };

  return (
    <div className="exam-container">
      <HeaderBody />
      <Sidebar />
      <div className="exam-content">
        <h1>EXAMEN NIVEL 3</h1>
        <div className="exam-form">
          <div className="form-group">
            <label>{currentQuestion + 1}. {questions[currentQuestion].type === "code" ? randomExercise?.text : questions[currentQuestion].text}</label>
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

                {outputVisible && (
                  <div className="output-message">
                    {verificationMessage.includes("✅") && (
                      <img src="/exa.gif" alt="Correcto" className="verification-gif" />
                    )}
                    {verificationMessage.includes("❌") && (
                      <img src="/exam.gif" alt="Incorrecto" className="verification-gif" />
                    )}
                    <span>{verificationMessage}</span>
                  </div>
                )}

                {codeOutput && (
                  <div className="code-output">
                    {codeOutput}
                  </div>
                )}
              </>
            ) : (
              <div className="button-group">
                {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    className={`btn ${answers[questions[currentQuestion].id] === key ? "primary" : "secondary"}`}
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

      {/* MODAL PERSONALIZADO */}
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
  );
}

export default Examennivel3;
