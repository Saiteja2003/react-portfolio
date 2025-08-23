// src/components/Header.jsx

import React from 'react';

function Header({ lenis }) {
  const handleNavClick = (event, targetSelector) => {
    event.preventDefault();
    
    // 1. Check the screen width to determine the scroll duration
    // If screen is less than 768px wide (mobile), duration is 0.8s. Otherwise, it's 2s.
    const scrollDuration = window.innerWidth < 768 ? 0.8 : 2;

    if (lenis) {
      // 2. Use the dynamic duration in the Lenis scroll command
      lenis.scrollTo(targetSelector, {
        duration: scrollDuration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }

    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      targetElement.classList.add('section-flash');
      // 3. Use the same duration (in milliseconds) for the flash effect
      setTimeout(() => {
        targetElement.classList.remove('section-flash');
      }, scrollDuration * 1000);
    }
  };

  return (
    <header>
      <a 
        href="/" 
        className="home-link cursor-grow-target" 
        onClick={(e) => handleNavClick(e, 0)}
      >
        <h1>Saiteja Challa</h1>
      </a>
      <nav>
        <a 
          href="#about" 
          className="cursor-grow-target" 
          onClick={(e) => handleNavClick(e, '#about')}
        >
          About
        </a>
        <a 
          href="#projects" 
          className="cursor-grow-target" 
          onClick={(e) => handleNavClick(e, '#projects')}
        >
          Projects
        </a>
        <a 
          href="#contact" 
          className="cursor-grow-target" 
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;