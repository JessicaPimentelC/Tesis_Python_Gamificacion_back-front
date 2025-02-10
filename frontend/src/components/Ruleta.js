import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/Ruleta.css";

const Ruleta = () => {

    const navigate = useNavigate(); 

    const handleRuletaClick = () => {
    navigate("/challenges");
};

return (
    <div
        style={{ position: "relative", width: "400px", height: "400px" }}
        onClick={handleRuletaClick}
        role="button"
        aria-label="Ruleta Button"
    >
        <div id="ruleta">
            <div id="sectores">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div id="divisores">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div id="caras">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
        </div>
        <div id="triangulo"></div>
        </div>
    );
};
export default Ruleta;
