// src/components/Timeline.jsx

import React from 'react';
import { motion } from 'framer-motion'; // We only need motion, not the scroll hooks
import styles from './Timeline.module.css';

const timelineData = [
  { date: "August 2021", title: "First Steps in Web Development", description: "Built tiny web apps that barely worked… but sparked a love for code." },
  { date: "December 2022", title: "Academic Mini Project", description: "Created a student record manager — less paperwork, more brainwork." },
  { date: "July 2023", title: "Freelance Startup Adventure", description: "Helped friends launch a freelance gig - ArcheTech Global (ATG) played strategist, sometimes debugger, always cheerleader." },
  { date: "March 2024", title: "IoT Smart Power Management System", description: "Built a power-saving IoT system; turned “switch it off” into a tech solution. Even got a paper out of it." },
  { date: "June 2024", title: "Bachelor’s in Computer Science & Engineering", description: "Seshadri Rao Gudlavalleru Engineering College, India. Graduated with a solid 8.9 CGPA." },
  { date: "2025 Present", title: "Master’s in Web & Data Science", description: "Expanding expertise in modern web technologies and data-driven systems" },
];

const TimelineItem = ({ date, title, description, side }) => (
  <div className={`${styles.timelineItem} ${side === 'left' ? styles.left : styles.right}`}>
    <div className={styles.timelineDot} />
    <div className={styles.timelineContent}>
      <span className={styles.date}>{date}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
);

// The component now accepts a 'scrollProgress' prop
function Timeline({ scrollProgress }) {
  return (
    <div className={styles.timelineContainer}>
      {/* The animated scroll beam's height is now controlled by the prop */}
      <motion.div className={styles.scrollBeam} style={{ scaleY: scrollProgress }} />
      {timelineData.map((item, index) => (
        <TimelineItem
          key={index}
          side={index % 2 === 0 ? 'left' : 'right'}
          {...item}
        />
      ))}
    </div>
  );
}

export default Timeline;