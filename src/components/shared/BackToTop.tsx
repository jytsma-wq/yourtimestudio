'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const ui = useTranslations('ui');
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollY / docHeight : 0;
      setProgress(pct);
      setVisible(scrollY > 600);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <button
      onClick={handleClick}
      aria-label={ui('backToTop')}
      className={`fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40 hidden items-center justify-center w-12 h-12 rounded-full bg-card border border-border shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95 md:flex ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" width="48" height="48" viewBox="0 0 48 48">
        <circle
          cx="24" cy="24" r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
        />
        <circle
          cx="24" cy="24" r={radius}
          fill="none"
          stroke="var(--teal)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>
      <ArrowUp className="size-4 text-foreground" />
    </button>
  );
}
