// LoadingIndicator.js
import React, { useState, useEffect } from 'react';
import '../styles/LoadingIndicator.css'; // Asegúrate de crear un archivo CSS correspondiente para los estilos

const LoadingIndicator = () => {
  const [percentage, setPercentage] = useState(0);
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => {
        if (ascending) {
          if (prevPercentage >= 100) {
            setAscending(false);
            return prevPercentage - 1;
          }
          return prevPercentage + 1;
        } else {
          if (prevPercentage <= 0) {
            setAscending(true);
            return prevPercentage + 1;
          }
          return prevPercentage - 1;
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, [ascending]);

  return (
    <div className="barra-contenedor">
      <div className="barra-carga" style={{ height: `${percentage}%` }}></div>
      <div className="porcentaje">{percentage}%</div>
    </div>
  );
};

export default LoadingIndicator;
