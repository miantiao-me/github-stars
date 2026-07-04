---
project: nocta-ui
stars: 123
description: |-
    Modern, accessible React components built with TypeScript and Tailwind CSS.
url: https://github.com/nocta-ui/nocta-ui
---

<p align="center">
  <img src="nocta-ui.jpeg" alt="Nocta UI" />
</p>

<p align="center">
  <a href="https://nocta-ui.com">Documentation</a> ·
  <a href="https://github.com/nocta-ui/nocta-ui/issues">Issues</a> ·
  MIT License
</p>

# Nocta UI
Nocta UI is a React component library delivered as source files you control. The CLI keeps installs lightweight and version-free while interactive components build on `@ariakit/react` for accessible behavior out of the box.

## Supported Stacks
- Next.js (App and Pages Router)
- Vite + React
- React Router 7
- TanStack Start
- Custom React workspaces (library or shared UI packages)

## Requirements
- Node.js 18+
- React 18+
- Tailwind CSS v4 present in the workspace
- TypeScript

## Quick Start
**Discover components**
```bash
npx @nocta-ui/cli list
```

**Single workspace (Next.js, Vite, and other supported frameworks)**
```bash
npx @nocta-ui/cli init
npx @nocta-ui/cli add button card badge
```
`init` analyses the current project, writes `nocta.config.json`, updates `nocta.workspace.json`, and drops helpers (`lib/utils.ts`, `lib/icons.ts`) when the workspace owns them. `add` copies registry components into the configured `aliases.components` path and installs any missing dependencies.

**Monorepo linking (shared UI + application)**
```bash
cd packages/ui
npx @nocta-ui/cli init                # choose Shared UI (writes config + helpers)

cd ../apps/web
npx @nocta-ui/cli init                # choose Application, link "ui"
npx @nocta-ui/cli add button card     # component source flows into packages/ui
```
- `init` registers both workspaces inside `nocta.workspace.json`. The shared package keeps the helpers and Tailwind tokens; the application records the link.
- `add` runs from the application but writes React source into `packages/ui/src/...`, updates export barrels, and installs dependencies in the owning workspace. Application-side stubs are generated only when required.
- Apps import from the shared package output (`import { Button } from "ui"`). Rebuild the shared package after each add (`bun run --filter ui build` or `bun run --filter ui dev`) so consumers read fresh artefacts.

## `init` Command Reference
- Detects the repo root, framework, package manager, and Tailwind v4.
- Builds a tailored `nocta.config.json` with component and utility aliases.
- Writes shared helpers (`lib/utils.ts`, `components/lib/icons.ts`) when needed.
- Injects Nocta design tokens into your Tailwind entry file for managed workspaces.
- Updates or creates `nocta.workspace.json` so other workspaces can discover this setup.

### Flags
| Flag | Description |
| --- | --- |
| `--dry-run` | Preview every action without touching the filesystem. |
| `--help` | Show command-specific help. |
| `--registry-url` | Point to a custom component registry (or use `NOCTA_REGISTRY_URL`). |

## After `init`
- Add components with `npx @nocta-ui/cli add <component...>`.
- Browse the component registry at `https://nocta-ui.com` or via the CLI prompts.
- Keep your working tree clean; the CLI rolls back if something fails after file writes.

## Contributing
- We welcome contributions! Whether it's bug reports, feature requests, or code contributions, please feel free to open an issue or submit a pull request.
- Read `CONTRIBUTING.md` for detailed guidelines.

## License
- MIT License - see [LICENSE](LICENSE) for details.

