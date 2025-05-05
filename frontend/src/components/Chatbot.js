import React, { useState } from "react";
import axios from "axios";
import "../styles/chatbot.css";

const pythonDocs = {
  "variables": "En Python, una variable se define simplemente asignando un valor a un nombre. Ejemplo: x = 10",
  "listas": "Las listas en Python son colecciones ordenadas y modificables. Ejemplo: lista = [1, 2, 3]",
  "tuplas": "Las tuplas son colecciones ordenadas pero inmutables. Ejemplo: tupla = (1, 2, 3)",
  "diccionarios": "Los diccionarios almacenan pares clave-valor. Ejemplo: persona = {'nombre': 'Ana', 'edad': 30}",
  "conjuntos": "Los conjuntos (set) son colecciones desordenadas sin elementos duplicados. Ejemplo: frutas = {'manzana', 'pera'}",
  "funciones": "En Python, las funciones se definen con 'def'. Ejemplo:\ndef saludar():\n  print('Hola!')",
  "parametros": "Puedes pasar parámetros a una función para personalizar su comportamiento. Ejemplo:\ndef saludar(nombre):\n  print(f'Hola, {nombre}')",
  "return": "La instrucción 'return' permite devolver un valor desde una función. Ejemplo:\ndef sumar(a, b):\n  return a + b",
  "bucles": "Python tiene bucles 'for' y 'while'. Ejemplo: for i in range(5): print(i)",
  "while": "El bucle 'while' ejecuta un bloque de código mientras la condición sea verdadera. Ejemplo:\nx = 0\nwhile x < 5:\n  print(x)\n  x += 1",
  "for": "El bucle 'for' se usa para iterar sobre secuencias. Ejemplo:\nfor i in range(3):\n  print('Iteración:', i)",
  "if": "Se usa 'if' para tomar decisiones. Ejemplo:\nif edad > 18:\n  print('Eres mayor de edad')",
  "elif": "Permite agregar condiciones adicionales en una estructura if-else. Ejemplo:\nif edad < 18:\n  print('Menor de edad')\nelif edad < 65:\n  print('Adulto')\nelse:\n  print('Adulto mayor')",
  "else": "Se usa 'else' si las condiciones previas no se cumplen. Ejemplo:\nif numero > 0:\n  print('Positivo')\nelse:\n  print('No positivo')",
  "print": "La función print() se usa para mostrar mensajes en la consola. Ejemplo: print('Hola, mundo!')",
  "input": "La función input() permite al usuario ingresar datos. Ejemplo: nombre = input('¿Cómo te llamas?')",
  "int": "La función int() convierte un valor en un número entero. Ejemplo: numero = int('10')",
  "float": "Convierte un valor a un número decimal. Ejemplo: decimal = float('3.14')",
  "str": "Convierte un valor a cadena de texto. Ejemplo: texto = str(123)",
  "bool": "Convierte un valor a booleano (True o False). Ejemplo: es_valido = bool(1)",
  "len": "Devuelve la longitud de una colección. Ejemplo: len([1, 2, 3]) devuelve 3",
  "range": "Crea una secuencia de números. Ejemplo: range(0, 5) genera 0, 1, 2, 3, 4",
  "true": "'True' es un valor booleano que representa la verdad. Ejemplo: es_mayor = True",
  "false": "'False' es un valor booleano que representa lo falso. Ejemplo: es_menor = False",
  "comentarios": "Se usan con '#' para explicar el código. Ejemplo: # Esto es un comentario",
  "import": "Se usa para importar módulos. Ejemplo: import math",
  "try": "Se usa para manejar errores. Ejemplo:\ntry:\n  resultado = 10 / 0\nexcept ZeroDivisionError:\n  print('No se puede dividir por cero')",
  "clase": "Las clases se usan para programar orientado a objetos. Ejemplo:\nclass Persona:\n  def __init__(self, nombre):\n    self.nombre = nombre",
  "lambda": "Una función anónima de una sola línea. Ejemplo: cuadrado = lambda x: x * x",
  "map": "Aplica una función a cada elemento de una lista. Ejemplo: map(lambda x: x*2, [1,2,3])",
  "filter": "Filtra elementos según una condición. Ejemplo: filter(lambda x: x>2, [1,2,3,4])"
};
const Chatbot = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola hola! Soy Pingüino, y estoy listo pa’ ayudarte con lo que necesites 🧠💬", sender: "bot" }
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
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Chatbot - Pingüino</span>
            <button onClick={onClose}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
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
    </div>
  );
};

export default Chatbot;
