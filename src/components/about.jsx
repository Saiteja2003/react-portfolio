// src/components/About.jsx
import React from 'react';
import Timeline from './Timeline';
import ChartRatings from './ChartRatings';
import styles from './About.module.css';

function About() {
  return (
    // We use the 'section' tag from our old file, but add a new class for the grid
    <section id="about" className={styles.aboutSection}>
      <div className={`${styles.aboutGrid} container`}>
        <div className={styles.timelineColumn}>
          <Timeline />
        </div>
        <div className={styles.chartColumn}>
          <ChartRatings />
        </div>
      </div>
    </section>
  );
}

export default About;