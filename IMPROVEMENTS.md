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

- [x] **Remove numeric skill bars** — replaced HP bars with Pokémon move-slot chips.
  Skills now carry a `core` flag (★ battle-tested = used in an internship or shipped
  project) instead of self-scored percentages. Dropped Springboot (not on resume).
- [x] **Soften the splash gate** — auto-advances to menu after 5s; mouse wheel or
  upward swipe unlocks scrolling immediately. Hint now says "PRESS ANY KEY OR SCROLL".
  Also added "INCOMING GRAD RESEARCHER @ SBU" to the hero facts.
- [x] **Feature "1,000+ users · Live on the App Store" on Study Kitty** — now the
  card subtitle and the lead sentence of the description.
- [x] **Plain-English descriptions** — all three project cards now lead with what the
  thing does in human terms; technical detail follows. Resume-verbatim bullets stay
  in the modal `achievements`.
- [ ] **Job Match RAG live demo** — NEEDS ELVIN: host it if feasible; "paste your
  resume, get matched jobs with cited evidence" is memorable in a way BERTScore isn't.
- [ ] **Screenshot/GIF for Driver Drowsiness Detection** — NEEDS ELVIN: record a short
  clip/screenshot of the detection running (`imageUrl` is currently undefined).

## P2 — The repo is part of the portfolio

- [ ] **Rewrite README.md** — currently the untouched create-next-app template.
  Add: hero screenshot, live URL, feature list (parallax, Konami code, sound,
  battle transitions), how to run.
- [ ] **Pin repos on GitHub** — this portfolio, Job Match RAG, Study Kitty, each with a
  solid README. Architecture diagram for the RAG project pays off in interviews.

## P3 — Polish / technical

- [x] **SEO title** — now "Elvin Ly — Software Engineer" with a recruiter-facing
  description (Capital One, Stony Brook, full-stack/cloud/AI + the Pokémon hook).
- [x] **Add `metadataBase`** — `https://elvinly.dev` via a single `siteUrl` constant
  in `src/data/personal.ts`; also canonical + OG url/siteName.
- [x] **Compress studykitty.webp** — done in P0 (2.4 MB → 78 KB, PNG deleted).
- [x] **Delete `wallpaperflare.com_wallpaper.jpg`** — removed from repo root.
- [x] **Self-host Pokémon sprites** — all 11 sprites now in `public/sprites/` (~9 KB
  total); icon.tsx and opengraph-image.tsx read the file from disk as a data URI
  instead of fetching GitHub at render time.
- [x] **Add Vercel Analytics** — `@vercel/analytics` installed, `<Analytics />` in the
  root layout. Data appears in the Vercel dashboard once deployed there.
- [x] **Add `sitemap.ts` + `robots.ts`** — both generated, verified in build output.
- [ ] **Deploy + custom domain** — NEEDS ELVIN: deploy to Vercel and attach
  `elvinly.dev` (everything above assumes that domain; change `siteUrl` in
  `src/data/personal.ts` if you pick a different one).

---

## Deliberately NOT changing

The Pokémon theme stays. A generic Tailwind portfolio is forgettable; this gets
mentioned in debriefs. The goal is making the recruiter path
(resume → experience → live projects → contact) work flawlessly *through* the theme.
