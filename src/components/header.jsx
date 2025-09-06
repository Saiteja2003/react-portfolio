// src/components/Header.jsx

import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useSharedLenis } from "@/context/LenisContext";
function Header() {
  const lenis = useSharedLenis();
  const handleNavClick = (event, targetSelector) => {
    event.preventDefault();
    const targetElement = document.querySelector(targetSelector);

    if (!targetElement) return; // Exit if the target doesn't exist

    // --- This is the new logic ---
    if (window.innerWidth < 768) {
      // --- MOBILE LOGIC ---
      // Use the browser's native, high-performance smooth scroll
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // --- DESKTOP LOGIC ---
      // Use Lenis for the custom, longer animation
      if (lenis) {
        lenis.scrollTo(targetElement, {
          duration: 2, // The 2-second duration you like on desktop
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }

    // The "flash" highlight works for both
    targetElement.classList.add("section-flash");
    const animationDuration = window.innerWidth < 768 ? 800 : 2000; // Match duration
    setTimeout(() => {
      targetElement.classList.remove("section-flash");
    }, animationDuration);
  };
  const handleReload = (event) => {
    // 1. Prevent the link from trying to navigate away
    event.preventDefault();
    // 2. Force the browser to reload the current page
    window.location.reload();
  };
  return (
    <header className="main-header">
      <a
        href="#"
        className="home-link cursor-grow-target"
        onClick={handleReload}
        //onClick={(e) => handleNavClick(e, '#root')} // Target the main app container
      >
        <h1>Saiteja Challa</h1>
      </a>
      <nav>
        <a
          href="#about"
          className="cursor-grow-target"
          onClick={(e) => handleNavClick(e, "#about")}
        >
          About
        </a>
        <a
          href="#projects"
          className="cursor-grow-target"
          onClick={(e) => handleNavClick(e, "#projects")}
        >
          Projects
        </a>
        <a
          href="#contact"
          className="cursor-grow-target"
          onClick={(e) => handleNavClick(e, "#contact")}
        >
          Contact
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}

export default Header;
