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


const TimelineItem = ({ date, title, description, side, index, totalItems, animationProgress }) => {
  const activationPoint = index / (totalItems - 1);
  const uncoloredShadow = "0 0 0px rgba(0,0,0,0)"; // No shadow
  const coloredShadow = "0 0 15px var(--secondary-color)"; // Glowing shadow
  const uncolored = "var(--background-color)";
  const colored = "var(--accent-color)";  

  // THE FIX IS HERE: The animation is reversed.
  // The transition now happens just AFTER the beam passes the dot's activation point.
  // The color output range is swapped from [uncolored, colored] to [colored, uncolored].
  const animatedShadow = useTransform(
    animationProgress,
    [activationPoint - 0.1, activationPoint, activationPoint + 0.1],
    [uncoloredShadow, coloredShadow, uncoloredShadow]
  );
  
  const backgroundColor = useTransform(
    animationProgress,
    [activationPoint, activationPoint + 0.01], // Transition happens as the beam LEAVES the dot
    [colored, uncolored] // Color fades from colored to uncolored
  );

  const borderColor = useTransform(
    animationProgress,
    [activationPoint, activationPoint + 0.01],
    [colored, uncolored]
  );
  
  const itemVariants = {
    hidden: { opacity: 0, x: side === 'left' ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  return (
    <div className={`${styles.timelineItem} ${side === 'left' ? styles.left : styles.right}`}>
      <motion.div 
        className={styles.timelineDot} 
        //style={{ backgroundColor, borderColor }} 
        style={{ boxShadow: animatedShadow }}
      />
      <motion.div
        className={styles.timelineContent}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <span className={styles.date}>{date}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </motion.div>
    </div>
  );

}

function Timeline() {
  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end start"],
  });

  const animationProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const easedProgress = useSpring(animationProgress, {
    stiffness: 120,
    damping: 40,
  });


  // CHANGE 2: The beam now starts at 0.5% height instead of 0
  const scaleY = useTransform(animationProgress, [0, 1], [0.002, 1]);

  const contentTranslateY = useTransform(
    easedProgress,
    [0, 1],
    ["0%", `-${100 - 100 / timelineData.length}%`]
  );

  return (
    <div className={styles.timelineContainer} ref={scrollContainerRef}>
      <div className={styles.stickyWrapper}>
        <div className={styles.headerContent}>
          <div className={styles.headerTextContainer}>
          </div>
        </div>
        <div className={styles.timeline}>
            <motion.div className={styles.scrollBeam} style={{ scaleY }} />
            <motion.div style={{ y: contentTranslateY }}>
              {timelineData.map((item, index) => (
                <TimelineItem
                  key={index}
                  index={index}
                  totalItems={timelineData.length}
                  animationProgress={easedProgress}
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