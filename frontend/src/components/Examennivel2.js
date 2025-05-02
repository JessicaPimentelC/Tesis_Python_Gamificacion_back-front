import { useNavigate } from 'react-router-dom';
import '../styles/Examennivel1.css';
import Header from './Header';
import React, { useState, useEffect } from "react";

function Examennivel2() {
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [codeOutput, setCodeOutput] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);
  const [randomExercise, setRandomExercise] = useState(null);
  const navigate = useNavigate();

  const exerciseOptions = [
    {
      id: "exercise1",
      text: `Objetivo:
Crea una función en Python que determine si un número es par o impar.

1. Función:
Define una función llamada es_par(numero) que reciba un número entero.

2. Lógica:
La función debe devolver:
- "Par" si el número es divisible por 2 sin residuo.
- "Impar" si el número no es divisible por 2.

3. Ejemplo de uso:
\`\`\`python
print(es_par(4))  # Debería imprimir: Par
\`\`\`

⚠️ Restricciones:
- La función debe manejar tanto números positivos como negativos.
- El parámetro numero siempre será un número entero.`,
      validationText: "es_par"
    },
    {
      id: "exercise2",
      text: `Objetivo:
Crea una función en Python que determine si un número es positivo, negativo o cero.

1. Función:
Define una función llamada clasificar_numero(numero) que reciba un número entero.

2. Lógica:
La función debe devolver:
- "Positivo" si el número es mayor que 0.
- "Negativo" si el número es menor que 0.
- "Cero" si el número es igual a 0.

3. Ejemplo de uso:
\`\`\`python
print(clasificar_numero(5))   # Debería imprimir: Positivo
print(clasificar_numero(-3))  # Debería imprimir: Negativo
print(clasificar_numero(0))   # Debería imprimir: Cero
\`\`\``,
      validationText: "clasificar_numero"
    }
  ];

  const questions = [
    { id: "question1", text: "¿Cuál es la forma correcta de usar una estructura if en Python?", options: { A: "if x > 5 { print('Mayor a 5') }", B: "if (x > 5) print('Mayor a 5')", C: "if x > 5: print('Mayor a 5')", D: "if x > 5 then print('Mayor a 5')" }, correct: "C" },
    { id: "question2", text: "¿Qué palabra clave se usa para agregar una condición alternativa en un if?", options: { A: "otherwise", B: "else", C: "elif", D: "except" }, correct: "B" },
    { id: "question3", text: `Si x = 10 y y = 5, ¿qué valor imprimirá el siguiente código?

\`\`\`python
if x > y:
    print('X es mayor')
else:
    print('Y es mayor')
\`\`\``, options: { A: "X es mayor", B: "Y es mayor", C: "Error", D: "No imprime nada" }, correct: "A" },
    { id: "question4", text: "¿Cuál es el operador lógico correcto para verificar si dos condiciones son verdaderas en Python?", options: { A: "&&", B: "||", C: "and", D: "or" }, correct: "C" },
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
        if (salida.includes("Par") || salida.includes("Impar") || salida.includes("Positivo") || salida.includes("Negativo") || salida.includes("Cero")) {
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
      <Header></Header>

      <div className="exam-content">
        <h1>EXAMEN NIVEL 2</h1>
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

        {/* MODAL DE RESULTADOS */}
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

export default Examennivel2;
