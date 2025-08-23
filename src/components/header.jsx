// src/components/Header.jsx

import React from 'react';

function Header({ lenis }) {
  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      targetElement.classList.add('section-flash');
      setTimeout(() => {
        targetElement.classList.remove('section-flash');
      }, 1500);
    }
  };

  const handleHomeClick = (event) => {
    // We can keep this log for now to confirm it's working
    console.log("Home click handler is running..."); 
    event.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  return (
    <header>
      <a 
        href="/" 
        className="home-link cursor-grow-target" 
        onClick={handleHomeClick} // <-- This was the missing piece
      >
        <h1>Saiteja Challa</h1>
      </a>
      <nav>
        <a 
          href="#about" 
          className="cursor-grow-target" 
          onClick={(e) => handleNavClick(e, 'about')}
        >
          About
        </a>
        <a 
          href="#projects" 
          className="cursor-grow-target" 
          onClick={(e) => handleNavClick(e, 'projects')}
        >
          Projects
        </a>
        <a 
          href="#contact" 
          className="cursor-grow-target" 
          onClick={(e) => handleNavClick(e, 'contact')}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;