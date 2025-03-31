import React, { useState } from "react";
import axios from "axios";
import "../styles/chatbot.css";
import "../styles/PinguinoModal.css";

const pythonDocs = {
  "variables": "En Python, una variable se define simplemente asignando un valor a un nombre, por ejemplo: x = 10",
  "listas": "Las listas en Python son colecciones ordenadas y modificables. Ejemplo: lista = [1, 2, 3]",
  "funciones": "En Python, las funciones se definen con 'def'. Ejemplo: def saludar(): print('Hola!')",
  "bucles": "Python tiene bucles 'for' y 'while'. Ejemplo: for i in range(5): print(i)",
  "while": "El bucle 'while' ejecuta un bloque de código mientras la condición sea verdadera. Ejemplo: x = 0\nwhile x < 5:\n  print(x)\n  x += 1",
  "for": "El bucle 'for' se usa para iterar sobre secuencias. Ejemplo: for i in range(3):\n  print('Iteración:', i)",
  "print": "La función print() se usa para mostrar mensajes en la consola. Ejemplo: print('Hola, mundo!')",
  "int": "La función int() convierte un valor en un número entero. Ejemplo: numero = int('10')",
  "input": "La función input() permite al usuario ingresar datos. Ejemplo: nombre = input('¿Cómo te llamas?')",
  "elif": "La declaración 'elif' permite agregar condiciones adicionales en una estructura if-else. Ejemplo:\nif edad < 18:\n  print('Menor de edad')\nelif edad < 65:\n  print('Adulto')\nelse:\n  print('Adulto mayor')",
  "else": "Se usa 'else' para definir una acción si las condiciones previas no se cumplen. Ejemplo:\nif numero > 0:\n  print('Positivo')\nelse:\n  print('No positivo')",
  "true": "En Python, 'True' es un valor booleano que representa la verdad. Ejemplo: es_mayor = True",
  "false": "En Python, 'False' es un valor booleano que representa lo falso. Ejemplo: es_menor = False"
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! ¿En qué puedo ayudarte?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [selectedHelp, setSelectedHelp] = useState([]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const fetchPythonDocs = async (query) => {
    try {
      const response = await axios.get(`https://docs.python.org/es/3/search.html?q=${query}`);
      return `Aquí tienes información sobre ${query}: https://docs.python.org/es/3/search.html?q=${query}`;
    } catch (error) {
      return "Lo siento, no pude acceder a la documentación en este momento.";
    }
  };

  const handleSendMessage = async () => {
    if (selectedHelp.length === 0) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Debes seleccionar al menos una opción de ayuda antes de escribir.", sender: "bot" }
      ]);
      return;
    }

    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(async () => {
      const lowerInput = input.toLowerCase();
      const responseKey = Object.keys(pythonDocs).find((key) => lowerInput.includes(key));
      let response = responseKey ? pythonDocs[responseKey] : await fetchPythonDocs(lowerInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, sender: "bot" }
      ]);
    }, 1000);
  };

  const handleHelpOption = (type, message) => {
    if (!selectedHelp.includes(type)) {
      setSelectedHelp([...selectedHelp, type]);
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: "bot" }]);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <div className="penguin-container" onClick={toggleChatbot}>
          <div className="penguin">
            <div className="eye left"></div>
            <div className="eye right"></div>
            <div className="beak"></div>
            <div className="foot left"></div>
            <div className="foot right"></div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Chatbot - Pingüino</span>
            <button onClick={toggleChatbot}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="modal-icons">
            <button
              className={`modal-icon-button ${selectedHelp.includes("idea") ? "selected" : ""}`}
              onClick={() => handleHelpOption("idea", "💡 Idea: Piensa en dividir el problema en pasos más pequeños.")}
            >
              <img src="/idea.gif" alt="Idea" className="modal-icon" />
            </button>
            <button
              className={`modal-icon-button ${selectedHelp.includes("apoyo") ? "selected" : ""}`}
              onClick={() => handleHelpOption("apoyo", "🤝 Apoyo: No te preocupes, revisa el enunciado con calma.")}
            >
              <img src="/apoyo.gif" alt="Apoyo" className="modal-icon" />
            </button>
            <button
              className={`modal-icon-button ${selectedHelp.includes("cuaderno") ? "selected" : ""}`}
              onClick={() => handleHelpOption("cuaderno", "📖 Cuaderno: Revisa tus apuntes para encontrar ideas.")}
            >
              <img src="/cuaderno.gif" alt="Cuaderno" className="modal-icon" />
            </button>
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe una pregunta sobre Python..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
