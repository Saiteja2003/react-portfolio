// src/components/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';
import { Github, Linkedin, Mail } from 'lucide-react'; // Example icons

function Footer({ lenis }) {
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
            <p>I'm currently seeking new opportunities. Feel free to reach out.</p>
            <a href="mailto:challasaiteja26@gmail.com" className={styles.emailLink}>
              challasaiteja26@gmail.com
            </a>
          </div>
          <div className={styles.footerNav}>
            <div className={styles.socials}>
              <a href="#" aria-label="GitHub"><Github /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin /></a>
              <a href="mailto:challasaiteja26@gmail.com" aria-label="Email"><Mail /></a>
            </div>
            <button className={styles.topLink} onClick={handleGoToTop}>
              Back to Top ↑
            </button>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Saiteja Challa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;