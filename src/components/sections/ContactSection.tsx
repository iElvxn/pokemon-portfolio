'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { MenuCursor } from '@/components/game/MenuCursor';
import { personal } from '@/data/personal';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACTS = [
  { label: 'GITHUB',   value: '@elvinly',           href: personal.github,             color: '#f0f0ff' },
  { label: 'LINKEDIN', value: 'ELVIN LY',            href: personal.linkedin,           color: '#6890f0' },
  { label: 'EMAIL',    value: personal.email.toUpperCase(), href: `mailto:${personal.email}`, color: '#f85888' },
];

export function ContactSection() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [contactCursor, setContactCursor] = useState(0);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      /* fail silently for portfolio demo */
    } finally {
      setSending(false);
      setSent(true);
      reset();
    }
  };

  const inputBase: React.CSSProperties = {
    display: 'block',
    width: '100%',
    background: 'var(--game-box-2)',
    border: '3px solid var(--game-box-border)',
    color: 'var(--game-text)',
    fontFamily: 'var(--font-vt), monospace',
    fontSize: 20,
    padding: '6px 10px',
    outline: 'none',
    boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.12)',
  };

  return (
    <section
      id="contact"
      className="game-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <SectionEnterTransition />

      {/* Section label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="location-badge">POKÉGEAR</div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col gap-3">

        {/* Header */}
        <div className="game-box px-4 py-2 text-center">
          <div className="relative z-10 font-pixel text-px-16" style={{ color: 'var(--game-text)' }}>
            POKÉGEAR PHONE
          </div>
        </div>

        <div className="flex gap-4 items-start">

          {/* ── Left: Contacts list ───────────────────────── */}
          <div className="game-box w-52 flex-shrink-0">
            <div
              className="relative z-10 px-3 py-2"
              style={{ borderBottom: '3px solid var(--game-box-border)' }}
            >
              <div className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>
                CONTACTS
              </div>
            </div>
            {CONTACTS.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 block"
                style={{
                  borderBottom: i < CONTACTS.length - 1 ? '2px solid var(--game-box-shadow)' : 'none',
                  padding: '8px 10px',
                  background: contactCursor === i ? 'rgba(112,88,152,0.12)' : 'transparent',
                  textDecoration: 'none',
                }}
                onMouseEnter={() => setContactCursor(i)}
                onMouseLeave={() => setContactCursor(-1)}
              >
                <div className="flex items-center gap-2">
                  <MenuCursor active={contactCursor === i} />
                  <div>
                    <div className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>
                      {c.label}
                    </div>
                    <div
                      className="font-pixel text-px-8 mt-0.5 truncate"
                      style={{ color: c.color, maxWidth: 140 }}
                    >
                      {c.value}
                    </div>
                  </div>
                </div>
              </a>
            ))}

            {/* Phone decorative elements */}
            <div
              className="relative z-10 px-3 py-3 flex justify-center gap-2"
              style={{ borderTop: '3px solid var(--game-box-border)', marginTop: 4 }}
            >
              {['📞', '✉', '🌐'].map((icon, i) => (
                <div
                  key={i}
                  className="game-box-sm game-box w-8 h-8 flex items-center justify-center relative z-10 text-sm"
                  style={{ cursor: 'default' }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Message form ───────────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="game-box">
              <div
                className="relative z-10 px-4 py-2"
                style={{ borderBottom: '3px solid var(--game-box-border)' }}
              >
                <div className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>
                  NEW MESSAGE
                </div>
                <div className="font-pixel text-px-6 mt-0.5" style={{ color: 'var(--game-text-light)' }}>
                  OPEN TO ROLES, COLLABS & COOL PROJECTS
                </div>
              </div>

              <div className="relative z-10 px-4 py-3">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-3 py-6 text-center"
                    >
                      <div className="font-pixel text-px-12" style={{ color: 'var(--game-electric)' }}>
                        MESSAGE SENT!
                      </div>
                      <div className="font-vt text-vt-22" style={{ color: 'var(--game-text)' }}>
                        A wild message has been delivered.{'\n'}
                        I&apos;ll get back to you soon!
                      </div>
                      <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
                        alt="Gengar"
                        width={64}
                        height={64}
                        className="sprite-bob"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <button
                        onClick={() => setSent(false)}
                        className="game-box game-box-sm font-pixel text-px-8 px-4 py-2 relative z-10"
                        style={{ color: 'var(--game-text)', cursor: 'pointer' }}
                      >
                        SEND ANOTHER
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-pixel text-px-6 block mb-1" style={{ color: 'var(--game-text-light)' }}>
                            NAME
                          </label>
                          <input
                            {...register('name', { required: true })}
                            placeholder="YOUR NAME"
                            style={inputBase}
                          />
                          {errors.name && (
                            <span className="font-pixel text-px-6" style={{ color: 'var(--game-hp-red)' }}>REQUIRED</span>
                          )}
                        </div>
                        <div>
                          <label className="font-pixel text-px-6 block mb-1" style={{ color: 'var(--game-text-light)' }}>
                            EMAIL
                          </label>
                          <input
                            {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                            placeholder="YOUR EMAIL"
                            type="email"
                            style={inputBase}
                          />
                          {errors.email && (
                            <span className="font-pixel text-px-6" style={{ color: 'var(--game-hp-red)' }}>INVALID</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="font-pixel text-px-6 block mb-1" style={{ color: 'var(--game-text-light)' }}>
                          SUBJECT
                        </label>
                        <input
                          {...register('subject', { required: true })}
                          placeholder="SUBJECT"
                          style={inputBase}
                        />
                      </div>
                      <div>
                        <label className="font-pixel text-px-6 block mb-1" style={{ color: 'var(--game-text-light)' }}>
                          MESSAGE
                        </label>
                        <textarea
                          {...register('message', { required: true })}
                          placeholder="YOUR MESSAGE..."
                          rows={3}
                          style={{ ...inputBase, resize: 'none' }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="game-box font-pixel text-px-8 px-4 py-2 relative z-10 w-full"
                        style={{
                          color: 'var(--game-text)',
                          background: sending ? 'var(--game-box-dark)' : 'var(--game-box)',
                          cursor: sending ? 'not-allowed' : 'pointer',
                          opacity: sending ? 0.7 : 1,
                        }}
                      >
                        {sending ? 'SENDING...' : 'SEND MESSAGE ►'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
