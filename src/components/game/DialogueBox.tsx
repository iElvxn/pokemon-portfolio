'use client';

import { useState, useEffect, useRef } from 'react';

interface DialogueBoxProps {
  text: string;
  speaker?: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export function DialogueBox({
  text,
  speaker,
  speed = 28,
  onComplete,
  className,
}: DialogueBoxProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    idxRef.current = 0;

    timerRef.current = setInterval(() => {
      if (idxRef.current < text.length) {
        setDisplayed(text.slice(0, idxRef.current + 1));
        idxRef.current++;
      } else {
        setDone(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, speed);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [text, speed]);

  const handleClick = () => {
    if (!done) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayed(text);
      setDone(true);
    } else {
      onComplete?.();
    }
  };

  return (
    <div
      className={`dialogue-box ${className ?? ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
    >
      {speaker && (
        <div className="font-pixel text-px-8 mb-1" style={{ color: 'var(--game-accent)' }}>
          {speaker}:
        </div>
      )}
      <div className="font-vt text-vt-22 leading-relaxed min-h-[44px]" style={{ color: 'var(--game-text)' }}>
        {displayed}
        {done && (
          <span className="cursor-blink inline-block ml-1 font-pixel text-px-8" style={{ color: 'var(--game-text-mid)' }}>
            ▼
          </span>
        )}
      </div>
    </div>
  );
}
