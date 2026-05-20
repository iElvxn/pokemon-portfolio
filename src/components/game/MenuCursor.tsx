interface MenuCursorProps {
  active?: boolean;
}

export function MenuCursor({ active = true }: MenuCursorProps) {
  return (
    <span
      className={`font-pixel text-px-10 inline-block w-4 shrink-0 ${active ? 'cursor-blink' : 'opacity-0'}`}
      style={{ color: 'var(--game-text)' }}
      aria-hidden="true"
    >
      ►
    </span>
  );
}
