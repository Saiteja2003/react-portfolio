// src/components/Timeline.jsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './Timeline.module.css';

// --- (TimelineData remains the same) ---
const timelineData = [
  {
    date: "August 2021",
    title: "First Steps in Web Development",
    description: "Built tiny web apps that barely worked… but sparked a love for code.",
  },
  {
    date: "December 2022",
    title: "Academic Mini Project",
    description: "Created a student record manager — less paperwork, more brainwork.",
  },
  {
    date: "July 2023",
    title: "Freelance Startup Adventure",
    description: "Helped friends launch a freelance gig - ArcheTech Global (ATG) played strategist, sometimes debugger, always cheerleader.",
  },
  {
    date: "March 2024",
    title: "IoT Smart Power Management System",
    description: "Built a power-saving IoT system; turned “switch it off” into a tech solution. Even got a paper out of it.",
  },
  {
    date: "June 2024",
    title: "Bachelor’s in Computer Science & Engineering",
    description: "Seshadri Rao Gudlavalleru Engineering College, India. Graduated with a solid 8.9 CGPA.",
  },
  {
    date: "2025 Present",
    title: "Master’s in Web & Data Science",
    description: "Expanding expertise in modern web technologies and data-driven systems",
  },
];


// **CHANGE 1: TimelineItem now accepts a 'side' prop**
const TimelineItem = ({ date, title, description, side }) => {
  // **CHANGE 2: Animation direction is now based on the 'side' prop**
  const itemVariants = {
    hidden: { opacity: 0, x: side === 'left' ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    // **CHANGE 3: A conditional class is added for left/right styling**
    <motion.div
      className={`${styles.timelineItem} ${side === 'left' ? styles.left : styles.right}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={itemVariants}
    >
      <div className={styles.timelineDot}></div>
      <div className={styles.timelineContent}>
        <span className={styles.date}>{date}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </motion.div>
  );
};


function Timeline() {
  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const contentTranslateY = useTransform(scrollYProgress, [0, 1], ["0%", `-${100 - 100 / timelineData.length}%`]);

  return (
    <div className={styles.timelineContainer} ref={scrollContainerRef}>
      <div className={styles.stickyWrapper}>
        <div className={styles.headerContent}>
          <h2>About Me</h2>
          <h3>My Journey</h3>
        </div>
        <div className={styles.timeline}>
            <motion.div className={styles.scrollBeam} style={{ scaleY }} />
            <motion.div style={{ y: contentTranslateY }}>
              {timelineData.map((item, index) => (
                // **CHANGE 4: We determine the 'side' based on the item's index (even/odd)**
                <TimelineItem
                  key={index}
                  side={index % 2 === 0 ? 'left' : 'right'}
                  {...item}
                />
              ))}
            </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;