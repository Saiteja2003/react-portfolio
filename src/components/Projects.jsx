// src/components/Projects.jsx
import React from "react";
import styles from "./Projects.module.css";
import { motion } from "framer-motion";
// You would fetch this data from a CMS or a local file in a real app
const projectData = [
  {
    title: "NexusReader",
    description:
      "A modern news aggregator that collects and displays articles from multiple sources in one clean, responsive interface. Built for speed, usability, and a premium reading experience.",
    tags: ["React", "Node.js", "CSS", "API", "RSS"],
    liveUrl: "https://www.nexusreader.org/",
    githubUrl: {
      client: "https://github.com/Saiteja2003/nexus-reader-client.git",
      api: "https://github.com/Saiteja2003/nexus-reader-api.git",
    },
    imageUrl: "/react-portfolio/images/nexus-reader-tiny.png",
    featured: true,
  },
  {
    title: "My Portfolio Website",
    description:
      "This project focused on UI/UX, implementing advanced animations and a seamless user flow.",
    tags: ["UI/UX", "Lenis", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "https://github.com/Saiteja2003/react-portfolio.git",
    imageUrl: "/react-portfolio/images/portfolio.png",
  },
  {
    title: "Archetech Global",
    description:
      "A premium freelance marketplace designed for seamless collaboration between clients and professionals, featuring a modern, high-end UI and smooth user experience.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://www.archetechglobal.com/",
    githubUrl: "https://github.com/Saiteja2003/ATG-Landing_Page.git",
    imageUrl: "/react-portfolio/images/archetechglobal.png",
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
                    {typeof project.githubUrl === "object" ? (
                      // If it's an object, render two buttons
                      <>
                        <a
                          href={project.githubUrl.client}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Client Code
                        </a>
                        <a
                          href={project.githubUrl.api}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          API Code
                        </a>
                      </>
                    ) : (
                      // Otherwise, render a single button
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* 3. Render the Regular Projects Grid */}
        <div className={styles.projectsGrid}>
          {regularProjects.map((project, index) => (
            <article
              key={index}
              className={`${styles.projectCard} cursor-grow-target`}
            >
              <img
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                className={styles.cardImage}
              />

              <div className={styles.cardContentWrapper}>
                <div className={styles.cardHeader}>
                  <h3>{project.title}</h3>
                </div>
                <div className={styles.cardDetails}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
