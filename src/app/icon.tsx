import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  const sprite = await readFile(join(process.cwd(), 'public/sprites/94.png'));
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
        src={`data:image/png;base64,${sprite.toString('base64')}`}
        width={30}
        height={30}
      />
    </div>,
    { ...size },
  );
}
