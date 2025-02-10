import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(60 * 30 + 41); // 30 minutes and 41 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="info-box">
      <h2>Temporizador</h2>
      <div className="center">
        <p>{formatTime(time)}</p>
      </div>
    </div>
  );
};

export default Timer;
