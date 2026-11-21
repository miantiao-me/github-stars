---
project: xeet
stars: 145
description: |-
    X posts rendered to PNG without a browser, in safe Rust and WebAssembly.
url: https://github.com/rauchg/xeet
---

# xeet

**[xeet-rs.vercel.app](https://xeet-rs.vercel.app)**

xeet draws X posts exactly the way X draws them, without a browser. Hand it a
post, or just an `x.com` link, and you get back a Retina PNG that matches what
Chrome shows on x.com: the same line breaks, the same emoji, the same fallback
fonts, and "Show more" in the same place.

Most preview tools boot headless Chromium and take a screenshot. xeet
reimplements the parts a post actually depends on instead: X's client rules,
Blink and HarfBuzz text layout, the flexbox geometry around the text, and
Skia-style anti-aliasing. All of it is safe Rust (`#![forbid(unsafe_code)]`).

It ships as one native binary and one WebAssembly core, plus six font packs the
host registers on first use. Once those are loaded, a text post renders in
2.8 ms (p50, 390 px at 3×), or 4.5 ms with four media placeholders. Rendering
needs no network, no filesystem, no clock and no system fonts, and the native
and WASM builds produce the same bytes. CI checks Linux x64, Linux arm64, macOS
and WASM against each other on every run.

## Gallery

Every image below is `xeet`'s own output, rendered in both light and dark themes so GitHub matches your appearance setting.

<table>
<tr>
<td width="50%" valign="top">
<picture><source media="(prefers-color-scheme: dark)" srcset="docs/gallery/nasa-dark.webp"><source media="(prefers-color-scheme: light)" srcset="docs/gallery/nasa-light.webp"><img src="docs/gallery/nasa-light.webp" alt="NASA Goddard's #280characters space field rendered by xeet"></picture><br>
<b>Emoji as layout.</b> <code>@NASAGoddard</code>'s 2017 space field: runs of preserved spaces, Apple Color Emoji and a hashtag, placed by hand.
</td>
<td width="50%" valign="top">
<picture><source media="(prefers-color-scheme: dark)" srcset="docs/gallery/rauchg-math-nested-dark.webp"><source media="(prefers-color-scheme: light)" srcset="docs/gallery/rauchg-math-nested-light.webp"><img src="docs/gallery/rauchg-math-nested-light.webp" alt="Mathematical digits, Show more cut, and nested quote rendered by xeet"></picture><br>
<b>Math digits, Show more &amp; nested quote.</b> Unicode math bold digits fall back to STIX Two Math, cut with block <code>Show more</code> above a depth-2 quote.
</td>
</tr>
</table>

**[Browse all 17 edge-case renders (Web & iOS, carousels, polls, video posters, CJK/RTL) in `docs/GALLERY.md` →](docs/GALLERY.md)** — or try any post interactively in the [playground](https://xeet-rs.vercel.app).

## Features

- **Matches Chrome, and proves it.** Text, layout, cards and pixels are all
  checked against real headless Chrome: zero line-break and zero height
  mismatches on the text oracle, 147/147 frame rows per theme, 192/192 card rows,
  and 159/159 captured posts end to end. See
  [How the tests work](#how-the-tests-work).
- **Follows X's own rules.** [`SPEC.md`](SPEC.md) records every rule along with
  its evidence (the JS chunk, the function, the captured payload) for
  `x-web@55591fe0`, the version X serves today.
  [`crates/xeet-core/rules/x-web.json`](crates/xeet-core/rules/x-web.json) is the
  machine-readable copy the renderer runs.
- **Resolves links without owning the network.** [`xeet-resolve`](crates/xeet-resolve/src/lib.rs)
  turns tweet text or an `x.com` URL into a complete `Post`, but the caller
  supplies every byte of I/O (`Fetch`, `Lookup`, `Cache`, `Clock`). The core
  stays a pure function, and the network policy stays yours.
- **Runs wherever you need the image.** One core, three targets: a WebAssembly
  module for browsers and Node ([`packages/xeet`](packages/xeet/)), a native
  Rust library ([`crates/xeet-core`](crates/xeet-core/src/lib.rs),
  [`crates/xeet-resolve`](crates/xeet-resolve/src/lib.rs)), and the `xeet` CLI
  ([`crates/xeet-cli`](crates/xeet-cli/src/commands/mod.rs), packaged for
  `npm i -g @xeet/cli` by [`tools/ship/package-cli.mjs`](tools/ship/package-cli.mjs)).
- **Deterministic down to the byte.** [`xeet-core`](crates/xeet-core/src/lib.rs)
  does no I/O, no core crate uses `unsafe`, and native and WASM output have
  identical SHA-256 hashes on 24 of 24 cases.
- **Handles the long tail.** Bidi, CJK, kaomoji, multi-codepoint emoji, nested
  quotes, cards, polls, video, the web/iOS differences, and safe link resolution.
  The full list is under [What it handles](#what-it-handles).

## Running it

```bash
$ vercel dev
```

`vercel dev` runs [`tools/ship/vercel-build.mjs`](tools/ship/vercel-build.mjs)
and serves the WebAssembly playground locally. To build and test from source:

```bash
$ npm run build                  # runs the CI test gates, builds wasm, writes dist/
$ npm test                       # contract, unsafe, golden stamps, and wasm package tests
$ cargo test --workspace         # rules, text, layout, paint, resolver, iconic posts

$ cargo build --release --bin xeet
$ xeet render post.json --width 390 --theme dark --dpr 3 -o post.png
```

The Chrome parity oracle needs one dev dependency of its own: `pnpm --dir tools install`.

## API

### JavaScript & WebAssembly

```sh
npm i @xeet/core
```

```ts
import { loadXeet } from "@xeet/core/node";

const xeet = await loadXeet(); // Promise<Xeet> (singleton per process)

const report = xeet.explain(post, { width: 390, theme: "dark", dpr: 3 });
// → Report: { ruleset, verifiedFor, size: { width, height }, length, text, entities, hidden, attachment, warnings }

const { png, report: same } = xeet.render(post, { width: 390, theme: "dark", dpr: 3 });
// → { png: Uint8Array, report: Report }  (PNG dimensions: ceil(report.size.width * dpr) × ceil(report.size.height * dpr))

if (xeet.hasShowMore(post, { surface: "web-timeline", width: 390 })) {
  const expanded = xeet.render(post, { surface: "web-timeline", width: 390, expanded: true });
}
const sheet = xeet.sheet({ post, widths: [382, 390, 600], themes: ["light", "dark"], dpr: 2 });
// → Uint8Array (single labeled PNG grid)
```

In the browser, initialize the WebAssembly module and bind the same [`Xeet`](packages/xeet/src/types.d.ts#L280) surface:

```js
import init, * as wasm from "/wasm/xeet_wasm.js";
import { bind } from "@xeet/core";

await init();
const xeet = bind(wasm); // Xeet
const { png, report } = xeet.render(post, { width: 390, theme: "light", dpr: 2 });
```

#### Methods & return values ([`Xeet`](packages/xeet/src/types.d.ts#L280) · [`abi.js`](packages/xeet/src/abi.js#L80))

| Call | Return type | Description & source definition |
| --- | --- | --- |
| `loadXeet(options?)` | `Promise<Xeet>` | Node/Bun/Deno async loader (`{ lazy?: boolean }`) — [`node.d.ts`](packages/xeet/src/node.d.ts#L14) · [`node.js`](packages/xeet/src/node.js#L93) |
| `loadXeetSync(options?)` | `Xeet` | Synchronous Node singleton loader — [`node.d.ts`](packages/xeet/src/node.d.ts#L16) · [`node.js`](packages/xeet/src/node.js#L106) |
| `bind(wasm)` | `Xeet` | Browser/worker wrapper over initialized `wasm-bindgen` exports — [`types.d.ts`](packages/xeet/src/types.d.ts#L334) · [`abi.js`](packages/xeet/src/abi.js#L80) |
| `xeet.render(post, options?)` | [`RenderResult`](packages/xeet/src/types.d.ts#L160) (`{ png: Uint8Array, report: Report }`) | Encoded PNG bytes + layout [`Report`](packages/xeet/src/types.d.ts#L134) — [`abi.js`](packages/xeet/src/abi.js#L111) · [`render.rs`](crates/xeet-core/src/render.rs#L263) |
| `xeet.renderPng(post, options?)` | `Uint8Array` | Encoded PNG bytes alone — [`types.d.ts`](packages/xeet/src/types.d.ts#L290) · [`abi.js`](packages/xeet/src/abi.js#L117) |
| `xeet.renderRgba(post, options?)` | [`RgbaResult`](packages/xeet/src/types.d.ts#L168) (`{ width, height, rgba: Uint8Array, report: Report }`) | Device-pixel dimensions + straight-alpha RGBA8 (`width × height × 4` bytes) + `Report` — [`abi.js`](packages/xeet/src/abi.js#L125) · [`render.rs`](crates/xeet-core/src/render.rs#L220) |
| `xeet.renderMany(post, optionsList)` | [`BatchItem[]`](packages/xeet/src/types.d.ts#L180) (`{ png: Uint8Array, report: Report, paint: number }[]`) | Decodes `post` media once across multiple `RenderOptions`; `paint` is render ms — [`abi.js`](packages/xeet/src/abi.js#L148) · [`render.rs`](crates/xeet-core/src/render.rs#L286) |
| `xeet.explain(post, options?)` | [`Report`](packages/xeet/src/types.d.ts#L134) | Layout boxes, character count, entities, and rule decisions with zero rasterization — [`abi.js`](packages/xeet/src/abi.js#L95) · [`render.rs`](crates/xeet-core/src/render.rs#L180) |
| `xeet.hasShowMore(post, options?)` | `boolean` | `true` when `post` renders with `"Show more"` collapsed under `options` — [`abi.js`](packages/xeet/src/abi.js#L104) · [`render.rs`](crates/xeet-core/src/render.rs#L196) |
| `xeet.sheet({ post, widths?, themes?, dpr? })` | `Uint8Array` | Labeled `widths × themes` contact sheet PNG — [`abi.js`](packages/xeet/src/abi.js#L190) · [`render.rs`](crates/xeet-core/src/render.rs#L329) |
| `xeet.resolve(input, options?, host?)` | `Promise<`[`Resolved`](packages/xeet/src/types.d.ts#L267)`>` | Hydrates text, an `x.com` URL, or JSON into `{ post, links, media, source, warnings }` — [`resolve.js`](packages/xeet/src/resolve.js#L169) · [`xeet-resolve`](crates/xeet-resolve/src/lib.rs#L449) |
| `xeet.resolveLinks(url, options?, host?)` | `Promise<`[`ResolvedLink`](packages/xeet/src/types.d.ts#L238)`>` | Crawls one URL as `Twitterbot/1.0` → `{ meta, chain, finalUrl, tags, imageUrl, image?, notes, cached }` — [`resolve.js`](packages/xeet/src/resolve.js#L185) · [`xeet-resolve`](crates/xeet-resolve/src/lib.rs#L422) |
| `xeet.whatwgHost(parts?)` | [`Host`](packages/xeet/src/types.d.ts#L190) | Wraps `fetch` + optional DNS `lookup` & cache callbacks — [`resolve.js`](packages/xeet/src/resolve.js#L41) |
| `xeet.upstream` | `string` | Embedded X web-client revision hash (e.g. `"55591fe0"`) — [`abi.js`](packages/xeet/src/abi.js#L92) |

#### `Report` shape ([`types.d.ts`](packages/xeet/src/types.d.ts#L134) · [`model.rs`](crates/xeet-core/src/model.rs#L275))

- `ruleset: string` — X ruleset version (e.g. `"x-web@55591fe0"`).
- `verifiedFor: Surface[]` — surfaces verified against Chrome for this ruleset.
- `size: { width: number, height: number }` ([`Size`](crates/xeet-core/src/model.rs#L297)) — frame box in CSS pixels; PNG pixel dimensions are `Math.ceil(size.width * dpr)` × `Math.ceil(size.height * dpr)`.
- `length: { weighted: number, limit: number, valid: boolean }` ([`Length`](crates/xeet-core/src/model.rs#L290)) — X weighted character count (URL = 23, emoji/CJK = 2; standard limit = 280).
- `text: { lines: number, truncated: boolean, hasShowMore: boolean, showMore: "inline" | "clamped" | null, visible: string }` ([`TextReport`](crates/xeet-core/src/model.rs#L304)) — rendered line count, `"Show more"` mode (`"inline"` web UTF-16 cut vs `"clamped"` iOS 9-line clamp), and displayed text.
- `entities: { kind: "url" | "mention" | "hashtag" | "cashtag", range: [number, number], text: string, display?: string }[]` ([`Entity`](crates/xeet-core/src/model.rs#L317)) — UTF-16 `[start, end]` code-unit offsets into `post.text`.
- `hidden: { range: [number, number], why: string }[]` ([`Hidden`](crates/xeet-core/src/model.rs#L328)) — UTF-16 ranges stripped from visible text (`"reply_mentions"`, `"quote_url"`, `"media_url"`).
- `attachment: { shown: "card" | "media" | "quote" | "poll", url?: string | null, why: string } | null` ([`Attachment`](crates/xeet-core/src/model.rs#L335)) — winning attachment and rule reason.
- `warnings: string[]` — non-fatal notes (such as missing image bytes drawn as a placeholder).

A [`Post`](crates/xeet-core/src/model.rs#L16) ([`types.d.ts`](packages/xeet/src/types.d.ts#L78)) requires only `text`:

```json
{
  "text": "We just shipped the thing.",
  "author": { "name": "Vercel", "handle": "vercel", "verified": "business", "squareAvatar": true },
  "media": [{ "kind": "video", "width": 1280, "height": 720, "duration": 11.7 }],
  "links": { "https://vercel.com/blog/x": { "card": "summary_large_image", "title": "…" } },
  "quote": { "text": "…", "author": { "name": "…", "handle": "…" } },
  "poll": { "choices": ["Yes", "No"], "votes": [58, 42] },
  "counts": { "replies": 131, "reposts": 55, "likes": 5264, "views": 37047269 },
  "createdAt": "2026-11-10T06:00:00Z",
  "now": "2026-11-10T09:00:00Z"
}
```

[`RenderOptions`](crates/xeet-core/src/model.rs#L216) ([`types.d.ts`](packages/xeet/src/types.d.ts#L9)) is `{ surface?: "web-timeline" | "web-detail" | "ios-timeline" | "ios-detail", width?: number, theme?: "light" | "dark", dpr?: number, fontScale?: number, expanded?: boolean }`.
Limits are enforced in [`limits.rs`](crates/xeet-core/src/limits.rs), published as JSON Schema in [`packages/xeet/src/schemas.js`](packages/xeet/src/schemas.js) (with MCP tool descriptors in [`packages/xeet/src/mcp.js`](packages/xeet/src/mcp.js)). Validation and limit failures throw [`XeetError`](packages/xeet/src/types.d.ts#L316) ([`abi.js`](packages/xeet/src/abi.js#L32) · [`render.rs`](crates/xeet-core/src/render.rs#L50)) with `{ code: string, status: 400 | 413 | 500 | 503, fields: { path, message, suggestion? }[], notes: string[] }`.

#### Resolution & `Resolved` shape ([`types.d.ts`](packages/xeet/src/types.d.ts#L267) · [`xeet-resolve/src/lib.rs`](crates/xeet-resolve/src/lib.rs#L322))

Resolution takes its network from the caller — `fetch` is externalized, never imported, and the library follows redirects itself:

```js
// input: tweet text, an x.com status URL, or post JSON.
const resolved = await xeet.resolve(input, { media: true, width: 390, dpr: 2 }, {
  fetch: (request) => fetch(request.url, { redirect: "manual", headers: request.headers }),
  lookup: (host) => dns.resolve(host),         // optional: enables the DNS-hop SSRF guard
  cacheGet: async (key) => store.get(key),     // optional: { value, storedAt } | null
  cacheSet: async (key, value, storedAt) => store.set(key, { value, storedAt }),
});
// resolved: {
//   post: Post,                                // pass directly to xeet.render(resolved.post, options)
//   links: Record<string, ResolvedLink>,       // keyed by URL as written in post.text
//   media: Record<string, MediaAsset>,         // { variant, bytes, width, height, role, data? }
//   source: { url, id, appVersion, pinned },   // upstream status metadata
//   warnings: string[],
// }

const link = await xeet.resolveLinks("https://t.co/jO01BMGwXr", { media: false }, host);
// link: { meta: LinkMeta, chain: { url, status }[], finalUrl, tags, imageUrl, image?, notes, cached }
```

[`packages/xeet/src/resolve.js`](packages/xeet/src/resolve.js#L41) documents the [`Host`](packages/xeet/src/types.d.ts#L190) contract (`whatwgHost`, `memoryCache`, `noCache`); failures throw [`ResolveError`](packages/xeet/src/types.d.ts#L327) ([`resolve.js`](packages/xeet/src/resolve.js#L134) · [`xeet-resolve`](crates/xeet-resolve/src/lib.rs#L335)) with `{ code, status, fields }`.

### Rust & CLI

```rust
use xeet_core::render;

// Result<(Vec<u8>, model::Report), render::Error> — network-free; core fonts embedded
let (png, report) = render::render(&post, &opts)?;
// Result<(paint::Pixmap, model::Report), render::Error> — straight-alpha RGBA8
let (pixmap, report) = render::render_rgba(&post, &opts)?;
// Result<model::Report, render::Error>
let report = render::explain(&post, &opts)?;
// Result<bool, render::Error>
let can_expand = render::has_show_more(&post, &opts)?;
// Result<(DisplayList, model::Report), render::Error> — every box, before rasterizing
let (list, report) = render::display_list(&post, &opts)?;
```

See [`render.rs`](crates/xeet-core/src/render.rs#L162), [`model.rs`](crates/xeet-core/src/model.rs#L16), [`display.rs`](crates/xeet-core/src/display.rs#L153), and [`paint/mod.rs`](crates/xeet-core/src/paint/mod.rs#L51) for the Rust types. The resolver ([`xeet-resolve`](crates/xeet-resolve/src/lib.rs#L449)) exposes the same [`Resolved`](crates/xeet-resolve/src/lib.rs#L322) / [`ResolvedLink`](crates/xeet-resolve/src/lib.rs#L263) types over injected traits (`Fetch`, `Lookup`, `Cache`, `Clock`), with [`xeet-resolve-net`](crates/xeet-resolve-net/src/lib.rs) as the default `ureq` + `rustls` host:

```rust
// Result<xeet_resolve::Resolved, xeet_resolve::Error>
let resolved = xeet_resolve::resolve(input, options, &fetch, Some(&lookup), Some(&cache), Some(&clock)).await?;
```

```sh
npm i -g @xeet/cli               # or: cargo install --git https://github.com/rauchg/xeet xeet-cli

xeet render post.json --surface web-detail --width 390 --theme dark --dpr 3 -o post.png   # writes PNG (-o - for stdout)
xeet explain post.json --compact | jq .size                                               # prints Report JSON to stdout
xeet sheet post.json --widths 320,390,600 --themes light,dark -o sheet.png                # writes contact-sheet PNG
xeet resolve https://x.com/NASA/status/2119833829389041896 --media | xeet render - -o nasa.png # Resolved JSON → PNG
xeet-render serve --stdio        # JSONL server: { id, op: "render" | "explain" | "info", ... }
```

CLI exit codes ([`commands/mod.rs`](crates/xeet-cli/src/commands/mod.rs#L11)): `0` success, `2` bad usage, `3` invalid input or over limit, `4` render stage failure, `5` file/network I/O error.

## How it imitates Chrome

**1️⃣ Rules.** [`SPEC.md`](SPEC.md) and
[`crates/xeet-core/src/rules/`](crates/xeet-core/src/rules/) mirror the JS X
actually ships ([`rules/x-web.json`](crates/xeet-core/rules/x-web.json)). The
ruleset is `x-web@55591fe0`, and each entry says whether it was read out of X's
shipped client code, measured across 270 captured public payloads, or is still a
prior. Entity extraction (twitter-text's rules, reimplemented and held to its
own 2,119-case suite), the UTF-16 `Show more` cut and the `display_text_range`
that decides it — landing mid-emoji moves the boundary to the next code point —
attachment precedence, and the depth-2 nested quote: a self-quote at either hop
is rejected, and so is a preview that would draw two attachments.

**2️⃣ Text & shaping.** [`inline.rs`](crates/xeet-core/src/inline.rs),
[`shape.rs`](crates/xeet-core/src/shape.rs),
[`fonts.rs`](crates/xeet-core/src/fonts.rs),
[`script.rs`](crates/xeet-core/src/script.rs) and
[`linebreak.rs`](crates/xeet-core/src/linebreak.rs) reproduce Blink plus
HarfBuzz to 0 line-break mismatches: `harfrust` shapes each run and converts its
advances the way Blink does, in 16.16 fixed point; Blink's `ScriptRunIterator`
decides the runs, so a bracket that changes script takes the next script's run
and loses the kerning; a per-character CSS `unicode-range` walk picks the face
across X's 28 Chirp woff2 subsets, Arial, Apple Color Emoji and the
symbol/math/Hiragino fallbacks. Breaking is UAX #14 (`icu_segmenter`) with
Blink's `1/64 px` fit arithmetic — a line may end 1/64 px into a hanging space —
and bidi is UAX #9 (`unicode-bidi`) with rule L1 putting trailing whitespace back
at the paragraph level.

**3️⃣ Frame & attachments.** [`frame/`](crates/xeet-core/src/frame/) and
[`cards/`](crates/xeet-core/src/cards/) are CSS flexbox as Blink lays it out:
the two-row header with truncated name and handle, the 40 px avatar (a `10%`
radius on a business account's square), action counts that abbreviate the way X
abbreviates them, CSS `superellipse(2)` squircle media corners, the image
carousel X draws now (one card per image, up to 20, cells clipped at the
right edge as the "there is more" hint), video duration and `"Post video"`
attribution pills, `summary_large_image` and `summary` link cards, one- and
two-level quote cards, and polls.

**4️⃣ Analytic paint & color emoji.**
[`paint/coverage.rs`](crates/xeet-core/src/paint/coverage.rs) replaces
`tiny-skia`'s path AA — four sub-samples per row, 16 coverage levels — with exact
horizontal span overlap over 64 vertical sub-rows per pixel, which lands within
`≤ 4/255` of analytic area on a circle. Glyphs are unhinted
[`skrifa`](crates/xeet-core/src/paint/glyph.rs) outlines quantized to Skia's
`1/4 px` subpixel grid, with the baseline snapped to a whole CSS pixel the way
Blink snaps it. Images scale over a premultiplied mipmap pyramid
([`images.rs`](crates/xeet-core/src/paint/images.rs)). Emoji are Apple `sbix`
PNG strikes ([`emoji.rs`](crates/xeet-core/src/paint/emoji.rs)): `dupe` and
`flip` records are followed, `flip` toggling a horizontal mirror, the em box is
placed at CoreText's `[-0.875em .. +0.125em]` around the alphabetic baseline, and
the strike is resampled with a two-pass premultiplied tent.

## What it handles

These are the details that make a preview look like X rather than almost like
X. Each item links to the code that implements it and, where there is one, the
test that keeps it working.

**Text and layout**

- Blink's line-fitting arithmetic, including its `1/64 px` slack, so a line can
  end 1/64 px into a hanging space, and that space survives in front of a clamped
  `…`. ([`inline.rs`](crates/xeet-core/src/inline.rs),
  [`frame/mod.rs`](crates/xeet-core/src/frame/mod.rs), test
  [`a_trailing_space_stays_in_front_of_the_ellipsis`](crates/xeet-core/src/frame/mod.rs#L1515))
- Right-to-left text: UAX #9 bidi, with rule L1 resetting trailing spaces, and
  script-aware kerning for Arabic and Hebrew.
  ([`inline.rs`](crates/xeet-core/src/inline.rs),
  [`script.rs`](crates/xeet-core/src/script.rs), [gallery](#gallery))
- Engagement counts in `tabular-nums` (`tnum`) and abbreviated the way X
  abbreviates them. ([`shape.rs`](crates/xeet-core/src/shape.rs),
  [`frame/numbers.rs`](crates/xeet-core/src/frame/numbers.rs))

**Emoji and symbols**

- ZWJ, skin-tone, keycap and tag-flag sequences of any length draw as one glyph.
  The right-facing `🏃‍♂️‍➡️` comes from Apple `sbix` `flip` records, mirrored
  horizontally. ([`paint/emoji.rs`](crates/xeet-core/src/paint/emoji.rs),
  [gallery](#gallery))
- VS15 and VS16 choose between text and emoji presentation: `©` in Chirp or
  Arial, `©️` in Apple Color Emoji.
  ([`fonts.rs`](crates/xeet-core/src/fonts.rs))
- The hairline `✓`, ballot boxes, block arrows and chess pieces come from STIX
  Two Math rather than the brush-stroke Noto Sans Symbols 2, matching Chrome.
  ([`tools/sync-upstream.mjs`](tools/sync-upstream.mjs), [gallery](#gallery))
- Kaomoji built from Box Drawing (`┻┳|`, `╯`) and halfwidth katakana (`ﾉ`)
  fall back to Hiragino Sans, while Simplified/Traditional Chinese (`线`, `亿`,
  `视`) and Korean Hangul (`한글`) fall through to SIL OFL Noto Sans SC and KR
  (with `XEET_FONT_DIR` runtime overrides and visible `.notdef` tofu boxes for
  unbundled scripts).
  ([`iconic_posts.rs`](crates/xeet-core/tests/iconic_posts.rs),
  [gallery](#gallery))

**X's client rules**

- Weighted length as the composer counts it: URLs cost 23, out-of-band
  `attachment_url` quotes cost 0, and any emoji sequence costs 2.
  ([`length.rs`](crates/xeet-text/src/length.rs),
  [`emoji.rs`](crates/xeet-text/src/emoji.rs),
  [`rules/mod.rs`](crates/xeet-core/src/rules/mod.rs), tests
  [`weighted_emoji_tweets`](crates/xeet-text/tests/conformance.rs#L609) and
  [`weighted_length_counts_urls_as_23_and_cjk_as_2`](crates/xeet-core/src/rules/textport.rs#L96))
- "Show more" cuts measured in UTF-16 units, with recovery when
  `display_text_range` lands in the middle of a surrogate pair.
  ([`rules/spec.rs`](crates/xeet-core/src/rules/spec.rs), test
  [`a_utf16_range_that_bisects_a_surrogate_rounds_up`](crates/xeet-core/src/rules/tests.rs#L269))
- A trailing status URL becomes a quote, whether it is a `?s=20` share link,
  `/i/status/`, `mobile.twitter.com`, or a shortened `t.co` permalink.
  ([`rules/mod.rs`](crates/xeet-core/src/rules/mod.rs), tests
  [`trailing_quote_url_variants_are_hidden`](crates/xeet-core/src/rules/tests.rs#L938)
  and [`share_sheet_suffixes_still_quote`](crates/xeet-resolve/src/tests.rs#L845))
- Attachment precedence: media, a quote and a poll each win over a link card,
  only the last link with card metadata gets the card, and a dismissed card
  (`tombstone://card`) never falls back to an earlier link. ([`rules/mod.rs`](crates/xeet-core/src/rules/mod.rs), tests
  [`media_beats_a_link_card`](crates/xeet-core/src/rules/tests.rs#L343) and
  [`a_dismissed_card_shows_nothing_and_is_not_inherited`](crates/xeet-core/src/rules/tests.rs#L453))
- Quotes nested two deep, the way X's `H(outer, q1, q2)` decides them: no
  preview for a self-quote or when it would draw two attachments, plus the
  conditional top padding from `p-3 [:first-child+&]:pt-0`.
  ([`rules/mod.rs`](crates/xeet-core/src/rules/mod.rs),
  [`cards/quote.rs`](crates/xeet-core/src/cards/quote.rs), tests
  [`quoting_yourself_hides_the_nested_preview`](crates/xeet-core/src/rules/tests.rs#L849)
  and [`at_most_one_of_the_three_cells_may_render_media`](crates/xeet-core/src/rules/tests.rs#L876))

**Cards, media and the frame**

- A `/status/<id>/video/1` link becomes the post's own video, with the original
  author credited (`Media.sourceAuthor`) in the duration pill.
  ([`attach.rs`](crates/xeet-resolve/src/attach.rs),
  [`cards/media.rs`](crates/xeet-core/src/cards/media.rs), test
  [`a_status_video_url_becomes_post_media_not_a_quote`](crates/xeet-resolve/src/tests.rs#L1313))
- Video durations floored and zero-padded like X's formatter.
  ([`cards/media.rs`](crates/xeet-core/src/cards/media.rs), test
  [`duration_label_matches_the_client_formatter`](crates/xeet-core/src/cards/media.rs#L1030))
- Business accounts get square avatars with `10%` rounding, and their
  `BusinessLabel` affiliation badges.
  ([`frame/mod.rs`](crates/xeet-core/src/frame/mod.rs), test
  [`quoted_header_wraps_affiliate_badge_for_its_depth`](crates/xeet-core/src/cards/quote.rs#L495))
- Card credits read `From merriam-webster.com`, with the leading `www.` removed.
  ([`cards/card.rs`](crates/xeet-core/src/cards/card.rs), test
  [`merriam_webster_cards_strip_leading_www_from_domain_credit`](crates/xeet-core/tests/iconic_posts.rs#L105))
- Each quote's timestamp uses its own timezone offset, measured against the
  outer post's clock. ([`frame/time.rs`](crates/xeet-core/src/frame/time.rs),
  [`cards/time.rs`](crates/xeet-core/src/cards/time.rs), tests
  [`offset_changes_the_calendar_day`](crates/xeet-core/src/frame/time.rs#L373)
  and [`a_quote_without_a_clock_uses_the_outer_posts_now`](crates/xeet-core/src/cards/quote.rs#L645))

**Resolving links safely**

- `t.co` answers `Twitterbot/1.0` with a `301` but browsers with a `200`
  interstitial, so xeet crawls as Twitterbot.
  ([`xeet-resolve/src/lib.rs`](crates/xeet-resolve/src/lib.rs), test
  [`a_t_co_link_becomes_the_card_x_shows`](crates/xeet-resolve/src/tests.rs#L306))
- Redirects are followed by hand, up to 10 hops, including
  `<meta http-equiv="refresh">`, and `robots.txt` rules for the Twitterbot group
  are honored. ([`urlsafety.rs`](crates/xeet-resolve/src/urlsafety.rs), tests
  [`a_meta_refresh_redirect_is_followed`](crates/xeet-resolve/src/tests.rs#L470)
  and [`robots_txt_is_honoured`](crates/xeet-resolve/src/tests.rs#L403))
- SSRF protection: private, loopback and cloud-metadata addresses are refused,
  both as literals and on every DNS hop, including IPv4-mapped, NAT64 and 6to4
  forms. ([`urlsafety.rs`](crates/xeet-resolve/src/urlsafety.rs), tests
  [`refuses_private_addresses`](crates/xeet-resolve/src/urlsafety.rs#L508) and
  [`private_destinations_are_refused`](crates/xeet-resolve/src/tests.rs#L435))
- When X's server render includes the same post more than once, the richest copy
  wins, so `squareAvatar` and affiliation badges aren't lost.
  ([`post.rs`](crates/xeet-resolve/src/post.rs), test
  [`a_slim_ssr_copy_does_not_wipe_the_author_metadata`](crates/xeet-resolve/src/tests.rs#L1194))

**Build**

- The WASM module is built with thin LTO, because LLVM's fat LTO miscompiles
  path spans. ([`tools/ship/build-wasm.mjs`](tools/ship/build-wasm.mjs))

## How the tests work

Every layer is compared against something that is not xeet.

**Text, against Chrome.** [`tools/oracle/text-parity.mjs`](tools/oracle/text-parity.mjs)
lays the same strings out in headless Chrome and in xeet — corpus, fuzz, a 17 px
detail set, emoji, bidi, math-styled letters, whitespace — and reports 0
line-break and 0 height mismatches across 13,440 layouts. The committed golden
([`tests/golden/text.json`](tests/golden/text.json), 1,260 layouts of our own
synthetic strings) lets CI re-check line boxes with no Chrome and no network
([`tools/ship/parity-check.mjs`](tools/ship/parity-check.mjs)), widths inside
`4/64 px`.

**Cards, frame, icons, against X's markup.** [`cards-parity.mjs`](tools/oracle/cards-parity.mjs)
runs 192/192. [`examples/frame_parity.rs`](crates/xeet-core/examples/frame_parity.rs)
compares every box against geometry [`replica.mjs`](tools/oracle/replica.mjs)
captured from X's real markup: 147/147 rows per theme.
[`iconic-parity.mjs`](tools/oracle/iconic-parity.mjs) takes the four posts people
use to break renderers — `@NASAGoddard`'s space field, `@MerriamWebster`'s emoji
radio buttons, `@MerriamWebster`'s `┻┳|` brick wall, and `@pizzahut`'s dancing
figure — at 24/24.

**End to end, against the captured site.** [`tools/ship/e2e.mjs`](tools/ship/e2e.mjs)
renders every post embedded in the captured `x.com` pages and compares it with
Chrome rendering that page: 159/159 in [`tests/golden/e2e.json`](tests/golden/e2e.json),
under a 0.5% analytic pixel budget where the platform allows it (Linux) and 3% on
macOS, where CoreText's stem darkening is a floor no renderer crosses.

**Contracts, text rules, determinism, CI.** `xeet-text` passes all 2,119
`twitter-text` conformance cases and agrees with the extracted X client code on
3,029 more ([`crates/xeet-text/tests/`](crates/xeet-text/tests/)).
[`check-contract.mjs`](tools/ship/check-contract.mjs) keeps the Rust model, the
JSON Schema and the MCP tool definitions in one shape;
[`check-unsafe.mjs`](tools/ship/check-unsafe.mjs) enforces
`#![forbid(unsafe_code)]`; [`golden-stamp.mjs`](tools/ship/golden-stamp.mjs)
rejects a golden that changed without a new oracle stamp;
[`determinism.mjs`](tools/ship/determinism.mjs) finds native and WASM SHA-256
identical on 24/24 cases, across Linux x64, Linux arm64 and macOS. The suite
gates every push to `main` in Vercel CI ([`turbo.json`](turbo.json),
[`tools/ship/vercel-build.mjs`](tools/ship/vercel-build.mjs)), while tagged
releases verify cross-OS determinism across macOS, Linux, Windows and WASM
before publishing via GitHub OIDC Trusted Publishing
([`.github/workflows/release.yml`](.github/workflows/release.yml)).

## License

The source code in this repository is licensed under the
[Apache License 2.0](LICENSE): use it, modify it, and redistribute it, keeping
the license and attribution notices.

X's Chirp and the platform reference fonts in `assets/vendor/fonts/` remain
under their respective upstream terms and are not covered by the Apache-2.0
license above. They are vendored here for CI and parity verification.
Redistribute public binaries only with fonts you are licensed to ship, or with
fonts the host machine supplies.

