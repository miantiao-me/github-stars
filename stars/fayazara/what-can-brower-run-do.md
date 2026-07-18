---
project: what-can-brower-run-do
stars: 50
description: |-
    A little site to showchase different Cloudlfare Browser Run use cases
url: https://github.com/fayazara/what-can-brower-run-do
---

# What can Browser Run do?

A playful tour of [Cloudflare Browser Run](https://developers.cloudflare.com/browser-rendering/) — a real headless browser, one function call away. Paste a URL and watch Cloudflare's network render it for you, live.

**Live demo →** https://what-can-browser-run-do.examples.workers.dev/

```ts
await env.BROWSER.quickAction("screenshot", { url: "https://cloudflare.com" })
```

No API tokens to juggle, no browser to install. The `BROWSER` binding talks to a real Chromium running on Cloudflare's edge.

## What it does

Each trick is a live, interactive demo backed by its own API route:

- **Screenshot any page** — paste a URL, get a pixel-perfect PNG of the fully-rendered page.
- **Generate PDFs** — hand it HTML, get a crisp, printable PDF (invoices, receipts, tickets).
- **Scrape elements** — pull matching elements off a page with a CSS selector.
- **Extract structured data** — describe what you want in plain English, get clean JSON back via AI.
- **Turn a page into Markdown** — strip the ads and chrome, keep the readable content.
- **Get every link** — internal, external, or just the visible ones.
- **Snapshot a page** — rendered HTML + a screenshot in one call.
- **Extract a brand kit** — the headline feature ⤵

### Brand extractor & shareable design systems

Give it a domain and it drives a real browser to read the **actual computed styles** — no AI guesswork, so no hallucinated hex codes or font names. You get:

- The **logo** (inline-SVG logos are captured as data URIs; falls back to JSON-LD, apple-touch-icon, etc.)
- **Colors** with full Tailwind-style **50–950 tonal scales** generated from each brand color
- Semantic **surface tokens** (background / foreground / border / muted) and light/dark scheme
- **Type scale**, font families & weights, **radius** and **shadow** scales, and the primary **button**'s tokens

Every extraction becomes a **shareable permalink** at `/brand/<domain>` (e.g. [`/brand/cloudflare.com`](https://what-can-browser-run-do.examples.workers.dev/brand/cloudflare.com)) with:

- An agent-ready **`DESIGN.md`** ([Google's format](https://github.com/google-labs-code/design.md)) — YAML design tokens + prose a coding agent can read to rebuild a matching UI.
- A **sitemap** rendered as a Flow diagram (parsed from `robots.txt` / `sitemap.xml`, no browser needed).

Results are cached in Workers KV, and each generated page is indexed in D1 to power a "recently generated" directory.

## Stack

- **[TanStack Start](https://tanstack.com/start)** — full-stack React on Vite, file-based routing
- **Cloudflare Workers** runtime + **[Browser Run](https://developers.cloudflare.com/browser-rendering/)** (Puppeteer)
- **Cloudflare D1** (SQLite) via **Drizzle ORM**, **KV** for caching, **R2** for object storage
- **[Kumo](https://kumo-ui.com)** (`@cloudflare/kumo`) + **Tailwind v4** for UI
- **Zod** for validation

## Local development

You'll need a Cloudflare account with Browser Rendering enabled.

```bash
# 1. Install
npm install

# 2. Create the bindings (paste the printed IDs into wrangler.jsonc)
npx wrangler d1 create what-can-browser-run-do-db
npx wrangler kv namespace create CACHE
npx wrangler r2 bucket create what-can-browser-run-do-storage

# 3. Refresh binding types
npm run cf-typegen

# 4. Run it (predev applies D1 migrations to local automatically)
npm run dev          # http://localhost:3000
```

`npm run dev` runs the full Worker runtime via `@cloudflare/vite-plugin`, so all bindings work exactly as they will in production.

### Database

The schema lives in `src/db/schema.ts`. To change it:

```bash
npm run db:generate      # write SQL migration to ./drizzle
npm run db:migrate       # apply to LOCAL D1
npm run db:migrate:prod  # apply to REMOTE D1
```

### Deploy

```bash
npm run deploy           # build + wrangler deploy
```

## Project structure

```
src/
├── routes/
│   ├── index.tsx            # home / use-case grid
│   ├── $slug.tsx            # interactive demo per use case
│   ├── brand.$domain.tsx    # shareable brand page (Overview + DESIGN.md + sitemap)
│   └── api/                 # HTTP endpoints (screenshot, pdf, brand, scrape, …)
├── components/              # demos + shared UI (brand card, sitemap flow)
├── lib/                     # brand extraction, DESIGN.md, color scales, sitemap, url guard
├── server/                  # server functions (typed RPCs)
└── db/                      # Drizzle schema + client
```

## Credits

Built on [Cloudflare Browser Run](https://developers.cloudflare.com/browser-rendering/), [TanStack Start](https://tanstack.com/start), and [Kumo](https://kumo-ui.com). The `DESIGN.md` output follows [google-labs-code/design.md](https://github.com/google-labs-code/design.md).

## License

MIT

