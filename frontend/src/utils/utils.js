import axios from 'axios';
import API_BASE_URL from "../config";
// Función para seleccionar 20 ejercicios aleatorios sin repetirse
export const obtenerEjerciciosAleatorios = (cantidad = 3) => {
    const ejerciciosPorCarpeta = {
        basicos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 19, 20],
        intermedios: [12, 13, 14, 15, 16, 17, 18, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        memoria: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        seleccion: [21, 22, 23, 24, 25, 26, 27, 28],
    };

    const todosLosEjercicios = Object.values(ejerciciosPorCarpeta).flat();

    if (todosLosEjercicios.length < cantidad) {
        console.log('No hay suficientes ejercicios disponibles.');
        return [];
    }

    // Seleccionar 20 ejercicios aleatorios sin repetirse
    const ejerciciosSeleccionados = [];
    while (ejerciciosSeleccionados.length < cantidad) {
        const randomIndex = Math.floor(Math.random() * todosLosEjercicios.length);
        const ejercicio = todosLosEjercicios[randomIndex];

        if (!ejerciciosSeleccionados.includes(ejercicio)) {
            ejerciciosSeleccionados.push(ejercicio);
        }
    }

    return ejerciciosSeleccionados;
};

// Lista de 20 ejercicios preseleccionados
let ejerciciosPreseleccionados = obtenerEjerciciosAleatorios();
let indiceEjercicio = 0;

export const obtenerEjercicioAleatorioEnunciado = () => {
    console.log("Probando utils.js",ejerciciosPreseleccionados.length);

    if (indiceEjercicio >= ejerciciosPreseleccionados.length) {
        console.log('No quedan ejercicios disponibles.');
        return null;
    }

    const ejercicio = ejerciciosPreseleccionados[indiceEjercicio];
    indiceEjercicio++;

    return ejercicio;
};

export const redirigirAEnunciado = (ejercicio, navigate) => {
    if (!ejercicio) {
        console.log('No hay ejercicio seleccionado para redirigir.');
        return;
    }

    navigate(`/enunciado${ejercicio}`);
};

export const verificarYOtorgarInsignia = async (numerosUsados, usuarioId) => {
    if (numerosUsados.length >= 20) {
        console.log("¡Felicidades! Has completado 20 ejercicios y ganaste una insignia 🎖️");

        // Llamada al backend para guardar la insignia
        try {
            const response = await axios.post(`${API_BASE_URL}/myapp/insignias`, {
                usuarioId,  // ID del usuario que completó los ejercicios
                tipo: 'Insignia de primer nivel',
            });

            if (response.status === 200) {
                console.log('Insignia guardada exitosamente en el backend.');
            } else {
                console.log('Hubo un problema al guardar la insignia.');
            }
        } catch (error) {
            console.error('Error al guardar la insignia:', error);
        }
    }
};
