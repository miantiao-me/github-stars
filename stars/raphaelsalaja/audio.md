---
project: audio
stars: 582
description: |-
    Declarative audio synthesis for the web
url: https://github.com/raphaelsalaja/audio
---

# @web-kits/audio

[![npm](https://img.shields.io/npm/v/%40web-kits%2Faudio)](https://www.npmjs.com/package/@web-kits/audio)
[![license](https://img.shields.io/github/license/raphaelsalaja/audio)](LICENSE)
[![CI](https://github.com/raphaelsalaja/audio/actions/workflows/ci.yml/badge.svg)](https://github.com/raphaelsalaja/audio/actions/workflows/ci.yml)

Declarative audio synthesis for the web. Describe sounds as plain objects, play them with one function call.

> ~11 kB gzipped, tree-shakeable, works with vanilla JS or React.

## Install

```bash
npm install @web-kits/audio
```

## Quick start

```ts
import { defineSound, ensureReady } from "@web-kits/audio";

const click = defineSound({
  source: { type: "sine", frequency: { start: 1200, end: 300 } },
  envelope: { attack: 0.001, decay: 0.06, sustain: 0, release: 0.03 },
  gain: 0.3,
});

await ensureReady();
click();
```

### React

```tsx
import { usePatch } from "@web-kits/audio/react";

function App() {
  const patch = usePatch("/patches/core.json");

  return (
    <button onClick={() => patch.play("click")} disabled={!patch.ready}>
      Click me
    </button>
  );
}
```

## CLI

Browse and install community sound patches directly from GitHub repos:

```bash
# Browse the registry
npx @web-kits/audio add

# Install from a GitHub repo
npx @web-kits/audio add user/repo

# Create a new patch
npx @web-kits/audio init

# List installed patches
npx @web-kits/audio list
```

## Monorepo structure

```
packages/audio       Core library + CLI (published to npm)
apps/web             Documentation, registry, and homepage
ui/                  Shared UI components
.web-kits/           First-party sound patches & generated code
```

## Documentation

Full docs at [audio.raphaelsalaja.com](https://audio.raphaelsalaja.com).

## References

- Built on the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- Patch discovery and CLI inspired by [skills.sh](https://skills.sh) by Vercel

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions and guidelines.

## License

[MIT](LICENSE)

