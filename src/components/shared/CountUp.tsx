'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  number: number;
  suffix?: string;
  duration?: number;
  /** Delay in milliseconds before starting the animation */
  delay?: number;
  className?: string;
}

export function CountUp({ number, suffix = '', duration = 1500, delay = 0, className }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Apply the stagger delay before starting animation
          const timeout = setTimeout(() => {
            const startTime = performance.now();
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              // Preserve decimal places for numbers like 1.2
              const decimals = number % 1 !== 0 ? 1 : 0;
              const current = eased * number;
              setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current));
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }, delay);

          return () => clearTimeout(timeout);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [number, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
