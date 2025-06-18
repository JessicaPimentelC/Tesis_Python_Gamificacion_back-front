import { useNavigate } from "react-router-dom";
import "../../styles/Examennivel1.css";
import Header from "../Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import { refreshAccessToken } from "../../utils/validacionesGenerales";
import useVidasStore from "../vidasStore";
import Swal from "sweetalert2";
import { fetchUserInfo } from "../../utils/userService";

function DesafiosNivel1() {
    const [code, setCode] = useState("");
    const [codeOutput, setCodeOutput] = useState("");
    const [verificationMessage, setVerificationMessage] = useState("");
    const [outputVisible, setOutputVisible] = useState(false);
    const [currentExercise, setCurrentExercise] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const setVidas = useVidasStore((state) => state.setVidas); 
    const [score, setScore] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    
    useEffect(() => {
        setStartTime(Date.now());
    }, []);
    
    const exercises = [
        {
            id: "ejercicio1",
            text: `Objetivo:
Crea una función que convierta una cantidad de dólares a euros.
        
    1. Función:
Define una función llamada convertir_dolares_a_euros().
        
    2. Lógica:
- Convierte esa cantidad a euros. 1 dólar equivale a 0.85 euros.
        
    3. Ejemplo de uso:
#Se crea una variable con la cantidad de dolares = 250.
#Al final del codigo imprima 'print(convertir_dolares_a_euros())' para probar el código
        .`,
            validationText: "convertir_dolares_a_euros",
        },{
            id: "ejercicio2",
            title: "Calculadora de área de un rectángulo",
            description: "Escribe un programa que solicite al usuario la base y la altura de un rectángulo y calcule su área.",
            solution: `
        base = float(input("Ingrese la base: "))
        altura = float(input("Ingrese la altura: "))
        area = base * altura
        print("El área del rectángulo es:", area)
            `,
            stdin: "5\n10\n", // base = 5, altura = 10
        },
        
    ];

    const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setCode("");
        setCodeOutput("");
        setVerificationMessage("");
        setOutputVisible(false);
        } else {
        // Volver al dashboard cuando se completan todos los ejercicios
        navigate("/Dashboard");
    }
    };

    useEffect(() => {
        const loadUser = async () => {
        try {
            const userData = await fetchUserInfo();
            setUserInfo(userData);
            console.log("Usuario:", userData);
        } catch (error) {
            console.error("Error al cargar usuario:", error);
        }
        };
        loadUser();
    }, []);

    const getStdinForExercise = (exerciseIndex) => {
        const currentEx = exercises[exerciseIndex];
        switch (currentEx.id) {
            case "ejercicio1":
            return "250\n"; 
            case "ejercicio2": 
                return "-3\n"; 
            default:
                return "";
        }
    };
    
    const validarSalida = (salida, exerciseIndex) => {
        const currentEx = exercises[exerciseIndex];
        switch (currentEx.id) {
            case "ejercicio1":
                const expected = "212.5"; 
                return salida.includes(expected)
            case "ejercicio2":
                const expectedArea = "50.0";
                return salida.includes(expectedArea);
            default:
                return false;
        }
    };
    const contieneModulosPeligrosos = (codigo) => {
        const modulosProhibidos = ["os", "sys", "subprocess", "eval", "exec", "open", "importlib", "__import__"];
        const regex = new RegExp(`\\b(${modulosProhibidos.join("|")})\\b`, "i");
        return regex.test(codigo);
    };

    /*validacion de codigo */
    const ejecutarCodigo = async () => {
        if (!userInfo || !userInfo.id) {
            console.error("Usuario no cargado");
            return;
        }
    
        const userCode = code || "";
        const currentEx = exercises[currentExercise];
    
        // Normalizar el código (quita tabs y espacios innecesarios)
        let codigoNormalizado = userCode.replace(/\t/g, "    ");
        codigoNormalizado = codigoNormalizado
            .split("\n")
            .map((line) => line.replace(/\s+$/, ""))
            .join("\n");
        if (contieneModulosPeligrosos(codigoNormalizado)) {
            setCodeOutput("⚠ No se permite el uso de ciertos módulos o funciones peligrosas.");
            setVerificationMessage("❌ Código no permitido");
            setOutputVisible(true);
            return;
        }
        // Validar que el usuario definió la función esperada
        if (!codigoNormalizado.includes(`def ${currentEx.validationText}`)) {
            setCodeOutput(`⚠ Debes definir la función '${currentEx.validationText}'`);
            setVerificationMessage("");
            setOutputVisible(true);
            return;
        }
    
        try {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            };
    
            const vidasResponse = await axios.get(`${API_BASE_URL}/myapp/vidas/${userInfo.id}/`, {
                headers
            });
    
            if (vidasResponse.data.vidas_restantes <= 0) {
                setOutputVisible(true);
                await Swal.fire({
                    title: "¡Vidas agotadas!",
                    text: "Espera 15 minutos para recuperar tus vidas",
                    icon: "warning"
                });
                return;
            }
    
            // 👇 Aquí agregamos el stdin dinámico
            const stdin = getStdinForExercise(currentExercise);
    
            // Ejecutar código en Piston
            const pistonResponse = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: "python",
                    version: "3.10.0",
                    files: [{ content: codigoNormalizado }],
                    stdin: stdin  // 👉 se pasa el input simulado
                }),
            });
    
            const result = await pistonResponse.json();
            const salida = result.run.stdout?.trim() || result.run.stderr?.trim() || "⚠ No se recibió salida.";
    
            setCodeOutput(`🖨 Salida:\n${salida}`);
    
            // Lógica para verificar si la salida es correcta
            const esCorrecto = validarSalida(salida, currentExercise);
            const start = Date.now();      
            if (esCorrecto) {
                const tiempoResolucionSegundos = Math.floor((Date.now() - startTime) / 1000);
                
                await axios.post(`${API_BASE_URL}/myapp/verificar_rapidez/`, {
                    resultado: true,
                    tiempo_resolucion: tiempoResolucionSegundos
                }, { headers});
                
                const puntajeResponse = await axios.post(`${API_BASE_URL}/myapp/actualizar-puntaje/`, {
                    usuario: userInfo.id,
                    puntos: 50,
                    errores: 0
                }, { headers});

                const vidasUpdate = await axios.post(`${API_BASE_URL}/myapp/actualizar-vida-desafio/`, 
                    {resultado: true },{
                    headers
                });
                setVidas(vidasUpdate.data.vidas);
                setScore(puntajeResponse.data.nuevo_puntaje);
                setVerificationMessage("✅ ¡Correcto! +50 puntos");
                new Audio("/ganar.mp3").play();
            } else {
                setVerificationMessage(`❌ Incorrecto!`);
                new Audio("/perder.mp3").play();
            }
    
            setOutputVisible(true);
            setTimeout(() => setOutputVisible(false), 3000);
    
        } catch (error) {
            console.error("Error completo:", error.response || error);
    
            if (error.response?.status === 401) {
                try {
                    const newToken = await refreshAccessToken();
                    localStorage.setItem("access_token", newToken);
                    return ejecutarCodigo();
                } catch (refreshError) {
                    localStorage.removeItem("access_token");
                    navigate("/");
                    return;
                }
            }
    
            setVerificationMessage("❌ Error en el sistema");
            setCodeOutput(error.response?.data?.error || "Error desconocido");
            setOutputVisible(true);
        }
    };
    
return (
    <div className="exam-container">
        <Header></Header>

        <div className="exam-content">
        <h1>DESAFÍOS DE CÓDIGO</h1>
        <div className="exam-form">
            <div className="form-group">

            <label className="exercise-label">
                {exercises[currentExercise].text}
            </label>
            <textarea
                className="code-input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Escribe tu código aquí..."
            />

            <button className="run-button" onClick={ejecutarCodigo}>
                Ejecutar Código
            </button>

            {outputVisible && (
            <div className="output-message">
                {verificationMessage.includes("✅") && (
                <img
                    src="/exa.gif"
                    alt="Correcto"
                    className="verification-gif"
                />
                )}
                {verificationMessage.includes("❌") && (
                    <img
                    src="/exam.gif"
                    alt="Incorrecto"
                    className="verification-gif"
                    />
                )}
                <span>{verificationMessage}</span>
                </div>
            )}

            {codeOutput && <div className="code-output">{codeOutput}</div>}
            </div>
            <button
                type="button"
                className="submit-button"
                onClick={handleNextExercise}
            >
                {currentExercise < exercises.length - 1
                ? "Siguiente Desafío"
                : "Finalizar"}
            </button>
            </div>
        </div>
        </div>
    );
}

export default DesafiosNivel1;
