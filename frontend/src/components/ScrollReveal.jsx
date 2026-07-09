import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, delay = 0, duration = 0.6, className = '' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05, // Trigger when at least 5% of the element is visible
        rootMargin: '0px 0px -40px 0px', // Trigger slightly before it fully enters
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.215, 0.610, 0.355, 1)', // Custom cubic-bezier for a premium, modern feel
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}
