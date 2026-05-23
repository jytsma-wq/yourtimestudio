'use client';

import { useTypewriter } from '@/hooks/useTypewriter';

interface TypewriterTextProps {
  words: string[];
  className?: string;
}

export function TypewriterText({ words, className = '' }: TypewriterTextProps) {
  const { displayText } = useTypewriter({ words });

  return (
    <span className={className}>
      {displayText}
      <span className="typewriter-cursor" />
    </span>
  );
}
