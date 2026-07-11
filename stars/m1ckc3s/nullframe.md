---
project: nullframe
stars: 212
description: |-
    PROJECT NULLFRAME — a live telemetry dashboard in the Nothing design language
url: https://github.com/m1ckc3s/nullframe
---

# PROJECT NULLFRAME

**A live telemetry dashboard in the Nothing design language.** Dot-matrix
numerals, a glyph-grid icon reel, and ten bento widgets that read *real*
signals from your browser — frame rate, JS heap, battery, network, input —
rendered like the industrial instrument panel of a design engineer's
workstation in New York.

<img width="800" height="564" alt="ezgif-6ebe98534d0a1056" src="https://github.com/user-attachments/assets/62151183-b537-4123-bc68-d6e250d1078f" />

## What's actually live

Every card is tagged honestly:

| Widget | Source | Tag |
|---|---|---|
| Clock | Your live local time zone, auto-detected from the browser | — |
| Render | Your actual frame rate + frame time, measured off the rAF loop | `LIVE` |
| Memory | JS heap via `performance.memory` (Chromium) | `LIVE` / `SIM` |
| Battery | Battery Status API (Chromium) | `LIVE` / `SIM` |
| Network | Downlink + RTT via Network Information API (Chromium) | `LIVE` / `SIM` |
| Input seismograph | Your cursor velocity and input rate, drawn live | `LIVE` |
| Glyph G1 | Canvas icon reel — disc, ring, brackets, pause, dither | — |
| Contributions / Streak / Activity | Seeded fakes for `m1ckc3s` | `SIM` |

Where a browser doesn't expose an API (Safari, Firefox, iOS), the card falls
back to seeded simulated data and says so — `SIM`, not a lie.

## The interesting part

One `requestAnimationFrame` loop drives the entire page. It measures fps,
smooths pointer velocity, runs every canvas's draw callback, and publishes an
immutable snapshot to React at 2 Hz via `useSyncExternalStore`. There are no
per-widget timers competing with each other, everything pauses completely when
the tab is hidden, canvases cap their device-pixel-ratio at 2 and redraw at
≤30 fps, and offscreen canvases skip work entirely. It runs cool on a phone.

Press **⌘K** for the command palette: focus mode, clock reroll, motion toggle.
Hover any card for a soft tone — a tiny zero-dependency Web Audio synth, no
samples — and switch it off with the dot-matrix toggle in the clock card.

## Stack

React 19 · Vite · TypeScript · [Motion](https://motion.dev) · hand-written CSS
(no UI library — the craft is the point).

```
npm install
npm run dev      # local
npm run build    # typecheck + production build
```

Deploys to Vercel as a static Vite site — set the project root to this folder.

## Design DNA

Built on Nothing's visual language: dot-matrix as structure (Doto), Space Mono
for machine text, Space Grotesk for human text, sharp segments inside 16px
cards, motion that slams and settles instead of floating, and brand red
exactly once. Not affiliated with Nothing Technology — just an admirer.

Original idea inspired by one long prompt from
[@dominikmartn](https://x.com/dominikmartn).

