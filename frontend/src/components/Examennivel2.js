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
  const [verificationMessage, setVerificationMessage] = useState(""); // Mensaje de verificación
  const [outputVisible, setOutputVisible] = useState(false); // Controla la visibilidad del mensaje flotante
  const navigate = useNavigate();

  const questions = [
    { id: "question1", text: "¿Cuál es la forma correcta de usar una estructura if en Python?", options: { A: "if x > 5 { print('Mayor a 5') }", B: "if (x > 5) print('Mayor a 5')", C: "if x > 5: print('Mayor a 5')", D: "if x > 5 then print('Mayor a 5')" }, correct: "C" },
    { id: "question2", text: "¿Qué palabra clave se usa para agregar una condición alternativa en un if?", options: { A: "otherwise", B: "else", C: "elif", D: "except" }, correct: "B" },
    { id: "question3", text: `Si x = 10 y y = 5, ¿qué valor imprimirá el siguiente código?\n\n\`\`\`python\nif x > y:\n    print('X es mayor')\nelse:\n    print('Y es mayor')\n\`\`\``, options: { A: "X es mayor", B: "Y es mayor", C: "Error", D: "No imprime nada" }, correct: "A" },
    { id: "question4", text: "¿Cuál es el operador lógico correcto para verificar si dos condiciones son verdaderas en Python?", options: { A: "&&", B: "||", C: "and", D: "or" }, correct: "C" },
    { id: "question5", text: `Enunciado del ejercicio:
    Crea una función llamada \`es_par(numero)\` que reciba un número entero como parámetro y determine si dicho número es par o impar. La función debe devolver una cadena de texto:
    
    - \"Par"\ si el número es divisible por 2 sin dejar residuo.
    - \"Impar"\ si el número no es divisible por 2 sin dejar residuo.
  
    Restricciones:
    - El parámetro \`numero\` debe ser un número entero.
    - La función debe ser capaz de manejar tanto números positivos como negativos.`, 
    type: "code"},
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

  const handleSubmit = async () => {
    let correct = 0, incorrect = 0;
    console.log("Respuestas:", answers);
    
    // Si las respuestas ya están listas, continuamos el proceso
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

    // Normaliza la indentación del código del usuario
    let codigoNormalizado = userCode.replace(/\t/g, "    ");
    codigoNormalizado = codigoNormalizado
      .split("\n")
      .map(line => line.replace(/\s+$/, ""))
      .join("\n");

    let codigoEjecutable = codigoNormalizado;

    if (isPregunta5) {
      if (!codigoEjecutable.includes("def es_par")) {
        setCodeOutput("⚠ Debes definir la función 'es_par' para resolver este ejercicio.");
        setVerificationMessage("");
        return;
      }

      // Añadimos pruebas automáticamente
      codigoEjecutable += `
print(es_par(4))
print(es_par(8))
print(es_par(2))`;
    }

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "python",
          version: "3.10.0",
          files: [{ content: codigoEjecutable }]
        })
      });

      const result = await response.json();
      const salida = result.run.stdout?.trim() || result.run.stderr?.trim() || "⚠ No se recibió salida.";

      if (isPregunta5) {
        const esperado = "Par\nPar\nPar";
        if (salida === esperado) {
          setCodeOutput(`🖨 Salida:\n${salida}`);
          setVerificationMessage("✅ ¡Correcto! Tu función pasó todas las pruebas.");
        } else {
          setCodeOutput(`🖨 Salida recibida:\n${salida}`);
          setVerificationMessage("❌ Tu función no pasó todas las pruebas.");
        }
      } else {
        setCodeOutput(`🖨 Salida:\n${salida}`);
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
        <h1>EXAMEN NIVEL 2</h1>
        <div className="exam-form">
          <div className="form-group">
            <label>{currentQuestion + 1}. {questions[currentQuestion].text}</label>
            {questions[currentQuestion].type === "code" ? (
              <>
                <textarea className="code-input" value={answers[questions[currentQuestion].id] || ""} onChange={(e) => handleChange(e.target.value)} placeholder="Escribe tu código aquí..." />
                <button className="run-button" onClick={ejecutarCodigo}>Ejecutar Código</button>

                {outputVisible && verificationMessage && (
                  <div className="output-message">
                    {verificationMessage.includes("✅") && (
                      <img src="/exa.gif" alt="Correcto" className="verification-gif" />
                    )}
                    {verificationMessage.includes("❌") && (
                      <img src="/exam.gif" alt="Incorrecto" className="verification-gif" />
                    )}
                    {verificationMessage}
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
