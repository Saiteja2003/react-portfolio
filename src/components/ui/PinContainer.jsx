// src/components/ui/PinContainer.jsx
"use client"; // Not required for Vite/CRA, but good practice
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export const PinContainer = ({ children, title, href }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  const transform = isHovered
    ? `perspective(1000px) rotateX(${(position.y - 150) / 20}deg) rotateY(${
        (position.x - 150) / -20
      }deg)`
    : "perspective(1000px) rotateX(0deg) rotateY(0deg)";

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        // This creates the 3D space for the children
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{ transform }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative" // Use className for styling if preferred
      >
        {/* The "pin" element */}
        <div
          className="absolute top-0 left-0 w-4 h-4 rounded-full bg-slate-500"
          style={{
            transform: `translate(${position.x - 8}px, ${
              position.y - 8
            }px) scale(${isHovered ? 1.5 : 0})`,
            transition:
              "transform 0.2s ease-out, background-color 0.2s ease-out",
            backgroundColor: isHovered ? "#3d5a80" : "#e0e0e0", // Using your theme colors
            opacity: isHovered ? 1 : 0,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
};
