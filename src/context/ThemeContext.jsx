// src/components/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

// ✅ A function to determine the correct initial theme
const getInitialTheme = () => {
  // 1. Check for a saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  
  // 2. If no saved theme, check OS preference
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    return 'dark';
  }

  // 3. Default to 'light'
  return 'light';
};


export const ThemeProvider = ({ children }) => {
  // ✅ Use the function to set the initial state
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // This effect now only syncs the attribute and localStorage
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};