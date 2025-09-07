// src/components/Home.jsx

import React, { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import Tilt from "react-parallax-tilt";
import styles from "./Home.module.css";
import { useSharedLenis } from "@/context/LenisContext";

// A simple component for the decorative floating shapes
const FloatingShape = ({ className }) => (
  <div className={`${styles.floatingShape} ${className}`} />
);

function Home() {
  const lenis = useSharedLenis();
  const [isHovered, setIsHovered] = useState(false);
  const typewriterRef = useRef(null);

  const handleScrollClick = (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo("#about");
    }
  };

  // This effect will now work correctly because the typewriter component is never destroyed
  useEffect(() => {
    if (typewriterRef.current) {
      if (isHovered) {
        typewriterRef.current.pause();
      } else {
        typewriterRef.current.start();
      }
    }
  }, [isHovered]);

  return (
    <section id="home" className={styles.homeContainer}>
      <div
        className={styles.heroWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Tilt
          className={styles.tiltWrapper}
          perspective={1500}
          glareEnable={true}
          glareMaxOpacity={0.1}
          scale={1.02}
          gyroscope={true}
        >
          <FloatingShape className={styles.shape1} />
          <FloatingShape className={styles.shape2} />
          <FloatingShape className={styles.shape3} />

          <div className={styles.contentWrapper}>
            {/* ✅ This is the new structure */}
            <h1
              className={`${styles.typewriterWrapper} ${
                isHovered ? styles.isHovered : ""
              }`}
            >
              {/* The hover message is now always present, but hidden by default */}
              <span className={styles.hoverMessage}>
                You can control the perspective.
              </span>

              {/* The typewriter is also always present */}
              <Typewriter
                onInit={(typewriter) => {
                  typewriterRef.current = typewriter;
                  typewriter
                    .typeString("Hello, I am Saiteja.")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Crafting digital solutions with code.")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("<strong>Let's Build Together.</strong>")
                    .start();
                }}
                options={{
                  loop: false,
                  delay: 50,
                  deleteSpeed: 30,
                  wrapperClassName: styles.typewriter, // Apply styles to the typewriter's wrapper
                  cursorClassName: styles.typewriter, // Apply styles to the cursor
                }}
              />
            </h1>
            <p className={styles.subtitle}>Building ideas into reality.</p>
          </div>
        </Tilt>
      </div>

      <a
        href="#about"
        className={`${styles.scrollButton} cursor-grow-target`}
        onClick={handleScrollClick}
      >
        <span></span>
      </a>
    </section>
  );
}

export default Home;
