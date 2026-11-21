---
project: metrix-bar
stars: 19
description: |-
    Custom Metrix.Bar dashboards
url: https://github.com/baranwang/metrix-bar
---

# Metrix.Bar Dashboards

Custom [Metrix.Bar](https://metrix.bar/) native menu bar and system tray dashboards.

## Dashboards

| Dashboard | Directory | Description |
| :--- | :--- | :--- |
| **[Komari](./komari)** | `komari/komari.bar` | Multi-server status, real-time bandwidth, traffic quota, and historical load & ping trends for [Komari](https://komari-document.pages.dev/). |
| **[Tokens](./tokens)** | `tokens/tokens.bar` | AI coding token usage, daily spend, private account connection, desktop widgets in three sizes, shareable daily statements, and multi-device submissions for [Tokens](https://tokens.ci/). |
| **[黄历 (Tungshing)](./tungshing)** | `tungshing/tungshing.bar` | Chinese lunar calendar, daily and hourly almanac, festivals, solar terms, and a moon-phase menu bar icon. |

## Installation

### Option 1: Add Registry in Metrix.Bar

Add the following Registry URL in **Metrix.Bar → Settings → Registries**:

```text
https://raw.githubusercontent.com/baranwang/metrix-bar/main/index.json
```

Or open via URI scheme:

```text
metrixbar://registry/add?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbaranwang%2Fmetrix-bar%2Fmain%2Findex.json
```

### Option 2: Direct Import

Import `komari.bar` directly:

```text
metrixbar://install?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbaranwang%2Fmetrix-bar%2Fmain%2Fkomari%2Fkomari.bar&sha256=b2f3ef640a1c35b6a322178423c8f03c19d4f1bb98e07fb5dfb3c3457b9fcf18
```

Import `tokens.bar` directly:

```text
metrixbar://install?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbaranwang%2Fmetrix-bar%2Fmain%2Ftokens%2Ftokens.bar&sha256=253bac972d1698ce096fb477f42be6b92dbd50cfe8da66969ccea2ee0e433942
```

Import `tungshing.bar` directly:

```text
metrixbar://install?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbaranwang%2Fmetrix-bar%2Fmain%2Ftungshing%2Ftungshing.bar&sha256=d143b12970c3df03b1e71f123cf64f7cc0c06879464aa0cd22d14c71840d5fd9
```

