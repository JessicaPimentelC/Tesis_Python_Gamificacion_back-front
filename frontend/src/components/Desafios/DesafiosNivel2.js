import { useNavigate } from "react-router-dom";
import "../../styles/Examennivel1.css";
import Header from "../Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import { getCSRFToken, refreshAccessToken } from "../../utils/validacionesGenerales";
import useVidasStore from "../vidasStore";
import Swal from "sweetalert2";
import { fetchUserInfo } from "../../utils/userService";

function DesafiosNivel2() {
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
        validationText: "es_par",
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
        validationText: "clasificar_numero",
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

    const ejecutarCodigoVanterior = async () => {
    const userCode = code || "";
    const currentEx = exercises[currentExercise];

    let codigoNormalizado = userCode.replace(/\t/g, "    ");
    codigoNormalizado = codigoNormalizado
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n");

    if (!codigoNormalizado.includes(`def ${currentEx.validationText}`)) {
    setCodeOutput(
        `⚠ Debes definir la función '${currentEx.validationText}' para resolver este ejercicio.`
    );
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
        files: [{ content: codigoNormalizado }],
    }),
    });

    const result = await response.json();
    const salida =
    result.run.stdout?.trim() ||
    result.run.stderr?.trim() ||
    "⚠ No se recibió salida.";

    setCodeOutput(`🖨 Salida:\n${salida}`);

    if (
    salida.includes("Par") ||
    salida.includes("Impar") ||
    salida.includes("Positivo") ||
    salida.includes("Negativo") ||
    salida.includes("Cero")
    ) {
    setVerificationMessage("✅ ¡Función ejecutada correctamente!");
    } else {
    setVerificationMessage("❌ La salida no es la esperada.");
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
    const ejecutarCodigo = async () => {
        if (!userInfo || !userInfo.id) {
            console.error("Usuario no cargado");
            return;
        }
    
        const userCode = code || "";
        const currentEx = exercises[currentExercise];
    
        // 1. Normalización del código
        let codigoNormalizado = userCode.replace(/\t/g, "    ");
        codigoNormalizado = codigoNormalizado
            .split("\n")
            .map((line) => line.replace(/\s+$/, ""))
            .join("\n");
    
        // 2. Verificar función requerida
        if (!codigoNormalizado.includes(`def ${currentEx.validationText}`)) {
            setCodeOutput(`⚠ Debes definir la función '${currentEx.validationText}'`);
            setVerificationMessage("");
            setOutputVisible(true);
            return;
        }
    
        try {
            // 3. Configurar headers
            const headers = {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(),
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            };
    
            // 4. Verificar vidas disponibles
            const vidasResponse = await axios.get(`${API_BASE_URL}/myapp/vidas/${userInfo.id}/`, {
                headers,
                withCredentials: true
            });
    
            if (vidasResponse.data.vidas_restantes <= 0) {
                setVerificationMessage("❌ No tienes vidas disponibles");
                setOutputVisible(true);
                await Swal.fire({
                    title: "¡Vidas agotadas!",
                    text: "Espera 15 minutos para recuperar una vida",
                    icon: "warning"
                });
                return;
            }
    
            // 5. Ejecutar código en Piston
            const pistonResponse = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: "python",
                    version: "3.10.0",
                    files: [{ content: codigoNormalizado }],
                }),
            });
    
            const result = await pistonResponse.json();
            const salida = result.run.stdout?.trim() || result.run.stderr?.trim() || "⚠ No se recibió salida.";
    
            setCodeOutput(`🖨 Salida:\n${salida}`);
    
            // 6. Determinar si es correcto
            const esCorrecto = (
                salida.includes("Par") ||
                salida.includes("Impar") ||
                salida.includes("Positivo") ||
                salida.includes("Negativo") ||
                salida.includes("Cero")
            );
    
            if (esCorrecto) {
                console.log('Mandando datos:', {
                    usuario_id: userInfo.id,
                    puntos: 50
                });
                const puntajeResponse = await axios.post(`${API_BASE_URL}/myapp/actualizar-puntaje/`, {
                    usuario: userInfo.id,
                    puntos: 50
                }, {
                    headers,
                    withCredentials: true
                });
    
                // Actualizar estado local con la respuesta del backend
                setScore(puntajeResponse.data.nuevo_puntaje);
                console.log("Puntos actualizados:", puntajeResponse.data.nuevo_puntaje);
                setVerificationMessage("✅ ¡Correcto! +50 puntos");
                new Audio("/ganar.mp3").play();
            } else {
                // 8. Actualizar vidas
                const vidasUpdate = await axios.get(`${API_BASE_URL}/myapp/vidas/${userInfo.id}/`, {
                    headers,
                    withCredentials: true,
                });
                // Actualizar estado local con la respuesta del backend
                setVidas(vidasUpdate.data.vidas_restantes);
                setVerificationMessage(`❌ Incorrecto. Vidas restantes: ${vidasUpdate.data.vidas_restantes}`);
                new Audio("/perder.mp3").play();
            }
    
            setOutputVisible(true);
            setTimeout(() => setOutputVisible(false), 3000);
    
        } catch (error) {
            console.error("Error completo:", error.response || error);
            
            // Manejo de token expirado
            if (error.response?.status === 401) {
                try {
                    const newToken = await refreshAccessToken();
                    localStorage.setItem("access_token", newToken);
                    return ejecutarCodigo(); // Reintentar
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

export default DesafiosNivel2;