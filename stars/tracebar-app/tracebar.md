---
project: tracebar
stars: 130
description: |-
    an mtr-like traceroute utility that lives in your MacOS menubar
url: https://github.com/tracebar-app/tracebar
---

# TraceBar

A macOS menubar app that provides continuous graphical traceroute monitoring, like [mtr](https://github.com/traviscross/mtr) but native and always a click away.

**[Website](https://tracebar.app)** · **[Mac App Store](https://apps.apple.com/us/app/tracebar/id6760156527?mt=12)**

![screenshot1](docs/screenshot.png)
![screenshot2](docs/screenshot2.png)
![screenshot3](docs/screenshot3.png)
![screenshot4](docs/screenshot4.png)

## Features

- **Live traceroute** — continuous probing with per-hop latency, loss, and hostname resolution
- **Menubar sparkline** — at-a-glance latency graph right in your menubar
- **Time-normalized heatmap** — scrolling history visualization with multiple color schemes
- **Adaptive probing** — faster updates when the panel is open, slower when idle
- **Configurable** — probe intervals, history window, max hops, DNS resolution, color schemes

## Install

```bash
brew tap tracebar-app/tracebar
brew install --cask tracebar
```

Or download the latest `.dmg` from [Releases](https://github.com/tracebar-app/tracebar/releases).

## Requirements

- macOS 14.6+
- Xcode 15+ (to build from source)

## Building

1. Open `TraceBar/TraceBar.xcodeproj` in Xcode
2. Build and run the **TraceBar** scheme

## Architecture

Single-process sandboxed app. Uses unprivileged `SOCK_DGRAM` ICMP sockets — no root privileges, no helper daemon, works inside App Sandbox.

```
TraceBar.app (SwiftUI, menubar-only, App Sandbox)
  ├── TracerouteViewModel — state management, adaptive probe scheduling
  ├── ICMPEngine — SOCK_DGRAM ICMP, TTL manipulation
  └── Views: SparklineView, TraceroutePanel, HeatmapBar, SettingsView
```

## License

[MIT](LICENSE)

