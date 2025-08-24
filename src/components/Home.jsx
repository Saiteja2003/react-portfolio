// src/components/Home.jsx

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import styles from './Home.module.css';

// Receive the 'lenis' prop
function Home({ lenis }) {
  const handleScrollClick = () => {
    if (lenis) {
      lenis.scrollTo('#about'); // Tell Lenis to scroll to the About section
    }
  };

  return (
    <section id="home" className={styles.homeContainer}>
      <div className={styles.contentWrapper}>
        <TypeAnimation
          sequence={[
            'Hello, I am Saiteja.',
            2000,
            "Crafting digital solutions with code.",
            2000,
            "Let's Build Together.",
            3000,
          ]}
          wrapper="h1"
          cursor={true}
          repeat={0}
          className={styles.typewriter}
        />
        {/* Add a static subtitle below the typewriter */}
        <p className={styles.subtitle}>Building ideas into reality.</p>
      </div>

      {/* Add the scroll-down button */}
      <a 
        href="#about" 
        className={styles.scrollButton} 
        onClick={handleScrollClick}
      >
        <span></span>
      </a>
    </section>
  );
}

export default Home;