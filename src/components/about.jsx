// src/components/About.jsx

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Timeline from './Timeline';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const skillsData = {
  labels: ['React', 'CSS', 'JavaScript', 'Node.js', 'UI/UX Design', 'Git'],
  datasets: [{ label: 'Proficiency', data: [9, 8, 8, 7, 9, 8], backgroundColor: 'rgba(74, 111, 165, 0.2)', borderColor: 'rgba(74, 111, 165, 1)', borderWidth: 2 }],
};

const chartOptions = {
  scales: { r: { angleLines: { color: 'rgba(255, 255, 255, 0.25)' }, grid: { color: 'rgba(255, 255, 255, 0.25)' }, pointLabels: { font: { size: 14, family: "'Inter', sans-serif" }, color: '#f8f9fa' }, ticks: { backdropColor: '#212529', color: '#f8f9fa', stepSize: 2 }, suggestedMin: 0, suggestedMax: 10 }},
  plugins: { tooltip: { enabled: true } },
  maintainAspectRatio: false,
};

function About() {
  const containerRef = useRef(null);
  const panelsRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!panelsRef.current) return;
      const panels = gsap.utils.toArray(panelsRef.current.children);
      const amount = panels.length - 1;

      gsap.to(panels, {
        xPercent: -100 * amount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / amount,
          end: () => "+=" + panelsRef.current.offsetWidth,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className={styles.aboutContainer}>
      <div ref={panelsRef} className={styles.panelsContainer}>
        {/* Panel 1: Timeline */}
        <div className={`${styles.panel} ${styles.timelinePanel}`}>
          <div className={styles.panelContent}>
            <h2 className={styles.panelHeading}>My Journey</h2>
            <Timeline ref={timelineRef} />
          </div>
        </div>
        {/* Panel 2: Skills Chart */}
        <div className={`${styles.panel} ${styles.chartPanel}`}>
          <div className={styles.panelContent}>
            <h2 className={styles.panelHeading}>My Skills</h2>
            <div className={styles.chartWrapper}>
              <Radar data={skillsData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;