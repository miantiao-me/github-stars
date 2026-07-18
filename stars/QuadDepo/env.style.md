---
project: env.style
stars: 191
description: |-
    null
url: https://github.com/QuadDepo/env.style
---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/header/transparent.svg?title=env.style&subtitle=Environment-tinted+favicons+for+Next.js+and+Vite&align=left&border=false&font=geist-mono&mode=dark" />
  <img alt="env.style — Environment-tinted favicons for Next.js and Vite" src="https://shieldcn.dev/header/transparent.svg?title=env.style&subtitle=Environment-tinted+favicons+for+Next.js+and+Vite&align=left&border=false&font=geist-mono&mode=light" />
</picture>

<p align="center">
  <a href="https://www.npmjs.com/package/env.style"><img alt="npm version" src="https://shieldcn.dev/npm/v/env.style.svg?variant=branded&size=xs" /></a>
  <a href="https://github.com/QuadDepo/env.style/stargazers"><img alt="GitHub stars" src="https://shieldcn.dev/github/stars/QuadDepo/env.style.svg?variant=branded&size=xs" /></a>
  <a href="https://github.com/QuadDepo/env.style/blob/main/LICENSE"><img alt="License" src="https://shieldcn.dev/github/license/QuadDepo/env.style.svg?variant=branded&size=xs" /></a>
  <a href="https://github.com/QuadDepo/env.style/actions"><img alt="CI" src="https://www.shieldcn.dev/github/ci/QuadDepo/env.style.svg?variant=branded&size=xs" /></a>
</p>

Five browser tabs, all the same favicon: dev, preview, production.. and you keep
editing the wrong one. **env.style** tints your existing favicon per environment at build
time, Vercel-style: same mark, different color. Production is never touched.

<p align="center">
  <strong><a href="https://env.style">Website</a> · <a href="./examples">Examples</a></strong>
</p>

## Quick start

```bash
pnpm add env.style
```

### Next.js

```ts
// next.config.ts
import { withEnvStyles } from 'env.style'
export default withEnvStyles(nextConfig)
```

### Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { envStyle } from 'env.style/vite'
export default defineConfig({ plugins: [envStyle()] })
```

See the package [README](./packages/env.style/README.md) for full API docs, options, and
how it works.

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md) for setup, repo structure, and
how to run examples.

## Contributors

<a href="https://github.com/QuadDepo/env.style/graphs/contributors">
  <img alt="Contributors" src="https://shieldcn.dev/contributors/QuadDepo/env.style.svg?limit=12&theme=zinc&bg=transparent&border=false&title=false" />
</a>

## License

MIT

