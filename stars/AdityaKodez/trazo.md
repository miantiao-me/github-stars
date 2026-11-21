---
project: trazo
stars: 53
description: |-
    Hand-drawn crayon sticker SVGs for React and the web.
url: https://github.com/AdityaKodez/trazo
---

# Trazo

Hand-drawn crayon stickers for the web. 83 wax-textured SVG stickers (sea creatures, cats, school accessories, hearts, arrows, stars, clouds, emphasis marks) baked into clean vector paths. Recolor them live, copy the SVG, or install them from npm.

**Site:** [trazo.akoder.xyz](https://trazo.akoder.xyz) · **npm:** [`trazo-stickers`](https://www.npmjs.com/package/trazo-stickers)

## Install

```bash
npm i trazo-stickers
```

```tsx
import { Dolphin, HeartCat } from "trazo-stickers";

<Dolphin size={64} />
<HeartCat size={56} color="#ef4444" rotate={-8} />
```

Use `trazo-stickers/vue` for native Vue 3 and Nuxt components, or `trazo-stickers/svg` for plain SVG strings. Full props and examples are in [`packages/trazo/README.md`](packages/trazo/README.md).

## What's in this repo

| Path | What it is |
| --- | --- |
| `app/`, `components/`, `config/`, `lib/` | The Trazo site: a Next.js app with a pannable sticker canvas and a library with a detail dialog for each sticker |
| `packages/trazo/` | The `trazo-stickers` npm package: sticker catalog, React and Vue components, SVG helpers, build script |

## Run the site locally

Requires Node.js 20.9 or newer and npm.

```bash
git clone https://github.com/AdityaKodez/trazo.git
cd trazo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build the package, then the site |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run pkg:build` | Build only `packages/trazo` into `packages/trazo/dist` |

## Working on the package

Stickers live in `packages/trazo/src/catalog/`, one file per category. The site imports them straight from `packages/trazo/src` through a path alias in `tsconfig.json`. To produce the publishable `packages/trazo/dist` (not committed), run `npm run pkg:build`. To publish:

```bash
cd packages/trazo
npm publish
```

`prepublishOnly` rebuilds `dist` first.

## Stack

Next.js 16, React 19, Tailwind CSS 4, Motion, Radix UI, Vaul.

## License

MIT © [Aditya Ojha](https://www.akoder.xyz). See [`LICENSE`](LICENSE).

Made by [@AdiKodez](https://x.com/AdiKodez).

