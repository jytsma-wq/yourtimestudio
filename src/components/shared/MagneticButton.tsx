'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * MagneticButton — the button subtly shifts toward the cursor on hover
 * (max offset controlled by `strength`, default 6px). On mouse leave it
 * springs back to centre. Wrap any CTA button for that "alive" feel.
 */
export function MagneticButton({ children, className = '', strength = 6 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const offsetX = (x / rect.width) * strength;
    const offsetY = (y / rect.height) * strength;
    ref.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  }

  return (
    <div
      ref={ref}
      className={`magnetic-btn inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
