'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './OrganicHome.module.css';

type HeroTone = 'hospitality' | 'clinic' | 'beauty';

export interface OrganicHeroSlide {
  src: string;
  label: string;
  tone: HeroTone;
}

interface OrganicHeroMediaProps {
  slides: OrganicHeroSlide[];
}

const toneClass: Record<HeroTone, string> = {
  hospitality: styles.heroHospitality,
  clinic: styles.heroClinic,
  beauty: styles.heroBeauty,
};

export function OrganicHeroMedia({ slides }: OrganicHeroMediaProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reducedMotion.matches || slides.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6200);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <div className={styles.heroMedia} aria-hidden="true">
        {slides.map((slide, index) => (
          <figure
            key={slide.src}
            className={`${styles.heroSlide} ${
              activeIndex === index ? styles.heroSlideActive : ''
            }`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="100vw"
              preload={index === 0}
              loading="eager"
              className={`${styles.heroImage} ${toneClass[slide.tone]}`}
            />
          </figure>
        ))}
        <div className={styles.heroWash} />
      </div>

      <p className={styles.heroStatus} aria-hidden="true">
        {slides[activeIndex]?.label}
      </p>
    </>
  );
}
