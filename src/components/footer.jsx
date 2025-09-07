// src/components/Footer.jsx
import React from "react";
import styles from "./Footer.module.css";
import { Github, Linkedin, Mail } from "lucide-react"; // Example icons
import { useSharedLenis } from "@/context/LenisContext";

function Footer() {
  const lenis = useSharedLenis();
  const handleGoToTop = (e) => {
    e.preventDefault();
    lenis?.scrollTo(0, { duration: 2 });
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContent} container`}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Saiteja Challa All rights reserved.
        </p>
        <div className={styles.socials}>
          <a href="#" aria-label="GitHub" className="cursor-grow-target">
            <Github />
          </a>
          <a href="#" aria-label="LinkedIn" className="cursor-grow-target">
            <Linkedin />
          </a>
        </div>
        <button
          className={`${styles.topLink} cursor-grow-target`}
          onClick={handleGoToTop}
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}

export default Footer;
