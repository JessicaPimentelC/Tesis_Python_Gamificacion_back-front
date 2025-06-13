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

function DesafiosNivel3() {
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

    const exercises = [
        {
            id: "ejercicio1",
            text: `Objetivo:
        Contar cuántos múltiplos de 3 hay desde 1 hasta un número dado.
        
        1. Lógica:
        - Solicita al usuario un número entero positivo (solo una vez).
        - Usa un bucle for para recorrer del 1 al número dado.
        - Cuenta cuántos son múltiplos de 3.
        - Muestra el resultado con print().
        
        2. Ejemplo de uso:
        \`\`\`python
        # Usuario ingresa:
        10
        # El programa imprime:
        Cantidad de múltiplos de 3: 3
        \`\`\`
        
        ⚠️ Restricciones:
        - Solo un input al inicio.
        - Usa for o while.
        - Solo input() y print().`,
            validationText: "Cantidad de múltiplos de 3",
            stdin: "10\n"
        }
        ,{
            id: "ejercicio2",
            text: `Objetivo:
        Calcular la suma de los primeros N números naturales.
        
        1. Lógica:
        - Solicita al usuario un número N (positivo).
        - Usa un bucle for para sumar los números del 1 al N.
        - Muestra la suma total con print().
        
        2. Ejemplo de uso:
        \`\`\`python
        # Usuario ingresa:
        5
        # El programa imprime:
        La suma de los primeros 5 números es: 15
        \`\`\`
        
        ⚠️ Restricciones:
        - Solo un input al inicio.
        - Usa for o while.
        - Solo input() y print().`,
            validationText: "La suma de los primeros",
            stdin: "5\n"
        }        
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
                return "10\n";  
            case "ejercicio2":
                return "5\n";   
            default:
                return "";
        }
    };
    
    const validarSalida = (salida, exerciseIndex) => {
        const currentEx = exercises[exerciseIndex];
        switch (currentEx.id) {
            case "ejercicio1":
                return salida.includes("Cantidad de múltiplos de 3: 3");
            case "ejercicio2":
                return salida.includes("La suma de los primeros 5 números es: 15");
            default:
                return false;
        }
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
                headers            });
    
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
    
            if (esCorrecto) {
                const puntajeResponse = await axios.post(`${API_BASE_URL}/myapp/actualizar-puntaje/`, {
                    usuario: userInfo.id,
                    puntos: 50
                }, { headers});
                const vidasUpdate = await axios.post(`${API_BASE_URL}/myapp/actualizar-vida-desafio/`, 
                    {resultado: true },{
                    headers
                });
                setScore(puntajeResponse.data.nuevo_puntaje);
                setVidas(vidasUpdate.data.vidas);
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
                    navigate("/login");
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
            <label>
                Desafío {currentExercise + 1} de {exercises.length}
            </label>
            <label>
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

export default DesafiosNivel3;