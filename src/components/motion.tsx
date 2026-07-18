'use client';

import { motion, type Variants } from 'framer-motion';

/* ─── Reusable animation variants ─── */

export const createFadeInUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 0, 0.2, 1], delay } },
});

export const fadeInUp: Variants = createFadeInUp();

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: [0.25, 0, 0.2, 1] } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: 0 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.25, 0, 0.2, 1] } },
};

export const createSlideInLeft = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: 0 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.25, 0, 0.2, 1], delay } },
});

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 0 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.25, 0, 0.2, 1] } },
};

export const createSlideInRight = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: 0 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.25, 0, 0.2, 1], delay } },
});

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.25, 0, 0.2, 1] } },
};

/* ─── Wrapper components ─── */

export function FadeInUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={createFadeInUp(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInLeft({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={createSlideInLeft(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInRight({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={createSlideInRight(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
