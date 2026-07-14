import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0820 0%, #1a0f3a 50%, #251840 100%)',
        fontFamily: 'monospace',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Pixel grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(112,88,152,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(112,88,152,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Left: Gengar sprite area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 360,
          flexShrink: 0,
        }}
      >
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
          width={200}
          height={200}
          style={{ imageRendering: 'pixelated' }}
        />
        {/* Type badges */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <div
            style={{
              background: '#705898',
              color: '#fff',
              padding: '4px 12px',
              fontSize: 14,
              letterSpacing: '0.1em',
              border: '2px solid rgba(0,0,0,0.4)',
            }}
          >
            GHOST
          </div>
          <div
            style={{
              background: '#F8D030',
              color: '#000',
              padding: '4px 12px',
              fontSize: 14,
              letterSpacing: '0.1em',
              border: '2px solid rgba(0,0,0,0.4)',
            }}
          >
            ELECTRIC
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: 4,
          height: 400,
          background: 'linear-gradient(180deg, transparent, rgba(112,88,152,0.6), transparent)',
          marginInline: 20,
          flexShrink: 0,
        }}
      />

      {/* Right: Name + role */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          flex: 1,
          paddingRight: 60,
        }}
      >
        {/* Pokedex label */}
        <div style={{ color: 'rgba(200,180,255,0.5)', fontSize: 14, letterSpacing: '0.2em' }}>
          #0001 TRAINER
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: '#F8D030',
            letterSpacing: '0.06em',
            textShadow: '4px 4px 0 #1a0c36, 8px 8px 0 rgba(0,0,0,0.3)',
            lineHeight: 1,
          }}
        >
          ELVIN LY
        </div>

        {/* Role */}
        <div style={{ fontSize: 22, color: '#f0f0f8', letterSpacing: '0.18em' }}>
          SOFTWARE ENGINEER
        </div>

        {/* Separator */}
        <div style={{ width: 120, height: 3, background: '#705898' }} />

        {/* Tags */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['Next.js', 'TypeScript', 'AWS', 'Python', 'React Native'].map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(112,88,152,0.25)',
                border: '2px solid rgba(112,88,152,0.5)',
                color: '#c8b8f0',
                padding: '4px 12px',
                fontSize: 14,
                letterSpacing: '0.08em',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL hint */}
        <div style={{ color: 'rgba(200,180,255,0.4)', fontSize: 14, letterSpacing: '0.1em', marginTop: 8 }}>
          elvinly.dev
        </div>
      </div>
    </div>,
    { ...size },
  );
}
