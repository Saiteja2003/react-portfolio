// src/components/About.jsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Timeline from "./Timeline";
import ChartRatings from "./ChartRatings";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const containerRef = useRef(null);
  const panelsRef = useRef(null);
  const timelineWrapperRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!timelineWrapperRef.current || !panelsRef.current) return;

      const panels = gsap.utils.toArray(panelsRef.current.children);
      const wrapper = timelineWrapperRef.current;
      const scrollDistance = wrapper.scrollHeight - wrapper.clientHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: "+=5000",
        },
      });

      if (scrollDistance > 0) {
        tl.to(wrapper, {
          scrollTop: scrollDistance,
          duration: 2,
          ease: "none",
          onUpdate: function () {
            const progress = this.progress();
            setTimelineProgress(progress);
          },
        });
      }

      tl.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        duration: 1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className={styles.aboutContainer}>
      <div ref={panelsRef} className={styles.panelsContainer}>
        {/* Panel 1: The Timeline */}
        <div className={styles.panel}>
          <div ref={timelineWrapperRef} className={styles.timelineWrapper}>
            <h2 className={styles.panelHeading}>My Journey</h2>
            <Timeline scrollProgress={timelineProgress} />
          </div>
        </div>
        {/* Panel 2: The Ratings Chart */}
        <div className={`${styles.panel} ${styles.chartPanel}`}>
          <ChartRatings />
        </div>
      </div>
    </section>
  );
}

export default About;
