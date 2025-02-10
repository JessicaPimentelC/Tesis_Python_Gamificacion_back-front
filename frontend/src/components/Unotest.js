import React from "react";
import "../styles/Uno.css";
import Sidebar from "./Sidebar";
import HeaderBody from "./HeaderBody";

const Unotest = () => {
  return (
    <div className="contenedor">
      <Sidebar />
      <div className="contenido">
      <div className="contenido2">
      <div className="white-background">
      <HeaderBody></HeaderBody>
        <h2>Contenido Responsive</h2>
        <p>Este es un ejemplo de cómo hacer un diseño responsive con React y CSS.</p>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Unotest;
