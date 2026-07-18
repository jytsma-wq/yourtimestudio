'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter({
  words,
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: UseTypewriterOptions) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
      // Typing
      setDisplayText(currentWord.substring(0, displayText.length + 1));
      if (displayText.length === currentWord.length) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      // Deleting
      setDisplayText(currentWord.substring(0, displayText.length - 1));
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [displayText, isDeleting, currentWordIndex, words, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return { displayText, isDeleting };
}
