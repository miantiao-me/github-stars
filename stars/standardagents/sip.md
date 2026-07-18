---
project: sip
stars: 180
description: |-
    Small Image Processor - Ultra memory-efficient image processing for Cloudflare Workers 🟠
url: https://github.com/standardagents/sip
---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/standardagents/sip/main/docs/public/sip-logo-light.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/standardagents/sip/main/docs/public/sip-logo.svg" />
  <img alt="sip" src="https://raw.githubusercontent.com/standardagents/sip/main/docs/public/sip-logo.svg" width="400" />
</picture>

# @standardagents/sip

Ultra low memory WASM image processing for Cloudflare Workers.

[![npm](https://img.shields.io/npm/v/@standardagents/sip?style=flat-square)](https://www.npmjs.com/package/@standardagents/sip)
[![License](https://img.shields.io/npm/l/@standardagents/sip?style=flat-square)](./LICENSE)

sip resizes images inside Cloudflare Workers without blowing the 128 MB memory limit. It decodes one row at a time using WASM (libjpeg-turbo + libspng), so a 25 megapixel photo never needs to be fully buffered in memory.

<a href="https://sip.standardagents.ai"><img src="https://img.shields.io/badge/%E2%86%92_Read_the_docs-sip.standardagents.ai-000?style=for-the-badge&labelColor=111&color=222" alt="Read the docs" /></a>

## Install

```bash
pnpm add @standardagents/sip
```

## Quick start

```typescript
import { ready, inspect, transform, toResponse } from '@standardagents/sip'

export default {
  async fetch(request: Request) {
    await ready()

    const { source } = await inspect(request)
    return toResponse(transform(source, {
      width: 1024,
      height: 1024,
      quality: 82,
    }))
  },
}
```

That's a complete Worker. It reads the uploaded image, resizes it, and streams back a JPEG.

## API

| Function | Description |
|----------|-------------|
| `ready()` | Load the WASM module. Call once per isolate. |
| `inspect(input)` | Read format, dimensions, and alpha from headers. Returns `{ info, source }`. |
| `transform(input, opts?)` | One-shot decode + resize + JPEG encode. Returns an `EncodedImage`. |
| `decode(input)` | Decode to a `PixelStream` (async iterable of scanlines). |
| `resize(stream, opts)` | Resize a `PixelStream` row by row. |
| `encodeJpeg(stream, opts?)` | Encode a `PixelStream` to JPEG chunks. |
| `collect(image)` | Buffer an `EncodedImage` into an `ArrayBuffer` + stats. |
| `toResponse(image, init?)` | Stream an `EncodedImage` into a `Response`. |
| `toReadableStream(image)` | Convert an `EncodedImage` to a `ReadableStream`. |

All functions accept `ByteInput` — any of `Request`, `Response`, `ReadableStream`, `ArrayBuffer`, `Uint8Array`, `Blob`, or `AsyncIterable<Uint8Array>`.

## Format support

| Format | Decoder | Notes |
|--------|---------|-------|
| JPEG | libjpeg-turbo (WASM) | DCT scaling + scanline decode. Best memory profile. |
| PNG | libspng (WASM) | Row-by-row decode. |
| WebP | @jsquash/webp | Full decode — higher memory. |
| AVIF | @jsquash/avif | Full decode — higher memory. |

Output is always JPEG.

## Example Worker

A ready-to-deploy Cloudflare Worker with an upload UI:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/standardagents/sip-worker-example)

[View source](https://github.com/standardagents/sip-worker-example/blob/main/src/index.ts)

## Documentation

Full API reference, interactive demo, and code examples at **[sip.standardagents.ai](https://sip.standardagents.ai)**.

## License

[MIT](./LICENSE) - Standard Agents

