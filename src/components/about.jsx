// src/components/About.jsx

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Timeline from './Timeline';
import ChartRatings from './ChartRatings';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const containerRef = useRef(null);
  const panelsRef = useRef(null);
  const timelineWrapperRef = useRef(null); // Changed name for clarity
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!timelineWrapperRef.current || !panelsRef.current) return;

      const panels = gsap.utils.toArray(panelsRef.current.children);
      const wrapper = timelineWrapperRef.current;
      
      // Use scrollHeight to get the full height of the scrollable content
      const scrollDistance = wrapper.scrollHeight - wrapper.clientHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: "+=5000", // A generous, fixed scroll distance for a slow, premium feel
        },
      });

      // --- THE DEFINITIVE FIX IS HERE ---

      // Phase 1: A "dummy" animation for the virtual scroll
      if (scrollDistance > 0) {
        tl.to({}, { // Target an empty object, as we only need the onUpdate callback
          duration: 2, // Dedicate 3/4 of the scroll to reading the timeline
          onUpdate: function() {
            // Get the progress of this specific animation (0 to 1)
            const progress = this.progress();
            // Manually set the scrollTop of the wrapper
            wrapper.scrollTop = progress * scrollDistance;
            // Update the state to animate the scroll beam in the Timeline component
            setTimelineProgress(progress);
          },
        });
      }
      
      // Phase 2: The horizontal slide (starts after the dummy tween is complete)
      tl.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        duration: 1, // Dedicate 1/4 of the scroll to the slide
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className={styles.aboutContainer}>
      <div ref={panelsRef} className={styles.panelsContainer}>
        {/* Panel 1: The Timeline */}
        <div className={styles.panel}>
          {/* This wrapper is now correctly being scrolled internally */}
          <div ref={timelineWrapperRef} className={styles.timelineWrapper}>
            <h2 className={styles.panelHeading}>My Journey</h2>
            <Timeline scrollProgress={timelineProgress} />
          </div>
        </div>
        {/* Panel 2: The Ratings Chart */}
        <div className={styles.panel}>

            <ChartRatings />
          </div>
        </div>
    </section>
  );
}

export default About;