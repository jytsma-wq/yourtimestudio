'use client';

interface HeroAccentUnderlineProps {
  children: string;
  className?: string;
}

export function HeroAccentUnderline({ children, className = '' }: HeroAccentUnderlineProps) {
  return (
    <span className={`relative inline-block text-sea-bright ${className}`}>
      {children}
      <svg
        viewBox="0 0 200 12"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute -bottom-1 left-0 h-2 w-full text-oxide"
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
