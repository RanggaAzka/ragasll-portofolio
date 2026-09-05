# Rangga Azka — Portfolio

A premium, editorial, dark-first developer portfolio built with Next.js, TypeScript, Tailwind CSS, and GSAP — modeled closely on a reference design (stacked project gallery, giant outline hero typography, floating trait cards, circular theme-toggle reveal, alternating training rows, and a huge closing "LET'S WORK TOGETHER" section).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **GSAP** + **ScrollTrigger** + **@gsap/react** for scroll-linked animation
- **Lenis** for smooth scrolling
- **next-themes** for dark/light mode (persisted, respects system preference on first visit)
- **lucide-react** for icons
- **@fontsource/inter** — self-hosted font (no Google Fonts network dependency)

## Project structure

```
app/
  layout.tsx          Root layout: theme + smooth-scroll providers, cursor, loader, back-to-top
  page.tsx             Homepage — assembles all sections
  work/page.tsx        "View More Projects" archive page
  globals.css          Design tokens (light/dark), shared utility classes

components/
  Navbar.tsx, MobileMenu.tsx, ThemeToggle.tsx, CustomCursor.tsx,
  BackToTop.tsx, PageLoader.tsx, Footer.tsx, SmartImage.tsx, BackgroundLines.tsx
  sections/            Hero, Work, Capabilities, About, Achievements, Trainings, Contact
  providers/           ThemeProvider, SmoothScrollProvider

data/                  ALL editable content lives here (see below)
lib/                   Small hooks + gsap setup + utils
```

## Editing your content

You should never need to touch a component to update your info — everything lives in `data/`:

| File | What it controls |
|---|---|
| `data/site.ts` | Name, role, location, bio, hero marquee text, stats, "currently" list, traits, nav links, resume path |
| `data/socials.ts` | Email / GitHub / LinkedIn — **currently placeholders, replace with your real links** |
| `data/projects.ts` | The 4 Work Gallery projects — title, description, tech, image path, live/GitHub URLs |
| `data/capabilities.ts` | Technology chips + the 4 "What I Can Do" cards |
| `data/achievements.ts` | Awards & Achievements list — **placeholder issuer/date, fill in real details** |
| `data/trainings.ts` | Trainings & Hackathons entries — **example content, replace with your real trainings** |

## Images you need to add

Drop files at these exact paths and they'll appear automatically (no code changes needed). Until then, a clean placeholder renders in their place:

- `public/images/profile.jpg` — your portrait (used in Hero + About)
- `public/images/projects/perfu-me.jpg`, `laundry-pos.jpg`, `only-cars.jpg`, `management-olahraga.jpg` — project screenshots
- `public/images/training-1.jpg`, `training-2.jpg`, `training-3.jpg` — training/hackathon photos
- `public/Rangga-Azka-Resume.pdf` — your resume (linked from About + Contact)

## Links to update

`data/socials.ts` and the `liveUrl`/`githubUrl`/`certificateHref`/`href` fields in `data/projects.ts`, `data/achievements.ts`, and `data/trainings.ts` currently contain placeholder values (`#`, `yourusername`, `youremail@example.com`). Replace these with your real links.

## Notes on design decisions

- **Theme-invariant "ink" tokens** (`--ink-bg` / `--ink-fg` in `globals.css`): the brand mark and primary "Hire Me"/"Download Resume" buttons intentionally stay a fixed dark color in both themes, matching the reference video's behavior — a small deliberate signature that doesn't invert with the rest of the UI.
- **Technology chips are text, not logos**: `lucide-react` no longer ships brand/logo icons (GitHub, LinkedIn, etc. were removed upstream), so social links use generic icons and technologies render as clean text chips rather than colored logos — arguably more in keeping with the reference's typography-first aesthetic anyway.
- **Reduced motion**: every animation (marquee, parallax, reveals, floating trait cards) checks `prefers-reduced-motion` and either simplifies or skips accordingly.
- **Custom cursor** only mounts on fine-pointer (mouse) devices — touch devices keep native tap behavior untouched.
