// src/App.jsx

import React, { useEffect, useState } from "react"; // 1. Import useEffect
import { useLenis } from "./hooks/useLenis"; // 2. Import Lenis
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/header";
import About from "./components/about";
import Projects from "./components/Projects";
import Footer from "./components/footer";
import CustomCursor from "./components/CustomCursor";
import Home from "./components/Home";
import { LenisProvider } from "@/context/LenisContext";

function App() {
  const lenis = useLenis(); // 2. Add state to hold the Lenis instance

  return (
    <ThemeProvider>
      <LenisProvider>
        {/* 3. Add the CustomCursor component */}

        <CustomCursor />

        {/* 4. Pass the lenis instance down to the Header */}
        <Header />
        <Home />
        <main>
          <About />
          <Projects />
        </main>
        <Footer />
      </LenisProvider>
    </ThemeProvider>
  );
}

export default App;
