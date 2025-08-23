// src/components/About.jsx
import React from 'react';

function About() {
  return (
    // This section will now be full-width
    <section id="about">
      {/* This div will keep the content centered and readable */}
      <div className="container cursor-grow-target">
        <h2>About Me</h2>
        <p>
          Welcome to my portfolio! I am a passionate developer with expertise in
          React, Node.js, and creating beautiful, functional web applications.
        </p>
      </div>
    </section>
  );
}

export default About;