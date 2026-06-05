'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeBlur?: string;
  afterBlur?: string;
  className?: string;
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeBlur,
  afterBlur,
  className = '',
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setPosition(Math.min(95, Math.max(5, pct)));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => setIsDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none touch-none overflow-hidden ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ cursor: isDragging ? 'grabbing' : 'col-resize' }}
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        placeholder={afterBlur ? 'blur' : undefined}
        blurDataURL={afterBlur}
      />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          placeholder={beforeBlur ? 'blur' : undefined}
          blurDataURL={beforeBlur}
        />
      </div>

      <div className="pointer-events-none absolute left-2 top-2 z-10 rounded-md border border-hairline bg-surface/90 px-2 py-0.5 text-xs font-semibold text-ink">
        Before
      </div>
      <div className="pointer-events-none absolute right-2 top-2 z-10 rounded-md border border-hairline bg-surface/90 px-2 py-0.5 text-xs font-semibold text-ink">
        After
      </div>

      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-0.5 h-full bg-ink/80 mx-auto" />

        <div className="pointer-events-auto absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-md border border-hairline bg-paper text-ink-dark">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L4 10M4 10L6 8M4 10L6 12" stroke="var(--primitive-ink-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 10L16 10M16 10L14 8M16 10L14 12" stroke="var(--primitive-ink-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
