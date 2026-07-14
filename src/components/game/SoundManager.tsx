'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

/* ── Web Audio chiptune helpers ─────────────────────────────── */

let _ctx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!_ctx) _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

function beep(
  freq: number,
  duration: number,
  type: OscillatorType = 'square',
  vol = 0.06,
  delay = 0,
) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.01);
}

function chord(freqs: number[], duration: number, vol = 0.04) {
  freqs.forEach((f, i) => beep(f, duration, 'square', vol, i * 0.02));
}

/* ── Individual sound effects ───────────────────────────────── */

export const sounds = {
  confirm: () => {
    beep(523, 0.08, 'square', 0.07);
    beep(659, 0.12, 'square', 0.07, 0.09);
  },
  splashUnlock: () => {
    chord([261, 329, 392], 0.2, 0.05);
    setTimeout(() => chord([392, 523, 659], 0.3, 0.07), 220);
  },
  badgeSelect: () => {
    beep(880, 0.06, 'square', 0.07);
    beep(1108, 0.1, 'square', 0.05, 0.06);
  },
  menuMove: () => {
    beep(392, 0.04, 'square', 0.04);
  },
};

/* ── Background music: simple 8-note loop ───────────────────── */

const MELODY: [number, number][] = [
  [659, 0.18], [587, 0.12], [523, 0.18], [440, 0.12],
  [493, 0.18], [523, 0.12], [587, 0.36], [0, 0.24],
  [659, 0.18], [587, 0.12], [659, 0.18], [698, 0.12],
  [784, 0.36], [0, 0.36],
];

function startMusic(stopRef: React.MutableRefObject<boolean>) {
  const ctx = getCtx();
  if (!ctx) return;
  const audioCtx = ctx;
  let time = audioCtx.currentTime + 0.05;
  stopRef.current = false;

  function scheduleLoop() {
    if (stopRef.current) return;
    MELODY.forEach(([freq, dur]) => {
      if (freq > 0) {
        const osc  = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.03, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.9);
        osc.start(time);
        osc.stop(time + dur + 0.01);
      }
      time += dur;
    });
    const loopDuration = MELODY.reduce((s, [, d]) => s + d, 0);
    setTimeout(() => { if (!stopRef.current) scheduleLoop(); }, (loopDuration - 0.5) * 1000);
  }
  scheduleLoop();
}

/* ── Context ────────────────────────────────────────────────── */

interface SoundCtx { musicOn: boolean; toggleMusic: () => void; }
const SoundContext = createContext<SoundCtx>({ musicOn: false, toggleMusic: () => {} });
export const useSound = () => useContext(SoundContext);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [musicOn,  setMusicOn]  = useState(false);
  const stopRef = useRef(true);

  const toggleMusic = useCallback(() => {
    setMusicOn(on => {
      if (!on) {
        stopRef.current = false;
        startMusic(stopRef);
      } else {
        stopRef.current = true;
      }
      return !on;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ musicOn, toggleMusic }}>
      {children}
    </SoundContext.Provider>
  );
}

/* ── HUD music toggle button ────────────────────────────────── */
export function MusicToggle() {
  const { musicOn, toggleMusic } = useSound();
  return (
    <button
      onClick={toggleMusic}
      className="game-box game-box-sm font-pixel text-px-8 px-2 py-1 relative z-10"
      style={{ color: musicOn ? 'var(--game-electric)' : 'var(--game-text-light)' }}
      title={musicOn ? 'Mute music' : 'Play music'}
    >
      {musicOn ? '♪ ON' : '♪ OFF'}
    </button>
  );
}
