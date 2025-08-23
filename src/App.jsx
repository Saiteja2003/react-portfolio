// src/App.jsx

import React, { useEffect, useState } from 'react'; // 1. Import useEffect
import Lenis from '@studio-freight/lenis'; // 2. Import Lenis

import Header from './components/header';
import About from './components/about';
import Projects from './components/projects';
import Footer from './components/footer';
import CustomCursor from './components/CustomCursor';
import Home from './components/Home';

function App() {
  const [lenis, setLenis] = useState(null); // 2. Add state to hold the Lenis instance

  useEffect(() => {
    // Initialize Lenis
    const lenisInstance = new Lenis();
    setLenis(lenisInstance); // 3. Save the instance to state

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      {/* 4. Pass the lenis instance down to the Header */}
      <Header lenis={lenis} />
      <Home lenis={lenis}/>
      <main>
        <About />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;