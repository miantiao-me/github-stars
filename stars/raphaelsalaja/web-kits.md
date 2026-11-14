---
project: web-kits
stars: 600
description: |-
    Interface kits for the web
url: https://github.com/raphaelsalaja/web-kits
---

# Web Kits

[![license](https://img.shields.io/github/license/raphaelsalaja/web-kits)](LICENSE)
[![CI](https://github.com/raphaelsalaja/web-kits/actions/workflows/ci.yml/badge.svg)](https://github.com/raphaelsalaja/web-kits/actions/workflows/ci.yml)

Interface kits for the web.

## Packages

| Package | Version | Description |
| --- | --- | --- |
| [`@web-kits/audio`](./packages/audio) | [![npm](https://img.shields.io/npm/v/@web-kits/audio)](https://www.npmjs.com/package/@web-kits/audio) | Declarative audio synthesis, with a CLI for sound patches |
| [`@web-kits/blur`](./packages/blur) | [![npm](https://img.shields.io/npm/v/@web-kits/blur)](https://www.npmjs.com/package/@web-kits/blur) | The progressive blur from the iOS scroll edge |
| [`@web-kits/springboard`](./packages/springboard) | [![npm](https://img.shields.io/npm/v/@web-kits/springboard)](https://www.npmjs.com/package/@web-kits/springboard) | Apple's springs, curves, app launch and genie |
| [`@web-kits/motion-blur`](./packages/motion-blur) | [![npm](https://img.shields.io/npm/v/@web-kits/motion-blur)](https://www.npmjs.com/package/@web-kits/motion-blur) | Motion blur for moving DOM elements |

Each package is versioned and published on its own.

## Develop

```bash
pnpm install
pnpm build
pnpm dev
```

## Structure

```
apps/web                      Web Kits site
apps/audio                    Audio docs and registry (audio.raphaelsalaja.com)
apps/audio-marketing          Audio launch video (Remotion)
apps/springboard-playground   Springboard playground (Vite)
packages/*                    Published packages
internal/ui                   Shared UI for the apps
internal/icons                Shared icons for the apps
skills/create-sound           Agent skill for writing audio patches
.web-kits/                    First-party audio patches
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)

