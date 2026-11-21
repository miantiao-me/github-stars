---
project: aigotools
stars: 659
description: |-
    AigoTools can help users quickly create and manage website directory, with built-in site auto-crawling features, and also provides internationalization, SEO, image storage, and other functions. It allows users to quickly deploy their own directory site online.
url: https://github.com/heyjunpenn/aigotools
---

<div align="center">
<h1 align="center">
  <img src="public/aigotools-logo.svg" alt="AIGOTOOLS Logo" width="40" height="40" align="top" /> AIGOTOOLS Astro
</h1>

<p align="center">
  <a href="docs/screenshots/home-desktop.webp">
    <img src="docs/screenshots/home-desktop.webp" alt="AIGOTOOLS homepage" width="500" />
  </a>
</p>
</div>

English · [简体中文](README.zh-CN.md)

An Astro directory for browsing AI tools and reading task-based guides. Includes the content library, local images and Pagefind search.

**221 tools · 38 guides · 547 image assets · No database required**

[Features](#core-features) · [Performance](#performance-and-seo) · [Quick start](#quick-start) · [Screenshots](#screenshots) · [Usage guide](docs/usage/README.md)

## Core features

### 1. Tools, guides and images included

The project includes 221 published tool profiles, 38 scenario guides and 547 image assets. Profiles and guides retain their text, source links, stable IDs, relationships and publication states for editing and expansion. The content CLI handles revisions, approval and publication; Git tracks the file changes. Images are stored locally and verified with SHA-256 hashes, so you can run the site without configuring a CDN or image storage.

### 2. Find tools by task

Readers can browse tools by category or start with a scenario guide to learn which tools a task needs, how to use them and where their limits are. Guides link to tool profiles, and profiles link back to related scenarios. The responsive layout uses a desktop sidebar and a mobile navigation drawer.

### 3. Build and deploy static files

Astro generates static pages at build time. The site runs without a database, account system or API keys. Upload `dist/` to a static host and configure its URL routing to publish. Content updates require editing files and rebuilding, with no persistent application server to maintain. The repository includes a Cloudflare static-assets configuration example.

### 4. Search in the browser

Pagefind builds the search index alongside the site. Readers search tools and guides through the same interface on desktop and mobile, without a separate search service or paid search API. Rebuild after editing content to update the index.

### 5. SEO metadata and checks included

Pages include canonical URLs, structured data and social sharing metadata. The build generates a sitemap, robots.txt and llms.txt. Tools, categories and guides have individual URLs; set `PUBLIC_SITE_URL` to use your own domain in generated links. Run the SEO checks before publishing to find metadata and page-structure issues.

## Performance and SEO

Measured on 2026-11-19 with Lighthouse 13.5.0 against the local production-preview homepage, once per device. These are local lab results, not hosted PageSpeed Insights scores or real-user Core Web Vitals data.

| Metric         | Mobile    | Desktop   |
| -------------- | --------- | --------- |
| Performance    | 100 / 100 | 100 / 100 |
| Accessibility  | 100 / 100 | 100 / 100 |
| Best Practices | 100 / 100 | 100 / 100 |
| SEO            | 100 / 100 | 100 / 100 |
| FCP            | 1.4 s     | 0.4 s     |
| LCP            | 1.7 s     | 0.4 s     |
| Speed Index    | 1.4 s     | 0.4 s     |
| TBT            | 0 ms      | 0 ms      |
| CLS            | 0.005     | 0.003     |

The site-wide SEO check passed for 289 pages, with 259 redirect pages skipped. This validates project-defined page rules, not search rankings. Hosting, network conditions and analytics scripts affect deployed performance. Scores can vary across environments and runs.

[Methodology and reproduction](docs/performance/README.md) · [Measurement data](docs/performance/homepage-lighthouse.json)

## Quick start

Requires Node.js 22.12+ and Bun 1.4.4. Astro and the content scripts run on Node.js.

```sh
bun install --frozen-lockfile
bun run dev --host 127.0.0.1 --port 4321
```

Open http://127.0.0.1:4321. The development command first builds the local search index. Re-run it after changing content to refresh search.

```sh
bun run build
bun run preview --host 127.0.0.1 --port 4321
```

`.env.example` documents optional settings. The default origin is `https://example.com`; set `PUBLIC_SITE_URL` to your own HTTPS origin before deploying. Analytics is disabled unless `PUBLIC_GA_ID` is set. Never copy production environment files into a public repository.

## Screenshots

All 10 public page types, plus search and mobile navigation states: 23 screenshots in total. Tool profiles and guides each show one representative page. Images are 2× resolution, lossless WebP; click a thumbnail to open the original.

| Page                                                                        | Desktop                                                                                                                                                                   | Mobile                                                                                                                                                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Homepage**<br><code>/</code>                                              | <a href="docs/screenshots/home-desktop.webp"><img src="docs/screenshots/home-desktop.webp" alt="Homepage (desktop)" width="560" /></a>                                    | <a href="docs/screenshots/home-mobile.webp"><img src="docs/screenshots/home-mobile.webp" alt="Homepage (mobile)" width="156" /></a>                                    |
| **Tool directory**<br><code>/tools</code>                                   | <a href="docs/screenshots/tools-desktop.webp"><img src="docs/screenshots/tools-desktop.webp" alt="Tool directory (desktop)" width="560" /></a>                            | <a href="docs/screenshots/tools-mobile.webp"><img src="docs/screenshots/tools-mobile.webp" alt="Tool directory (mobile)" width="156" /></a>                            |
| **Tool category**<br><code>/tools/data</code>                               | <a href="docs/screenshots/tool-category-desktop.webp"><img src="docs/screenshots/tool-category-desktop.webp" alt="Tool category (desktop)" width="560" /></a>             | <a href="docs/screenshots/tool-category-mobile.webp"><img src="docs/screenshots/tool-category-mobile.webp" alt="Tool category (mobile)" width="156" /></a>             |
| **Scenario category**<br><code>/scenarios/productivity</code>               | <a href="docs/screenshots/scenario-category-desktop.webp"><img src="docs/screenshots/scenario-category-desktop.webp" alt="Scenario category (desktop)" width="560" /></a> | <a href="docs/screenshots/scenario-category-mobile.webp"><img src="docs/screenshots/scenario-category-mobile.webp" alt="Scenario category (mobile)" width="156" /></a> |
| **Tool profile**<br><code>/tools/data/claude</code>                         | <a href="docs/screenshots/tool-desktop.webp"><img src="docs/screenshots/tool-desktop.webp" alt="Tool profile (desktop)" width="560" /></a>                                | <a href="docs/screenshots/tool-mobile.webp"><img src="docs/screenshots/tool-mobile.webp" alt="Tool profile (mobile)" width="156" /></a>                                |
| **Scenario guide**<br><code>/scenarios/productivity/ai-meeting-notes</code> | <a href="docs/screenshots/guide-desktop.webp"><img src="docs/screenshots/guide-desktop.webp" alt="Scenario guide (desktop)" width="560" /></a>                            | <a href="docs/screenshots/guide-mobile.webp"><img src="docs/screenshots/guide-mobile.webp" alt="Scenario guide (mobile)" width="156" /></a>                            |
| **About**<br><code>/about</code>                                            | <a href="docs/screenshots/about-desktop.webp"><img src="docs/screenshots/about-desktop.webp" alt="About (desktop)" width="560" /></a>                                     | <a href="docs/screenshots/about-mobile.webp"><img src="docs/screenshots/about-mobile.webp" alt="About (mobile)" width="156" /></a>                                     |
| **Contact**<br><code>/contact</code>                                        | <a href="docs/screenshots/contact-desktop.webp"><img src="docs/screenshots/contact-desktop.webp" alt="Contact (desktop)" width="560" /></a>                               | <a href="docs/screenshots/contact-mobile.webp"><img src="docs/screenshots/contact-mobile.webp" alt="Contact (mobile)" width="156" /></a>                               |
| **Privacy**<br><code>/privacy</code>                                        | <a href="docs/screenshots/privacy-desktop.webp"><img src="docs/screenshots/privacy-desktop.webp" alt="Privacy (desktop)" width="560" /></a>                               | <a href="docs/screenshots/privacy-mobile.webp"><img src="docs/screenshots/privacy-mobile.webp" alt="Privacy (mobile)" width="156" /></a>                               |
| **Terms**<br><code>/terms</code>                                            | <a href="docs/screenshots/terms-desktop.webp"><img src="docs/screenshots/terms-desktop.webp" alt="Terms (desktop)" width="560" /></a>                                     | <a href="docs/screenshots/terms-mobile.webp"><img src="docs/screenshots/terms-mobile.webp" alt="Terms (mobile)" width="156" /></a>                                     |
| **Search**                                                                  | <a href="docs/screenshots/search-desktop.webp"><img src="docs/screenshots/search-desktop.webp" alt="Search (desktop)" width="560" /></a>                                  | <a href="docs/screenshots/search-mobile.webp"><img src="docs/screenshots/search-mobile.webp" alt="Search (mobile)" width="156" /></a>                                  |
| **Mobile navigation**                                                       | —                                                                                                                                                                         | <a href="docs/screenshots/navigation-mobile.webp"><img src="docs/screenshots/navigation-mobile.webp" alt="Mobile navigation" width="156" /></a>                        |

[Screenshot regeneration instructions](docs/usage/README.md#展示截图).

## Included content library

The included content library contains **221 published tool profiles and 38 published scenario guides**, with original text, source references, stable IDs, relationships, publication state and SEO decisions. Homepage editorial configuration is included.

The asset manifest contains 547 images (about 22.3 MB). Verified copies are bundled in `public/content-assets/`, so the included library does not require the original CDN. `cdn-assets.json` retains original URLs and SHA-256 hashes as provenance. These files include historical assets retained by the manifest, not only current covers.

- `src/content/tools/<id>/_shared.yml`: identity, category, facts, publication status.
- `src/content/tools/<id>/en.yml`: name, slug, description, fact labels and FAQ.
- `src/content/scenarios/<id>/`: shared tool references and structured English guide.
- `src/content/home/en.yml`: homepage copy and category descriptions.
- `public/content-assets/`: bundled library images, served locally by default.
- `src/content-assets/`: optional new local images resolved by Astro.

See [the usage guide](docs/usage/README.md) for configuration, content commands, deployment and troubleshooting. The content CLI currently does not implement `--help`. Production routes expose only published records; candidate records are available in content preview mode. Approval and indexing decisions are separate. Public pages are in English.

## Deploy your own copy

Upload the `dist/` directory to a static host after setting `PUBLIC_SITE_URL` and running the build. Pretty URLs must resolve `/path` to `/path.html`. The included `_headers` file provides cache settings for hosts that support it. `wrangler.jsonc` is an optional Cloudflare static-assets example with a placeholder project name. CI validates code only and does not deploy anything.

Review content freshness and configure branding, contact, privacy and terms pages before launching your own site. The license does not grant rights to AIGOTOOLS trademarks or brand artwork. Bundled fonts remain subject to their own license; see `THIRD_PARTY_NOTICES.md`.

## Checks

```sh
bun run lint
bun run format:check
bun run test
bun run build
```

Tests include local fixture builds and can take several minutes. Browser experiment scripts ending in `.browser.mjs` are separate from the default test suite and require Chrome. Optional screenshot capture and R2 upload commands require your own configuration; neither runs during ordinary install, development or build.

## License

Code and AIGOTOOLS-authored editorial content are available under the [MIT License](LICENSE). Third-party logos, screenshots, quotations and fonts retain their respective rights. AIGOTOOLS trademarks and brand artwork are excluded. See [Third-party notices](THIRD_PARTY_NOTICES.md) for details.

## Support this project

If AIGOTOOLS is useful to you, [buy me a coffee](https://buy.stripe.com/6oU4gydGa7DybXSavFb3q00) to support development and maintenance. Stripe accepts a one-time contribution with a suggested amount of US$5; you can choose your own amount.

