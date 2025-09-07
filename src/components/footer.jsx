// src/components/Footer.jsx

import React from "react";
import styles from "./Footer.module.css";
import { Github, Linkedin, Mail } from "lucide-react";
import { useSharedLenis } from "@/context/LenisContext";
function Footer() {
  const lenis = useSharedLenis();
  const handleGoToTop = (e) => {
    e.preventDefault();
    lenis?.scrollTo(0, { duration: 2 });
  };

  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        {/* --- Top "Call to Action" Section --- */}
        <div className={styles.ctaSection}>
          <h2 className={styles.heading}>Let's Connect</h2>
          <p className={styles.subheading}>
            I'm currently seeking new opportunities. My inbox is always open.
          </p>
          <a
            href="mailto:challasaiteja26@gmail.com"
            className={`${styles.emailLink} cursor-grow-target`}
          >
            <Mail size={20} />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* --- Bottom Footer Bar --- */}
        <div className={styles.footerBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Saiteja Challa.
          </p>
          <div className={styles.socials}>
            <a
              href="https://github.com/Saiteja2003"
              aria-label="GitHub"
              className="cursor-grow-target"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/saiteja-challa-124555228"
              aria-label="LinkedIn"
              className="cursor-grow-target"
            >
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
      </div>
    </footer>
  );
}

export default Footer;
