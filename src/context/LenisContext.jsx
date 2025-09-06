// src/context/LenisContext.jsx
import React, { createContext, useContext } from "react";
import { useLenis } from "../hooks/useLenis";

const LenisContext = createContext(null);

// Create a custom hook for easy access
export const useSharedLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }) => {
  const lenis = useLenis();
  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
};
