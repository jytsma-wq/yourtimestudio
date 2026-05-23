'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface SectionInfo {
  id: string;
  label: string;
}

/**
 * SectionNav — fixed column of dots on the right edge of the viewport.
 * Each dot highlights teal as its section enters view. Tooltip on hover
 * shows the section name. Hidden on mobile (< 1024px).
 */
export function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const sectionElementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      const sectionEls = Array.from(
        document.querySelectorAll<HTMLElement>('[data-section-name]')
      );
      sectionElementsRef.current = sectionEls;
      const found = sectionEls.flatMap((el) => {
        const id = el.id;
        const label = el.getAttribute('data-section-name') || id;
        return id ? [{ id, label }] : [];
      });
      setSections(found);
    });
  }, []);

  const handleScroll = useCallback(() => {
    let currentId = '';
    sectionElementsRef.current.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 3 && rect.bottom > 0) {
        currentId = el.id;
      }
    });
    if (currentId) setActiveSection(currentId);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    queueMicrotask(handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (sections.length === 0) return null;

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3 items-center"
      aria-label="Section navigation"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => {
            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
          onMouseEnter={() => setHoveredDot(section.id)}
          onMouseLeave={() => setHoveredDot(null)}
          className="relative group"
          aria-label={`Navigate to ${section.label}`}
        >
          <span
            className={`section-nav-dot block ${
              activeSection === section.id ? 'active' : ''
            }`}
          />
          {/* Tooltip */}
          <span
            className={`absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground text-background text-xs font-medium px-2.5 py-1 shadow-lg transition-all duration-200 pointer-events-none ${
              hoveredDot === section.id
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-2'
            }`}
          >
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
