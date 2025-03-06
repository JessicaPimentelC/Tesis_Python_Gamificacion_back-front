import React, { useState } from 'react';
import '../../../styles/Enunciado3.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import HeaderBody from '../../HeaderBody';
import HeaderInfo from '../../HeaderInfo';

const Enunciado19Nivel2 = () => {
  const [showGif, setShowGif] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Hook para la redirección

  const handleShowGif = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowContinue(true);
    }, 2000); // Asume que el GIF tiene una duración de 2 segundos
  };

  const handleContinueClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/Nivel2/intermedios/19');
  };

  return (
      <div className="nivel1-page">
      <Sidebar></Sidebar>
      <div className="nivel1-container">

      <div className="content">
        <div className="white-background">
          <HeaderBody></HeaderBody>
          <div className="header-title">
              <h2>NIVEL 2</h2>
              <HeaderInfo></HeaderInfo>
            </div>
          <div className="nivel1-card">
            <div className="nivel1-card-header">
              <span> 🧮 Calculadora Básica en Python



</span>
            </div>
            <div className="nivel1-card-body">
            <p>
            El programa solicitará al usuario que ingrese dos números y seleccione una operación matemática entre suma, resta, multiplicación y división. Luego, realizará el cálculo correspondiente y mostrará el resultado en pantalla.            </p>
              <div className="code-box">
                <div className="code-header">Python</div>
                <pre className="code-area">
                  <code>{`
num1 = int(input("Ingresa primer número: ")) 
num2 = int(input("Ingresa segundo número: ")) 

print("Seleccione la opción que desea:")
print("1. Suma")
print("2. Resta")
print("3. Multiplicación")
print("4. División")

opcion = int(input()) 

if opcion == 1:
    suma = num1 + num2
    print("El resultado es", suma)
elif opcion == 2:
    resta = num1 - num2
    print("El resultado es", resta)
elif opcion == 3:
    multiplicacion = num1 * num2  
elif opcion == 4:
    if num2 != 0: 
        division = num1 / num2
        print("El resultado es", division)
    else:
        print("Error: No se puede dividir por cero.")
else:
    print("Opción inválida. Por favor, seleccione un número del 1 al 4.")

`} </code>
                </pre>
              </div>

              {!showGif && (
                <div className="nivel1-card-button-container">
                  <button className="nivel1-card-button" onClick={handleShowGif}>
                    Ver Simulación
                  </button>
                </div>
              )}

              {showGif && (
                <div className="gif-container">
                  <img src="/GifNivel2/19.gif" alt="GIF" className="gif-image" />
                </div>
              )}

              {showContinue && (
                <div className="nivel1-card-button-container">
                  <button className="nivel1-card-button" onClick={handleContinueClick}>
                    Continuar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¡Listo para comenzar!</h2>
            <p>
              🌟 ¡Estás a punto de comenzar una emocionante aventura en el aprendizaje de Python! 🚀
              Prepárate para explorar, descubrir y aprender. ¡Estamos emocionados de tenerte a bordo!
            </p>
            <img src="X3PR.gif" alt="GIF de bienvenida" className="modal-gif" />
            <button className="modal-close-button" onClick={handleCloseModal}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Enunciado19Nivel2;
