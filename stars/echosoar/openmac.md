---
project: openmac
stars: 127
description: |-
    OpenMac runs a local HTTP server and provides APIs for image OCR recognition, multilingual translation, web page content retrieval, face and facial location recognition, QR code/barcode recognition in images, and text-to-speech (TTS) capabilities. 
url: https://github.com/echosoar/openmac
---

![logo](./assets/AppIcon128.png)
# OpenMac

OpenMac runs a local HTTP server and provides APIs for image OCR recognition, multilingual translation, web page content retrieval, face and facial location recognition, QR code/barcode recognition in images, and text-to-speech (TTS) capabilities. This service is based on the above functions provided by the native macOS system and is completely free without incurring any additional costs.

OpenMac 运行一个本地 HTTP 服务器，提供图像OCR识别、多语言翻译、网页内容获取、人脸和面部位置识别、图像中的二维码/条形码识别、 文字到语音转换（TTS）能力的 API 接口，该服务基于原生 macOS 系统能力提供的上述功能，完全免费无需消耗额外成本。

## Usage

By default OpenMac listens on `http://localhost:8080`. Every `/api/*` endpoint returns a uniform JSON envelope:

```json
{
  "success": true,
  "timeCost": 42,
  "data": { ... },
  "message": ""
}
```

On error `success` is `false`, `data` is `{}`, and `message` explains why. `timeCost` is the server processing time in milliseconds. Image-input endpoints (`/api/ocr`, `/api/face`, `/api/qrcode`) accept exactly one of `url`, `base64`, or `file`.

### Skill Documentation — `GET /SKILL.md`

```
http://localhost:8080/SKILL.md
```

### OCR / Text Recognition — `POST|GET /api/ocr`

Recognizes text in an image using the Vision framework.

**GET**

```
curl "http://localhost:8080/api/ocr?url=https://example.com/image.png"
```

| Parameter | Required | Description |
|---|---|---|
| `url` | yes | Publicly reachable image URL to analyze. |

**POST**

```bash
curl -X POST "http://localhost:8080/api/ocr" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/image.png"}'
```

Body (exactly one of):

| Field | Type | Description |
|---|---|---|
| `url` | string | Image URL to download. |
| `base64` | string | Base64-encoded image data (`data:` URI prefix allowed). |
| `file` | string | Absolute path to a local image file. |

**Response**

```json
{
  "success": true,
  "timeCost": 42,
  "data": {
    "text": "line 1\nline 2",
    "lines": ["line 1", "line 2"]
  },
  "message": ""
}
```

`data.text` is all recognized text joined by newlines; `data.lines` is the per-line array.

### Translate — `POST|GET /api/translate`

Translates text using the native macOS Translation framework (requires macOS 15+). `from` is optional.

**GET**

```
curl "http://localhost:8080/api/translate?text=Hello,%20world&from=en&to=zh"
```

| Parameter | Required | Description |
|---|---|---|
| `text` | yes | Text to translate. |
| `to` | yes | Target language code (e.g. `zh`, `ja`, `fr`). |
| `from` | no | Source language code; auto-detected when omitted. |

**POST**

```bash
curl -X POST "http://localhost:8080/api/translate" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello, world","from":"en","to":"zh"}'
```

| Field | Type | Required | Description |
|---|---|---|---|
| `text` | string | yes | Text to translate. |
| `to` | string | yes | Target language code. |
| `from` | string | no | Source language code; auto-detected when omitted. |

**Response**

```json
{
  "success": true,
  "timeCost": 88,
  "data": { "text": "你好，世界" },
  "message": ""
}
```

`data.text` holds the translated text.

### Web Content — `POST|GET /api/web-content`

Loads a URL in a headless WebKit `WKWebView` and returns the rendered HTML.

**GET**

```
curl "http://localhost:8080/api/web-content?url=https://example.com&waitUntil=networkidle0&timeout=30000"
```

| Parameter | Required | Description |
|---|---|---|
| `url` | yes | Absolute URL to load. |
| `waitUntil` | no | One of `domcontentloaded` (default), `networkidle0`, `networkidle2`. |
| `timeout` | no | Non-negative milliseconds to wait. Default `30000`. |

**POST**

```bash
curl -X POST "http://localhost:8080/api/web-content" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","gotoOptions":{"waitUntil":"networkidle0","timeout":30000}}'
```

| Field | Type | Required | Description |
|---|---|---|---|
| `url` | string | yes | Absolute URL to load. |
| `gotoOptions.waitUntil` | string | no | `domcontentloaded` / `networkidle0` / `networkidle2`. |
| `gotoOptions.timeout` | number | no | Non-negative milliseconds. Default `30000`. |

**Response**

```json
{
  "success": true,
  "timeCost": 1203,
  "data": { "html": "<!doctype html>..." },
  "message": ""
}
```

`data.html` contains the rendered outer HTML of the document.

### Web Search — `POST|GET /api/search`

Searches all engines enabled in **Config → Web Search Engines** and combines normalized results. Bing, Google, DuckDuckGo, and Brave are enabled by default; Wikipedia (Chinese site) and arXiv can be enabled from the same multi-select menu. OpenMac searches at most three engines at a time, waits up to 10 seconds per engine, and returns up to three results per successful engine. A failure from one engine does not discard results returned by another engine.

