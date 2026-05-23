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
      {/* After image (full, underneath) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        placeholder={afterBlur ? 'blur' : undefined}
        blurDataURL={afterBlur}
      />

      {/* Before image (clipped to show left portion only) */}
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

      {/* Labels */}
      <div className="absolute top-2 left-2 bg-ink/60 text-brand-cream text-xs font-semibold px-2 py-0.5 rounded z-10 pointer-events-none">
        Before
      </div>
      <div className="absolute top-2 right-2 bg-ink/60 text-brand-cream text-xs font-semibold px-2 py-0.5 rounded z-10 pointer-events-none">
        After
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Vertical line */}
        <div className="w-0.5 h-full bg-brand-cream/80 mx-auto" />

        {/* Circular handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-cream shadow-lg flex items-center justify-center pointer-events-auto cursor-col-resize">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L4 10M4 10L6 8M4 10L6 12" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 10L16 10M16 10L14 8M16 10L14 12" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
