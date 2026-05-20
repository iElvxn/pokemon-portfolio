interface SpriteDisplayProps {
  src: string;
  alt?: string;
  size?: number;
  glow?: boolean;
  glowColor?: string;
  animate?: 'float' | 'bob' | 'none';
  className?: string;
}

export function SpriteDisplay({
  src,
  alt = '',
  size = 96,
  glow = false,
  glowColor = '#705898',
  animate = 'float',
  className,
}: SpriteDisplayProps) {
  const animClass = animate === 'float' ? 'sprite-float' : animate === 'bob' ? 'sprite-bob' : '';
  const filter = glow
    ? `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 20px ${glowColor}66)`
    : 'none';

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`${animClass} ${className ?? ''}`}
      style={{ imageRendering: 'pixelated', filter, width: size, height: size }}
      loading="lazy"
    />
  );
}
