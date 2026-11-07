---
project: RSS.Beauty
stars: 478
description: |-
    Make Your RSS Beautiful!
url: https://github.com/miantiao-me/RSS.Beauty
---

# RSS.Beauty

Make Your RSS Beautiful!

---

English | [简体中文](./README.zh-cn.md)

[RSS.Beauty](https://rss.beauty/) is an RSS beautification tool based on XSLT technology that transforms ordinary RSS/Atom feeds into elegant reading interfaces.

![RSS.Beauty](./public/banner.png)

## Key Features

- 🎨 Beautiful reading interface
- 🔄 Support for RSS 2.0 and Atom 1.0
- 📱 Responsive design, mobile-friendly
- 🔌 One-click subscription to major RSS readers
- 🖥 Self-hosting support

## Quick Start

Visit [RSS.Beauty](https://rss.beauty) and enter any RSS feed URL to try it out.

Or visit <https://rss.beauty/rss?url=https%3A%2F%2Fgithub.com%2Fmiantiao-me%2FRSS.Beauty%2Freleases.atom> to try it out.

## Tech Stack

- [Astro](https://astro.build)
- [TailwindCSS](https://tailwindcss.com)
- [XSLT](https://www.w3.org/TR/xslt/)

## Deployment

Detailed deployment guide can be found in [Deployment Guide](./docs/deployment-guide.md).

### Serverless

Support deployment to Cloudflare Pages, Vercel, Netlify, etc. After [Fork](https://github.com/miantiao-me/RSS.Beauty/fork) this project, follow the platform tutorial to deploy.

### Docker

```bash
docker pull ghcr.io/miantiao-me/rss.beauty:main
docker run -d --name rss-beauty -p 4321:4321 ghcr.io/miantiao-me/rss.beauty:main
```

## Credits

- [Tailus UI](https://html.tailus.io/)

## Sponsor

1. [Follow me on 𝕏](https://404.li/kai)
1. [Sponsor me on GitHub](https://github.com/sponsors/miantiao-me)

## License

Licensed under the [GNU Lesser General Public License v3.0](./LICENSE).

