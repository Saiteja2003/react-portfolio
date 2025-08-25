// src/components/ChartRatings.jsx

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ChartRatings.module.css';

function ChartRatings() {
  // Animation variants for the entire container
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.5, // Delay it slightly to animate after the timeline starts
        ease: "easeOut"
      }
    }
  };

  return (
    // This outer div will handle the sticky positioning
    <div className={styles.stickyContainer}>
      <motion.div
        className={styles.chartContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <h4>Skills & Ratings</h4>
        <div className={styles.chartPreview}>
          <p>Chart preview will be displayed here.</p>
          {/* We will replace this with actual charts later */}
        </div>
      </motion.div>
    </div>
  );
}

export default ChartRatings;