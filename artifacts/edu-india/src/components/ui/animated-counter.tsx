import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ value, duration = 2, className = "", prefix = "", suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // Easing function (easeOutQuart)
        const easeOutProgress = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(easeOutProgress * value));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [inView, value, duration]);

  // Format large numbers
  const formattedCount = count >= 1000000 
    ? (count / 1000000).toFixed(1) + 'M'
    : count >= 10000 
      ? (count / 1000).toFixed(0) + 'K' 
      : count.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
}