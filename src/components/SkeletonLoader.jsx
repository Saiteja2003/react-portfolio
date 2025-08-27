import React from 'react';
import styles from './SkeletonLoader.module.css';

function SkeletonLoader() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonHeader}></div>
      <div className={styles.skeletonContent}></div>
      <div className={styles.skeletonContent}></div>
      <div className={styles.skeletonContent}></div>
    </div>
  );
}

export default SkeletonLoader;