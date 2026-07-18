---
project: HextaUI
stars: 635
description: |-
    Ready-to-use foundation components/blocks built on top of shadcn/ui.
url: https://github.com/preetsuthar17/HextaUI
---

# HextaUI

Extended components and application blocks for shadcn/ui.

## Local development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev -- -p 3001
```

Use [http://localhost:3001](http://localhost:3001) when another application already owns port 3000. HextaUI does not reserve a port permanently.

`pnpm dev` builds the local shadcn registry before starting Next.js. Generated `public/r/*.json` files are build artifacts and are intentionally not committed.

## Verification

```bash
pnpm verify
pnpm build
```

`pnpm verify` checks the registry, TypeScript, ESLint, formatting, and tests.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the four-file authoring workflow.

