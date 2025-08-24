// src/components/Footer.jsx

import React from 'react';

function Footer({ lenis }) {
  const handleGoToTop = () => {
    if (lenis) {
      // Use Lenis to smoothly scroll to the top
      lenis.scrollTo(0, { duration: 2 }); 
    }
  };
  return (
    <footer id="contact" className="cursor-grow-target">
      <p>Contact me at: <a className ="email-link" href="mailto:challasaiteja26@gmail.com">challasaiteja26@gmail.com</a></p>
      <button className="top-link" onClick={handleGoToTop}>
        Go to Top ↑
      </button>
      <p>&copy; 2025 Saiteja Challa. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;