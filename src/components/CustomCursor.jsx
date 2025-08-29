// src/components/CustomCursor.jsx

import React, { useState, useEffect } from "react";

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isScaled, setIsScaled] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest(".cursor-grow-target")) {
        setIsScaled(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest(".cursor-grow-target")) {
        setIsScaled(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // We combine both translate and scale into a single transform property
  // The scale value changes between 1 and 2.5 based on the 'isScaled' state
  const cursorStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
      isScaled ? 1.7 : 1
    })`,
  };

  return (
    <div
      className="custom-cursor" // No need for a conditional class anymore
      style={cursorStyle}
    ></div>
  );
}

export default CustomCursor;
