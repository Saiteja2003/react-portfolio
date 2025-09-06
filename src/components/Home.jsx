// src/components/Home.jsx

import React from "react";
import { TypeAnimation } from "react-type-animation";
import styles from "./Home.module.css";
import Tilt from "react-parallax-tilt";
import { useSharedLenis } from "@/context/LenisContext";

const TiltableShape = ({ className }) => (
  <div className={`${styles.floatingShape} ${className}`} />
);

function Home() {
  const lenis = useSharedLenis();
  const handleScrollClick = () => {
    e.preventDefault(); // Prevent default link behavior
    if (lenis) {
      lenis.scrollTo("#about"); // Tell Lenis to scroll to the About section
    }
  };

  return (
    <section id="home" className={styles.homeContainer}>
      <Tilt
        className={styles.tiltWrapper}
        perspective={1500}
        scale={1.02}
        gyroscope={true}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
      >
        <div className={styles.heroWrapper}>
          <TiltableShape className={styles.shape1} />
          <TiltableShape className={styles.shape2} />
          <TiltableShape className={styles.shape3} />

          <div className={styles.contentWrapper}>
            <TypeAnimation
              sequence={[
                "Hello, I am Saiteja.",
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
        </div>
      </Tilt>
      {/* Add the scroll-down button */}
      <a
        href="#about"
        className={`${styles.scrollButton}  cursor-grow-target`}
        onClick={handleScrollClick}
      >
        <span></span>
      </a>
    </section>
  );
}

export default Home;
