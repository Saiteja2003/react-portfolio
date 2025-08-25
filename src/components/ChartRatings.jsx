// src/components/ChartRatings.jsx

import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import styles from './ChartRatings.module.css';

// Register the components Chart.js needs
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

// --- Chart Data & Options ---
const skillsData = {
  labels: ['React', 'CSS', 'JavaScript', 'Node.js', 'UI/UX Design', 'Git'],
  datasets: [{
    label: 'Proficiency',
    data: [9, 8, 8, 8, 9, 9],
    backgroundColor: 'rgba(74, 111, 165, 0.2)',
    borderColor: 'rgba(74, 111, 165, 1)',
    borderWidth: 2,
  }],
};

const chartOptions = {
  scales: {
    r: {
      angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
      grid: { color: 'rgba(255, 255, 255, 0.2)' },
      pointLabels: { font: { size: 14, family: "'Inter', sans-serif" }, color: '#f8f9fa' },
      ticks: { backdropColor: '#212529', color: '#f8f9fa', stepSize: 2 },
      suggestedMin: 0,
      suggestedMax: 10,
    },
  },
  plugins: { tooltip: { enabled: true } },
  maintainAspectRatio: false,
};

function ChartRatings() {
  return (
    <div className={styles.stickyContainer}>
      <h2 className={styles.panelHeading}>My Skills</h2>
      <div className={styles.chartContainer}>
        <h4>Skills & Ratings</h4>
        <div className={styles.chartWrapper}>
          <Radar data={skillsData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default ChartRatings;