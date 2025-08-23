// src/components/Projects.jsx
import React from 'react';

function Projects() {
  return (
    // This section will also be full-width
    <section id="projects">
      {/* This container keeps the grid centered */}
      <div className="container">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {/* ...your project cards... */}
          <div className="project-card cursor-grow-target">
            <h3>Project One</h3>
            <p>A brief description of my first awesome project.</p>
            <a href="#">View on GitHub</a>
          </div>
          <div className="project-card cursor-grow-target">
            <h3>Project Two</h3>
            <p>A brief description of my second awesome project.</p>
            <a href="#">View on GitHub</a>
          </div>
          <div className="project-card cursor-grow-target"> 
            <h3>Project Three</h3>
            <p>A brief description of my third awesome project.</p>
            <a href="#">View on GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;