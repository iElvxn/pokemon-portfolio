# Portfolio Improvement Plan — New Grad SWE Recruiting

Working checklist from the portfolio review (2026-07-25). Ordered by impact.
Check items off as we complete them.

---

## P0 — Broken things (fix first) ✅ DONE 2026-07-25

- [x] **Add resume.pdf** — copied latest resume into `public/resume.pdf`.
- [x] **Fix GitHub handle mismatch** — Contact section now shows `@iElvxn`.
- [x] **Study Kitty link mislabeled** — App Store link moved to `liveUrl` with a new
  `liveLabel: 'APP STORE'` field; GITHUB button now only renders when `githubUrl` exists
  (Study Kitty has no public repo — only support/privacy pages).
- [x] **Copyright year** — now `new Date().getFullYear()`.
- [x] **Capital One entry** — synced description + all 4 bullets + tech labels from the
  latest resume (recertification platform, EventBridge pipeline, ServiceNow CMDB sync,
  PostgreSQL LATERAL JOIN optimization). Old Snowflake bullets removed.

## P1 — Highest-impact content changes

- [ ] **Remove numeric skill bars** — "PostgreSQL 51/100", "Java 64/100" (`src/data/skills.ts`)
  read as self-assessed weaknesses; there's no upside to fake-precise percentages.
  Keep the Pokémon type-category grouping, but show skills as badges/held items,
  or bucket as "Ability" vs. "Learning".
- [ ] **Soften the splash gate** — scroll is locked until click/keypress
  (`src/components/sections/HeroSection.tsx:96`). Mobile/skimming recruiters may bounce.
  → Auto-advance to menu after ~5s, and let plain scroll/swipe dismiss it too.
- [ ] **Feature "1000+ users · Live on the App Store" loudly on Study Kitty** —
  real users is the rarest thing in a new-grad portfolio.
- [ ] **Plain-English first line per project bullet** — current `achievements` are dense
  resume bullets verbatim. Lead with the human version ("Cut repeat-search time from
  30s to under 1s"), then the technical detail.
- [ ] **Job Match RAG live demo** — host it if feasible; "paste your resume, get matched
  jobs with cited evidence" is memorable in a way BERTScore numbers aren't.
- [ ] **Screenshot/GIF for Driver Drowsiness Detection** — `imageUrl` is undefined
  (`src/data/projects.ts:71`). A vision project should be visual.

## P2 — The repo is part of the portfolio

- [ ] **Rewrite README.md** — currently the untouched create-next-app template.
  Add: hero screenshot, live URL, feature list (parallax, Konami code, sound,
  battle transitions), how to run.
- [ ] **Pin repos on GitHub** — this portfolio, Job Match RAG, Study Kitty, each with a
  solid README. Architecture diagram for the RAG project pays off in interviews.

## P3 — Polish / technical

- [ ] **SEO title** — "ELVIN LY — POKEMON PORTFOLIO" (`src/app/layout.tsx:21`).
  Recruiters Google you by name → "Elvin Ly — Software Engineer" (keep Pokémon flavor
  in the description).
- [ ] **Add `metadataBase`** with the deployed URL so the OG image resolves when shared
  on LinkedIn/Slack.
- [ ] **Compress studykitty.webp** — 2.4 MB (and a 3.3 MB PNG duplicate next to it).
  Re-encode at display resolution (<200 KB), delete the PNG.
- [ ] **Delete `wallpaperflare.com_wallpaper.jpg`** from repo root (stray file).
- [ ] **Self-host Pokémon sprites** — currently hot-linked from raw.githubusercontent.com
  (`src/data/projects.ts:25`, `HeroSection.tsx:206`). Not a CDN; can be slow/rate-limited.
- [ ] **Add Vercel Analytics** — know whether recruiters visit and what they click.
- [ ] **Add `sitemap.ts` + `robots.ts`**.
- [ ] **Custom domain** — e.g. `elvinly.dev`.

---

## Deliberately NOT changing

The Pokémon theme stays. A generic Tailwind portfolio is forgettable; this gets
mentioned in debriefs. The goal is making the recruiter path
(resume → experience → live projects → contact) work flawlessly *through* the theme.