**GET**

```bash
curl "http://localhost:8080/api/search?s=Swift%20concurrency"
```

| Parameter | Required | Description |
|---|---|---|
| `s` | yes | Search query. |

**POST**

```bash
curl -X POST "http://localhost:8080/api/search" \
  -H "Content-Type: application/json" \
  -d '{"s":"Swift concurrency"}'
```

| Field | Type | Required | Description |
|---|---|---|---|
| `s` | string | yes | Search query. |

**Response**

```json
{
  "success": true,
  "timeCost": 1450,
  "data": {
    "list": [
      {
        "title": "The Swift Programming Language",
        "description": "Official Swift documentation.",
        "url": "https://www.swift.org/documentation/"
      }
    ]
  },
  "message": ""
}
```

`data.list` is a flattened list of the `{ title, description, url }` results returned by all successful, enabled search engines.

### Face Detection — `POST|GET /api/face`

Detects faces using Vision and returns bounding boxes, facial landmarks, and a feature vector per face. Set `draw=true` to also receive an annotated image.

**GET**

```
curl "http://localhost:8080/api/face?url=https://example.com/photo.jpg&draw=true"
```

| Parameter | Required | Description |
|---|---|---|
| `url` | yes | Publicly reachable image URL to analyze. |
| `draw` | no | `true` to return an annotated image. Default `false`. |

**POST**

```bash
curl -X POST "http://localhost:8080/api/face" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/photo.jpg","draw":true}'
```

Body with exactly one of `url` / `base64` / `file` (same as OCR), plus:

| Field | Type | Required | Description |
|---|---|---|---|
| `draw` | boolean | no | `true` to return an annotated image with bounding boxes (red) and landmarks (blue) drawn on the source image. Default `false`. |

**Response**

```json
{
  "success": true,
  "timeCost": 130,
  "data": {
    "faces": [
      {
        "boundingBox": { "x": 0.31, "y": 0.42, "width": 0.2, "height": 0.27 },
        "roll": 0.05,
        "yaw": -0.12,
        "pitch": 0.0,
        "landmarks": {
          "leftEye": [ { "x": 0.4, "y": 0.6 } ],
          "nose": [ { "x": 0.5, "y": 0.5 } ]
        },
        "featureVector": [0.12, 0.98]
      }
    ],
    "image": "iVBORw0KGgo..."
  },
  "message": ""
}
```

`data.faces` is an array. Coordinates are normalized to `0...1` with the origin at the bottom-left, matching Vision. `featureVector` may be `null` if the feature print could not be generated. When `draw` is `true`, `data.image` is a base64-encoded PNG of the source image with annotations overlaid.

### QR / Barcode — `POST|GET /api/qrcode`

Detects QR codes and barcodes using Vision and returns their decoded payloads and symbologies.

**GET**

```
curl "http://localhost:8080/api/qrcode?url=https://example.com/qr.png"
```

| Parameter | Required | Description |
|---|---|---|
| `url` | yes | Publicly reachable image URL to analyze. |

**POST**

```bash
curl -X POST "http://localhost:8080/api/qrcode" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/qr.png"}'
```

Body with exactly one of `url` / `base64` / `file` (same as OCR).

**Response**

```json
{
  "success": true,
  "timeCost": 35,
  "data": {
    "barcodes": [
      {
        "payload": "https://example.com",
        "symbology": "VNBarcodeSymbologyQR",
        "boundingBox": { "x": 0.1, "y": 0.1, "width": 0.4, "height": 0.4 }
      }
    ]
  },
  "message": ""
}
```

`data.barcodes` is an array. `payload` is the decoded string (may be `null` if undecodable); `symbology` identifies the code type (e.g. `VNBarcodeSymbologyQR`, `VNBarcodeSymbologyEAN13`).

### Text to Speech — `POST|GET /api/tts`

Synthesizes speech from text using `AVSpeechSynthesizer` and returns base64-encoded WAV audio.

**GET**

```
curl "http://localhost:8080/api/tts?text=Hello,%20world&language=en-US"
```

| Parameter | Required | Description |
|---|---|---|
| `text` | yes | Text to speak. |
| `language` | no | BCP-47 language code (e.g. `en-US`, `zh-CN`). |
| `voice` | no | Specific `AVSpeechSynthesisVoice` identifier. |
| `rate` | no | Speech rate (`0.0`–`1.0`). |
| `pitch` | no | Pitch multiplier (`0.5`–`2.0`). |
| `volume` | no | Volume (`0.0`–`1.0`). |

**POST**

```bash
curl -X POST "http://localhost:8080/api/tts" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello, world","language":"en-US"}'
```

| Field | Type | Required | Description |
|---|---|---|---|
| `text` | string | yes | Text to speak. |
| `language` | string | no | BCP-47 language code. |
| `voice` | string | no | `AVSpeechSynthesisVoice` identifier. |
| `rate` | number | no | Speech rate (`0.0`–`1.0`). |
| `pitch` | number | no | Pitch multiplier (`0.5`–`2.0`). |
| `volume` | number | no | Volume (`0.0`–`1.0`). |

**Response**

```json
{
  "success": true,
  "timeCost": 210,
  "data": { "audio": "UklGRi...=" },
  "message": ""
}
```

`data.audio` is a base64-encoded WAV file.

---
by codersoar
