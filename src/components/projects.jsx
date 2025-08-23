// src/components/Projects.jsx

import React from 'react';

function Projects() {
  return (
    <section id="projects">
      <h2>My Projects</h2>
      <div className="project-card">
        <h3>Project One</h3>
        <p>A brief description of my first awesome project.</p>
        <a href="#">View on GitHub</a>
      </div>
      <div className="project-card">
        <h3>Project Two</h3>
        <p>A brief description of my second awesome project.</p>
        <a href="#">View on GitHub</a>
      </div>
    </section>
  );
}

export default Projects;