import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f0820',
      }}
    >
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
        width={30}
        height={30}
      />
    </div>,
    { ...size },
  );
}
