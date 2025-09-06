// src/components/Projects.jsx
import React from "react";
import styles from "./Projects.module.css";
import { PinContainer } from "./ui/PinContainer";
import { motion } from "framer-motion";
// You would fetch this data from a CMS or a local file in a real app
const projectData = [
  {
    title: "Project One",
    description:
      "A detailed description of my first project, showcasing the problem it solves and the tech used.",
    tags: ["React", "Node.js", "CSS Grid"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl:
      "https://via.placeholder.com/600x400.png/3d5a80/ffffff?text=Project+Image",
    featured: true,
  },
  {
    title: "Project Two",
    description:
      "This project focused on UI/UX, implementing advanced animations and a seamless user flow.",
    tags: ["UI/UX", "GSAP", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl:
      "https://via.placeholder.com/600x400.png/98c1d9/1a1a1a?text=Project+Image",
  },
  {
    title: "Project Three",
    description:
      "A data-driven application that visualizes complex datasets in an intuitive way.",
    tags: ["Data Viz", "Chart.js", "API"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl:
      "https://via.placeholder.com/600x400.png/e0fbfc/1a1a1a?text=Project+Image",
  },
];

function Projects() {
  const featuredProjects = projectData.filter((p) => p.featured);
  const regularProjects = projectData.filter((p) => !p.featured);
  return (
    <section id="projects">
      <div className="container">
        <div className={styles.headingContainer}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.mainHeading}
          >
            My Work
          </motion.h2>
        </div>
        {/* 2. Render the Featured Project(s) Section */}
        {featuredProjects.length > 0 && (
          <div className={styles.featuredContainer}>
            {featuredProjects.map((project, index) => (
              <div key={index} className={styles.featuredCard}>
                <div className={styles.featuredImageContainer}>
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                  />
                </div>
                <div className={styles.featuredCardContent}>
                  <h5 className={styles.featuredBadge}>Featured Project</h5>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.links}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* 3. Render the Regular Projects Grid */}
        <div className={styles.projectsGrid}>
          {regularProjects.map((project, index) => (
            <div key={index} className={styles.pinWrapper}>
              <PinContainer
                title={project.title}
                key={index}
                className={`${styles.projectCard} cursor-grow-target`}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>{project.title}</h3>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p>{project.description}</p>
                  <div className={styles.links}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
