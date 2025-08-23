// src/App.jsx

import React from 'react';
import Header from './components/header';
import About from './components/about';
import Projects from './components/projects';
import Footer from './components/footer';

// You can delete the default App.css or create your own styles.
// For now, let's remove the default import.
// import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <About />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;