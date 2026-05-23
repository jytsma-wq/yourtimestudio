'use client';

import { motion } from 'framer-motion';

interface HeroWordRevealProps {
  text: string;
  className?: string;
  staggerMs?: number;
}

/**
 * HeroWordReveal — splits the hero headline into individual words
 * and animates each one up with a stagger. The headline "builds itself"
 * in the first second of page load.
 */
export function HeroWordReveal({ text, className = '', staggerMs = 50 }: HeroWordRevealProps) {
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerMs / 1000,
        delayChildren: 0.2,
      },
    },
  };

  const word = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className="inline-block mr-[0.3em]"
          style={{ willChange: 'transform, opacity' }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}
