'use client';

import { useCallback, useEffect, useRef, type ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spotlight-left', `${rect.left}px`);
    el.style.setProperty('--spotlight-top', `${rect.top}px`);
    el.style.setProperty('--mouse-x', `${rect.left + rect.width / 2}px`);
    el.style.setProperty('--mouse-y', `${rect.top + rect.height / 2}px`);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spotlight-left', `${rect.left}px`);
    el.style.setProperty('--spotlight-top', `${rect.top}px`);
    el.style.setProperty('--mouse-x', `${e.clientX}px`);
    el.style.setProperty('--mouse-y', `${e.clientY}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}
