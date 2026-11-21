---
project: poki
stars: 1745
description: |-
    Poki uses your iPhone like you do. An open-source agent app that runs on your iPhone, reads the screen, and taps, types and swipes in real apps with your own model account.
url: https://github.com/JosssphZhou/poki
---

<p align="center">
  <a href="https://poki.bot"><img src="docs/images/poki-hero.gif" width="100%" alt="Poki uses your iPhone like you do. An agent that taps, types and swipes on your real iPhone."></a>
</p>

<h3 align="center">Copy this prompt and send it to your coding agent</h3>

```text
Install Poki on my iPhone from https://github.com/JosssphZhou/poki
```

<p align="center"><sub>Connect your iPhone over USB and unlock it first. A free Apple Account works.</sub></p>

<!-- badges:start -->
<p align="center">
  <a href="https://github.com/JosssphZhou/poki/stargazers"><img src="https://img.shields.io/github/stars/JosssphZhou/poki" alt="GitHub stars"></a>
  <a href="https://github.com/JosssphZhou/poki/releases"><img src="https://img.shields.io/badge/Poki_App-0.4.6_Beta-blue" alt="Poki App 0.4.6 Beta"></a>
  <img src="https://img.shields.io/badge/platform-iOS%20%7C%20macOS%20%7C%20Windows-lightgrey" alt="Platform: iOS, macOS and Windows">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0--only-blue" alt="License: AGPL-3.0-only"></a>
</p>
<!-- badges:end -->

<p align="center">
  English | <a href="README.zh-CN.md">简体中文</a> | <a href="README.zh-TW.md">繁體中文</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.es.md">Español</a><br>
  <a href="https://poki.bot">poki.bot</a>
</p>

<p align="center">
  <strong>If Poki is useful to you, click ★ Star to support the project.</strong>
</p>

## What Poki is

Poki is an open-source iPhone agent that operates your entire iPhone for you. The Poki app runs directly on your iPhone, reads the screen, and taps, types, and scrolls inside real apps using your own model account. You choose how it asks for permission; payments, deletions, and Wallet actions always stop for your confirmation.

<p align="center">
  <img src="docs/images/poki-order-demo.gif" width="280" alt="Poki orders on Uber Eats by itself">
</p>

## Why Poki

<p align="center">
  <img src="docs/images/why-1-errands.png" width="32%" alt="Poki's step-by-step plan for ordering beef noodle soup, shown in chat">
  <img src="docs/images/why-2-routines.png" width="32%" alt="Poki in the Dynamic Island while it works in another app">
  <img src="docs/images/why-3-standalone.png" width="32%" alt="Poki asking for approval before a payment: Allow payment?">
</p>

- **Skip multi-app tapping for everyday errands.** Ask Poki in chat, hold the Action Button, or trigger Siri to look things up in the built-in browser, check tomorrow's weather, or create a note. On iPhone Duo, Poki works across two apps side by side in Split View.
- **Run saved skills by tap or by voice.** Launch a saved skill from the home screen instead of repeating the same steps every day, or start a hands-free spoken chat with Talk to Poki while Dynamic Island tracks each step.
- **Automate your real phone without keeping a computer on.** Once installed from a Mac or Windows PC, Poki runs standalone on your iPhone with no computer attached and pauses on the Lock Screen or in Dynamic Island whenever a step needs approval.

## How to use

### Install Poki on your iPhone

1. **Install once from a Mac or Windows PC.** Connect and unlock your iPhone over USB (a free Apple Account works), then tell your coding agent, such as Claude Code or Codex:

   ```text
   Install Poki on my iPhone from https://github.com/JosssphZhou/poki
   ```

   Or download [Poki Setup](https://github.com/JosssphZhou/poki/releases/tag/desktop-v0.2.8) for macOS (`.dmg`) or Windows (`.exe`) and follow the window.
2. **Connect and add your model account.** Accept **Trust**, turn on Developer Mode and Automation Mode when iOS asks, set up an external connection routing `10.7.0.1` back to your iPhone (such as free LocalDevVPN), and sign in with ChatGPT Plus or Pro or paste an API key (Anthropic, OpenAI, Gemini, DeepSeek, OpenRouter, OpenCode Go, or an OpenAI-compatible server).
3. **Run your first task.** Open Poki and send:

   ```text
   Create a new note in Notes titled "Poki Demo" with these three lines: Milk, Eggs, Coffee. Open the note when finished. Leave existing notes unchanged.
   ```

   Open Notes afterward to confirm "Poki Demo" exists with those three lines.

<details>
<summary>Requirements, updating, common questions, and guides</summary>

| | Requirement |
| --- | --- |
| iPhone | iOS 18 or later (iPhone XS, XR, SE 2nd gen or newer; iPadOS 18+ on iPad). Tested on physical iPhones with iOS 27. |
| Computer | Mac with macOS 14+ (Node.js 24+ for agent install) or Windows PC (x64) with Apple Devices or iTunes. |
| Cable and account | USB data cable and an Apple Account. Poki Setup renews free 7-day signatures while open, or sign in inside Poki. |
| Connection | External connection routing `10.7.0.1` back to the iPhone (LocalDevVPN, Karing, or Shadowrocket). |
| Model account | ChatGPT Plus/Pro sign-in, an API key (Anthropic, OpenAI, Gemini, DeepSeek, OpenRouter, OpenCode Go), or an OpenAI-compatible server. |

- Agent installer skill and Poki Setup: [install-poki skill](skills/install-poki/SKILL.md) and [Poki Setup](desktop/README.md)
- Verification, limits, and release channels: [Verification](docs/verification.md) and [Release channels](docs/release-channels.md)
- Earlier computer-driven tools (no longer updated): [Poki MCP and Poki Agent](docs/poki-mcp.md)

</details>

- Full installation, updating, FAQ, known issues, and roadmap: [Poki iPhone App Guide](docs/iphone-guide.md)
- Changelog and version history: [CHANGELOG.md](CHANGELOG.md)

## Community

- **Questions and ideas:** Join [GitHub Discussions](https://github.com/JosssphZhou/poki/discussions).
- **Bugs and requests:** Open an issue in [GitHub Issues](https://github.com/JosssphZhou/poki/issues).
- **Contribute code:** Read [CONTRIBUTING.md](CONTRIBUTING.md).

See all contributors in [CONTRIBUTING.md](CONTRIBUTING.md#contributors).

<br>

<p align="center"><img src="docs/images/poki-icon.png" width="40" height="40" alt="Poki"></p>

<p align="center"><sub>Copyright (c) 2026 Joseph Zhou (周瑟夫) and contributors. Open source under <a href="LICENSE">AGPL-3.0-only</a>. Brand assets are governed by <a href="BRAND.md">BRAND.md</a>. See <a href="docs/iphone-guide.md">Poki iPhone App Guide</a>, <a href="THIRD_PARTY_NOTICES.md">THIRD_PARTY_NOTICES.md</a>, and <a href="docs/iphone-guide.md#disclaimer">Disclaimer</a>.</sub></p>

