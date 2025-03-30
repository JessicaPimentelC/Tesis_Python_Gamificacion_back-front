  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import '../styles/Examennivel1.css';
  import Header from './Header';

  function Examennivel1() {
    const [answers, setAnswers] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0); 

    const questions = [
      {
        id: "question1",
        text: "¿Qué función se usa en Python para imprimir un mensaje en la consola?",
        options: { A: "print()", B: "float()", C: "console.log()", D: "output()" },
        correct: "A",
      },
      {
        id: "question2",
        text: "¿Qué función en Python te permite solicitar datos al usuario?",
        options: { A: "print()", B: "float()", C: "input()", D: "output()" },
        correct: "C",
      },
      {
        id: "question3",
        text: "¿Cuál es la función para imprimir en Python?",
        options: { A: "print()", B: "float()", C: "console.log()", D: "output()" },
        correct: "A",
      },
      {
        id: "question4",
        text: "¿Qué instrucción en Python se usa para pedir un número al usuario?",
        options: { A: 'num = input("Ingrese un número: ")', B: 'num = int("Ingrese un número: ")', C: 'print(input("Ingrese un número: "))', D: "leer(num)" },
        correct: "A",
      },
      {
        id: "question5",
        text: 'Si el usuario ingresa "42" y queremos convertirlo en un número entero, ¿qué función usamos?',
        options: { A: 'str(42)', B: 'int(42)', C: 'int("42")', D: 'float("42")' },
        correct: "C",
      },
      {
        id: "question6",
        text: '¿Qué instrucción muestra el mensaje "Hola, mundo!" en la consola?',
        options: { A: 'float(input("Ingrese un número: "))', B: 'decimal(input("Ingrese un número: "))', C: 'input("Ingrese un número: ")', D: 'real(input("Ingrese un número: "))' },
        correct: "C",
      },
      {
        id: "question7",
        text: 'Si el usuario ingresa "A", ¿cómo se captura correctamente en una variable letra?',
        options: { A: 'letra = char(input("Ingrese un carácter: "))', B: 'letra = str(input("Ingrese un carácter: "))', C: 'letra = input("Ingrese un carácter: ")', D: "output()" },
        correct: "C",
      },
      {
        id: "question8",
        text: "Si queremos recibir un número decimal del usuario, ¿qué función usamos?",
        options: { A: 'real(input("Ingrese un número: "))', B: 'decimal(input("Ingrese un número: "))', C: "console.log()", D: 'float(input("Ingrese un número: "))' },
        correct: "D",
      },
      {
        id: "question9",
        text: '¿Qué instrucción muestra el mensaje "Hola, mundo!" en la consola?',
        options: { A: 'echo "Hola, mundo!"', B: 'mostrar("Hola, mundo!")', C: 'print("Hola, mundo!")', D: "output()" },
        correct: "C",
      },
      {
        id: "question10",
        text: "¿Cuál de las siguientes opciones convierte correctamente una cadena de texto en un número entero en Python?",
        options: { A: 'float("10")', B: 'int("10")', C: "str(10)", D: "input(10)" },
        correct: "B",
      },
      {
        id: "question11",
        text: "Para poder usar funciones matemáticas avanzadas en Python, ¿cómo importamos la librería matemática?",
        options: { A: "include math", B: "import math", C: "str(10)", D: "input(10)" },
        correct: "B",
      },
      {
        id: "question12",
        text: "¿Qué función de la librería math devuelve la raíz cuadrada de un número?",
        options: { A: "math.pow()", B: "math.sqrt()", C: "math.root()", D: "math.log()" },
        correct: "B",
      },
      {
        id: "question13",
        text: "¿Qué instrucción se usa para recibir datos desde el teclado en Python?",
        options: { A: "get()", B: "input()", C: "read()", D: "scan()" },
        correct: "B",
      },
      {
        id: "question14",
        text: "¿Qué función convierte un número entero en un número decimal?",
        options: { A: "float()", B: "int()", C: "str()", D: "bool()" },
        correct: "A",
      },
      {
        id: "question15",
        text: "¿Cuál de las siguientes opciones es un tipo de dato numérico en Python?",
        options: { A: "str", B: "int", C: "bool", D: "list" },
        correct: "B",
      },
      {
        id: "question16",
        text: "¿Qué tipo de dato se usa para representar números decimales en Python?",
        options: { A: "math.round()", B: "float", C: "floor()", D: "ceil()" },
        correct: "B",
      },
      {
        id: "question17",
        text: "¿Cuál de las siguientes opciones representa correctamente la conversión de una cadena a número entero en Python?",
        options: { A: 'int("10")', B: "str(10)", C: 'float("10")', D: "input(10)" },
        correct: "A",
      },
      {
        id: "question18",
        text: "¿Qué resultado da la operación 7 // 2 en Python?",
        options: { A: "3.5", B: "3", C: "4", D: "Error" },
        correct: "B",
      },
      {
        id: "question19",
        text: "¿Cuál es la función correcta para mostrar un mensaje en la consola en Python?",
        options: { A: 'echo "Hola, Mundo"', B: "print()", C: 'System.out.println("Hola, Mundo")', D: 'Console.Write("Hola, Mundo")' },
        correct: "B",
      },
      {
        id: "question20",
        text: "¿Qué valor devuelve type(3.14) en Python?",
        options: { A: "class 'float'", B: "class 'int'", C: "class 'double'", D: "class 'decimal'" },
        correct: "A",
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
        if (answers[question.id] === question.correct) {
          correct += 1;
        } else {
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

    return (
      
      <div className="exam-container">
        <Header></Header>
          
        <div className="exam-content"> 
        <h1>EXAMEN NIVEL 1</h1>
        <div className="exam-form">
          <div className="form-group">
            <label>{currentQuestion + 1}. {questions[currentQuestion].text}</label>
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
          </div>

          <button
            type="button"
            className="submit-button"
            onClick={handleNext}
            disabled={!answers[questions[currentQuestion].id]}
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
              <p><strong>Calificación:</strong> {correctCount}/{questions.length}</p>
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
