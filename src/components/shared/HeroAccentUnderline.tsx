'use client';

import { type ReactNode } from 'react';

interface HeroAccentUnderlineProps {
  children: string;
  className?: string;
}

/**
 * HeroAccentUnderline — wraps the navy accent word in the hero H1
 * with a hand-drawn SVG wavy underline that draws itself on page load
 * (stroke-dashoffset animation). The single most recognisable "premium
 * studio" design detail.
 */
export function HeroAccentUnderline({ children, className = '' }: HeroAccentUnderlineProps) {
  return (
    <span className={`accent-underline text-navy ${className}`}>
      {children}
      <svg
        viewBox="0 0 200 12"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M2 8 C30 3, 60 11, 100 6 S170 2, 198 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
