---
project: styleui
stars: 63
description: |-
    null
url: https://github.com/heyfabrika/styleui
---

# StyleUI

<p align="center">
  <a href="https://styleui.dev">
    <img src="public/preview.png" alt="StyleUI templates: Notio and Axis landing page previews" width="100%" />
  </a>
</p>

**Ship faster, stay in style.** StyleUI offers copy-in page templates for modern Next.js apps, distributed through a [shadcn/ui](https://ui.shadcn.com/)–compatible registry.

Built with React 19, Next.js 16, Tailwind CSS 4, Motion, and [Base UI](https://base-ui.com/) primitives.

## Templates

Browse available templates on the site: **[styleui.dev/templates](https://styleui.dev/templates)**.

## Install from the registry

Use the [shadcn CLI](https://ui.shadcn.com/docs/cli) to add items into your own project (paths follow your `components.json` aliases).

```bash
npx shadcn@latest add https://styleui.dev/r/<name>.json
```

Examples:

```bash
npx shadcn@latest add https://styleui.dev/r/notio.json
npx shadcn@latest add https://styleui.dev/r/axis.json
```

Discover available items in the registry index:

**[https://styleui.dev/r/registry.json](https://styleui.dev/r/registry.json)**

## Local development

Prerequisites: [Bun](https://bun.sh/).

```bash
git clone https://github.com/<your-org>/styleui.git
cd styleui
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

When you change [registry.json](registry.json) or registry-backed files, rebuild static registry JSON:

```bash
bun run registry:build
```

## Contributing

Read **[CONTRIBUTING.md](CONTRIBUTING.md)** for repository layout, how to add or update registry items, and pull request guidelines.

## License

Licensed under the [MIT License](LICENSE).

## Star History

<a href="https://www.star-history.com/?repos=heyfabrika%2Fstyleui&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=heyfabrika/styleui&type=date&theme=dark&logscale&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=heyfabrika/styleui&type=date&logscale&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=heyfabrika/styleui&type=date&logscale&legend=top-left" />
 </picture>
</a>

