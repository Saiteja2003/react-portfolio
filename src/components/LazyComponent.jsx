import React, { useState, useEffect, useRef, Suspense } from 'react';

function LazyComponent({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // When the placeholder is visible, set isVisible to true
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Stop observing once it's visible
      }
    });

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    // If it's visible, render the actual component. If not, render a placeholder.
    isVisible ? (
      <Suspense fallback={<div style={{ height: '100vh' }}>Loading...</div>}>
        {children}
      </Suspense>
    ) : (
      <div ref={placeholderRef} style={{ height: '100vh' }} />
    )
  );
}

export default LazyComponent;