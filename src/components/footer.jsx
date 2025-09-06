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
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.contactInfo}>
            <h3>Let's Connect</h3>
            <p>
              I'm currently seeking new opportunities. Feel free to reach out.
            </p>
            <a
              href="mailto:challasaiteja26@gmail.com"
              className={styles.emailLink}
            >
              <Mail size={20} />
              <span>Get in Touch</span>
            </a>
          </div>
          <div className={styles.footerNav}>
            <div className={styles.socials}>
              <a href="https://github.com/Saiteja2003" aria-label="GitHub">
                <Github />
              </a>
              <a
                href="https://www.linkedin.com/in/saiteja-challa-124555228"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
            </div>
            <button className={styles.topLink} onClick={handleGoToTop}>
              Back to Top ↑
            </button>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            &copy; {new Date().getFullYear()} Saiteja Challa. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
