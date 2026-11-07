# Housebets — Sportsbook UI (Submission 2)

**Live demo:** https://housebets-sportsbook-v2.vercel.app

A single-page sportsbook interface for Housebets. Built from scratch with no
framework and no build step.

---

## What this is

A working sportsbook front end: browse fixtures, open a match, pick outcomes,
and build a betslip. Odds move in real time and drift direction is shown on
each price. The hero artwork on the home page is generated from the two teams'
own colours.

This is the **second** of three submissions. Compared with the first, the
canvas was repainted near-black, lime was introduced as a surface accent, and
several contrast and truncation defects were fixed. Prices and primary actions
stay cyan, the official Housebets brand colour.

## Palette

| Role | Value |
|---|---|
| Page | `#101010` |
| Top bar | `#161616` |
| Card | `#171717` |
| Card alt | `#131313` |
| Ink | `#F2F2F2` / `#B5B5B5` / `#9A9A9A` / `#8A8A8A` |
| Price (brand cyan) | `#3ED0DA` |
| Surface accent (lime) | `#A8DB2F` |

Lime is decorative only — it tints surfaces, borders and highlights. Every
price and every primary action remains cyan, so the official brand palette is
intact.

## Features

- **Live and upcoming fixtures** — 13 matches, with live minutes, scores and
  a suspended state for halted markets.
- **Match page** — market tabs (Popular, Goals, Halves, Handicaps,
  Goalscorers, Corners & cards) with 48 markets and 117 outcomes.
- **Betslip** — singles only, with odds drift derived from the live price feed.
- **Hero artwork** — crests, glow, VS mark and a sheen sweep rendered from
  each team's colours, in pure CSS. Fully disabled under
  `prefers-reduced-motion`.
- **Responsive** — verified from 320 px to 1440 px.
- **Performance** — 60 fps on mobile with 4x CPU throttling and software
  rendering; 0 frames over 50 ms.

## Running it locally

No install, no build. Any static server works:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000

## Structure

```
index.html
assets/
  app.css      styles
  app.js       rendering, state, routing
  data.js      fixtures, teams, markets
  brand/       official lockup and icons
  crests/      16 team crests
  icons/       sport icons
  posters/     hero posters
```

## Tech

Vanilla HTML, CSS and JavaScript. No framework, no bundler, no dependencies.
Deployed on Vercel.
