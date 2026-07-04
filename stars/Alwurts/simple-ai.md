---
project: simple-ai
stars: 753
description: |-
    A collection of beautifully designed AI interface components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
url: https://github.com/Alwurts/simple-ai
---

# Simple AI Monorepo

## Packages
- **[create-simple-ai](./packages/cli/)** - CLI for scaffolding Simple AI projects
- **[@simple-ai/docs](./packages/docs/)** - Documentation and component registry site

## Development
```bash
npm run dev          # Start docs dev server
npm run cli:dev      # Watch CLI changes
npm run build        # Build everything
npm run test         # Run all tests
```

## Release
```bash
npm run changeset    # Add changeset
npm run release      # Publish CLI
```

See [RELEASING.md](./RELEASING.md) for details.

