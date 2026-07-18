# Portfolio Polish Plan
# Goal: Big Tech SWE Interviews — The site IS the code sample. Polish = competence signal.

---

## ✅ SHIPPED

### Tier 1 — Quick Wins
- [x] **Favicon** — Gengar pixel sprite via `app/icon.tsx` (Next.js ImageResponse)
- [x] **OG image** — 1200×630 pixel art card via `app/opengraph-image.tsx`
- [x] **Color contrast** — `--game-text-light` bumped to #9e9e94 (WCAG AA pass)
- [x] **Type badge shimmer** — CSS `@keyframes badge-shimmer-move` + `.badge-shimmer` class; sweeps on first render across all type badges sitewide
- [x] **Custom Pokeball cursor** — SVG cursor via `cursor: url('/cursor-pokeball.svg')` in body
- [x] **Dialogue speed** — 22ms → 14ms (AboutSection)
- [x] **Animated stat counters** — `useCountUp` hook drives YRS EXP, PROJECTS, COMMITS from 0 on viewport entry
- [x] **Time-based greeting** — "GOOD MORNING/AFTERNOON/EVENING/NIGHT, TRAINER" based on `new Date().getHours()`

### Tier 2 — Signature Features
- [x] **Trainer card 3D tilt + holographic shimmer** — `useMotionValue` + `useSpring` drives `rotateX/Y` on the About trainer card; holographic `color-dodge` gradient overlay shifts with cursor (`--mx`/`--my`)
- [x] **Holographic foil on holo-rare project cards** — Detail panel for `rarity === 'holo-rare'` (Job Match RAG) gets shifting `conic-gradient` foil layer on hover
- [x] **Project full-screen modal** — "DETAILS ►" button expands to `AnimatePresence` modal overlay with full description, screenshot, achievements, complete tech stack
- [x] **Page load stagger** — `.stagger-item` CSS class with `@keyframes stagger-in` on section headers, party lists, and detail panels
- [x] **Skills bar spring overshoot** — Framer Motion `type: 'spring', stiffness: 320, damping: 22` on skill bar entrance; bars slam in from left with spring physics
- [x] **Konami code → "Wild RECRUITER appeared!"** — ↑↑↓↓←→←→BA triggers full GBA battle intro (sliding bands, Gengar sprite, RECRUITER emoji, 4-option action menu)

### Tier 3 — Polish
- [x] **Ambient type glow** — `radial-gradient` in each section background shifts with selected type/badge color
- [x] **Badge 3D press** — `.badge-press:active` CSS depresses experience badges with `translate + scale`
- [x] **Type badge tooltips** — `.type-tooltip-wrapper` + `.type-tooltip` on all type badges (About, Skills, Experience, Projects) explains real-world tech mapping
- [x] **Gengar easter egg** — Click hero Gengar → speech bubble "..." appears for 1.8s
- [x] **Gengar blink** — `.sprite-blink` CSS class combines `sprite-bob` + `gengar-blink` eye-blink keyframe on About trainer card Gengar
- [x] **HPBar spring physics** — Framer Motion `type: 'spring', stiffness: 280, damping: 22` replaces duration-based bar fill

### Tier 4 — Sound (opt-in)
- [x] **SoundProvider context** — Wraps app in `SoundProvider`; `useSound()` hook exposes `musicOn` / `toggleMusic`
- [x] **Background music toggle** — "♪ ON / ♪ OFF" button in HUD; Web Audio API 8-note chiptune melody loop via `scheduleLoop`
- [x] **Sound effects** — `sounds.confirm()`, `sounds.splashUnlock()`, `sounds.badgeSelect()`, `sounds.menuMove()` exported for use anywhere

### Other
- [x] **404 page restyle** — Fully ported to GBA aesthetic: `game-box`, pixel fonts, correct CSS vars, GBA battle scene with Gengar + RECRUITER, 4-option action grid

### Tier 5 — Recruiter-facing fixes
- [x] **Mobile layout** — `max-width:640px` media query frees `.game-screen` from clipped `100vh`/`overflow:hidden` into `min-height:100vh`/`overflow:visible`; two-column layouts (About/Skills/Projects/Education/Contact) stack via `.mobile-stack`/`.mobile-full`; scroll-snap disabled on mobile
- [x] **Navigation HUD on mobile** — Tightened HUD padding/gaps, hid "LV.100" label on small screens; active-section detector now tracks max intersection ratio instead of a fixed 55% threshold (needed since stacked mobile sections can exceed viewport height)
- [x] **Content reveal speed** — About section's bio + contact links no longer gated behind the Prof. Oak typewriter finishing (was ~4s delay hiding the RESUME/GITHUB/LINKEDIN/EMAIL buttons); dialogue speed 14ms → 8ms; stagger-entrance delays trimmed (~0.7s → ~0.5s max)
- [x] **Parallax background layers** — Hero: 3 depth layers (wallpaper, ground gradient, Gengar) shift on `mousemove` via Framer Motion springs, scoped to the `onMouseMove` handler on the section itself (no-op on touch/mobile). Gated behind `prefers-reduced-motion` with live `matchMedia` listener.

---

## REMAINING (lower priority, future session)

- **Mobile swipe gestures** — `touchstart`/`touchend` delta → scroll to next snap section
- **Game box consistency audit** — Some panels use `game-box-sm` inconsistently; quick visual audit
- **Typography scale audit** — Too many `text-px-*` and `text-vt-*` sizes; consolidate
- **Background music rework** — Current 8-note chiptune loop in `SoundManager.tsx` needs a new melody (current one feels repetitive/placeholder)
- **Wire up menu/interaction SFX** — `sounds.confirm()`, `sounds.badgeSelect()`, `sounds.menuMove()` are defined but not actually called from any component yet; hook them into nav clicks, badge selects, and Konami menu navigation
- **Title-screen gate friction** — Hero's "PRESS ANY KEY TO CONTINUE" locks scroll until interaction; recruiters skimming may not realize they need to interact. Flagged but not yet addressed.
- **External sprite dependency** — Favicon, OG image, and several sections fetch Gengar/type sprites live from `raw.githubusercontent.com`; slow/rate-limited responses would hurt first impression (e.g. in link previews)
