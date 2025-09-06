// src/components/ChartRatings.jsx
import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import styles from "./ChartRatings.module.css";
import { motion } from "framer-motion";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

function ChartRatings() {
  const { theme } = useContext(ThemeContext);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // A single function to update chart styles
    const updateChartStyles = () => {
      const getCssVar = (varName) =>
        getComputedStyle(document.documentElement)
          .getPropertyValue(varName)
          .trim();

      const primaryColor = getCssVar("--primary-color");
      const textColor = getCssVar("--text-color");
      const accentColor = getCssVar("--accent-color"); // ✅ Bug Fix: Was using --primary-color
      const cardBgColor = getCssVar("--card-bg-color");

      setChartData({
        labels: [
          "React",
          "CSS",
          "JavaScript",
          "Node.js",
          "UI/UX Design",
          "Git",
        ],
        datasets: [
          {
            label: "Proficiency",
            data: [9, 8, 8, 8, 9, 9],
            backgroundColor: accentColor + "33", // ~20% opacity
            borderColor: accentColor,
            borderWidth: 2,
            pointBackgroundColor: accentColor,
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: accentColor,
          },
        ],
      });

      setChartOptions({
        layout: {
          padding: {
            top: 10,
            bottom: 80, // Add extra space at the bottom for the Node.js label
          },
        },
        scales: {
          r: {
            angleLines: { color: textColor + "80" },
            grid: { color: textColor + "40" }, // Softer grid lines
            pointLabels: {
              font: { size: 14, family: "'Inter', sans-serif" },
              color: textColor,
            },
            ticks: {
              backdropColor: cardBgColor,
              color: primaryColor,
              stepSize: 2,
              font: { size: 10 },
            },
            suggestedMin: 0,
            suggestedMax: 10,
          },
        },
        plugins: { tooltip: { enabled: true } },
        maintainAspectRatio: false,
      });
    };

    const timer = setTimeout(() => {
      updateChartStyles();
    }, 100);
    // Update styles on initial mount
    updateChartStyles();

    // Watch for theme changes and update styles
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.attributeName === "data-theme")) {
        updateChartStyles();
      }
    });
    observer.observe(document.body, { attributes: true });

    return () => {
      clearTimeout(timer); // Clear the timer
      observer.disconnect();
    };
  }, []);

  if (!chartOptions.scales) return <div>Loading Chart...</div>;

  return (
    <motion.div className={styles.chartContainer}>
      <h2 className={styles.mainHeading}>My Skills</h2>
      <p className={styles.subtitle}>
        A visual representation of my proficiency across key technologies.
      </p>
      <div className={styles.chartWrapper}>
        <Radar key={theme} data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
}

export default ChartRatings;
