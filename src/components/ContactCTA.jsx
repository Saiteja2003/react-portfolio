// src/components/ContactCTA.jsx

import React from "react";
import styles from "./ContactCTA.module.css";
import { Mail } from "lucide-react";

function ContactCTA() {
  return (
    <section className={styles.contactSection}>
      <div className="container">
        <div className={styles.contentBox}>
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
      </div>
    </section>
  );
}

export default ContactCTA;
