# Portfolio Polish Plan

## 1. Sound Effects
- **Menu cursor move** — soft blip when hovering over menu items (StartMenu + hero nav)
- **Menu confirm** — classic GBA "select" ding when clicking a nav item
- **Section transition** — whoosh/flash sound tied to the white battle-flash animation
- **Splash screen unlock** — short opening chime plays when pressing any key to open the menu
- **Dialogue tick** — faint typewriter click for each character in the About section DialogueBox
- **HP bar fill** — subtle ascending tone when stat bars animate in (Skills + About)
- **Badge select** — satisfying "ping" when clicking an experience badge
- **Button hover** — very faint tick on any game-box button hover
- **Background music toggle** — optional Route 1 / Pokemon Center chiptune, muted by default, with a mute/unmute button in the nav HUD

## 2. Interactive UI
- **Gengar clickable easter egg** — clicking the hero Gengar plays a cry + shows a speech bubble ("...")
- **Konami code** (↑↑↓↓←→←→BA) — triggers a full wild encounter battle screen with a funny "Wild RECRUITER appeared!"
- **Skills section** — clicking a skill bar shows a small popup with a one-liner ("Super effective against production bugs")
- **Project cards** — hover lifts the card with a deeper shadow; clicking expands to a full-screen modal with more detail (screenshots, longer description, all tech stack)
- **Experience badges** — hover sparkles/glow pulse on each badge before selection
- **Type badges** — tooltip on hover explaining what real tech the type maps to (e.g., GHOST = "Core CS / Systems")
- **About sprite** — Gengar in the trainer card blinks occasionally and has a subtle idle animation beyond the float

## 3. Small Details
- **Custom cursor** — replace default OS cursor with a pixel-art Pokeball cursor (CSS `cursor: url(...)`)
- **Favicon** — Gengar pixel sprite as the browser tab icon
- **Scroll indicator** — small bouncing Pokeball at the bottom of non-hero sections hinting to scroll down; disappears on last section
- **Animated stat counters** — the "2+ YRS EXP / 5+ PROJECTS" numbers in About count up from 0 on first view
- **Section enter sound** — very soft "entering area" tone when each SectionEnterTransition plays
- **404 page** — "Wild RECRUITER appeared!" battle screen with four options: [VIEW RESUME] [CONTACT] [GO BACK] [RUN]
- **Footer refinement** — add social icons, "© 2025 ELVIN LY", and a "BACK TO TOP" game-box button
- **Pokeball section dividers** — thin horizontal rule with a centered Pokeball SVG between major sections (visible in the scroll-snap gap)
- **Time-based hero greeting** — dynamically change "HI, MY NAME IS" to "GOOD MORNING, TRAINER" / "GOOD EVENING" based on visitor's local time
- **Mobile swipe** — swipe up/down gesture navigates sections on touch devices

## 4. Text & Styling Refinements
- **Hero spacing** — gap between "HI, MY NAME IS" / name / role subtitle feels uneven; tighten the rhythm
- **Hero menu** — menu items need more breathing room; currently feels dense for 6 items
- **About bio text** — the three bio lines are wordy; trim to punchy 1-line statements
- **Dialogue box speed** — character typing speed could be slightly faster (currently 22ms, try 14ms)
- **Skills left panel** — type label chips are hard to read at small size; increase to text-px-8
- **Experience detail panel** — "BATTLE LOG" bullet text (VT323) is too small at vt-20; bump to vt-22 and increase line spacing
- **Navigation HUD** — the trainer badge (top right) and location badge (top left) overlap content on small screens; add backdrop blur
- **Game box consistency** — some boxes use `game-box-sm` inner bevel inconsistently; audit all sections
- **Color contrast** — `--game-text-light` (#888) fails WCAG AA on dark backgrounds; bump to #aaa minimum
- **Mobile layout** — all sections need a single-column fallback below 640px (currently some panels overflow)
- **Typography scale** — audit all `text-px-*` and `text-vt-*` usages for visual hierarchy consistency; there are too many sizes in use
- **Section transitions** — SectionEnterTransition (black wipe) runs on every section including ones re-entered by scrolling back up; consider only running once per section (`once: true` on the animation)
