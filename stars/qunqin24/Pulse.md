---
project: Pulse
stars: 629
description: |-
    Know how much Claude Code, Codex, Cursor, Copilot and 70+ other AI coding tools you have left — a free, open-source macOS monitor on the edge of your screen.
url: https://github.com/qunqin24/Pulse
---

<p align="center">
  <img src="AppIcon/pulse-icon-1024.png" width="112" alt="Pulse">
</p>

<h1 align="center">Pulse</h1>

<p align="center">
  <b>Know how much Claude Code, Codex and Cursor you have left — without opening a single usage page.</b><br>
  A free, open-source macOS monitor that sits on the edge of your screen and shows every AI coding limit at a glance.
</p>

<p align="center">
  <a href="https://github.com/qunqin24/Pulse/releases/latest"><img src="https://img.shields.io/badge/Download-000000?style=for-the-badge&logo=apple&logoColor=white" alt="Download Pulse for macOS"></a>
</p>

<p align="center">
  <a href="https://github.com/qunqin24/Pulse/releases/latest"><img src="https://img.shields.io/github/v/release/qunqin24/Pulse?color=black" alt="Latest release"></a>
  <a href="https://github.com/qunqin24/Pulse/releases"><img src="https://img.shields.io/github/downloads/qunqin24/Pulse/total?color=black" alt="Downloads"></a>
  <a href="https://github.com/qunqin24/Pulse/stargazers"><img src="https://img.shields.io/github/stars/qunqin24/Pulse?color=black" alt="GitHub stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue" alt="Apache 2.0 license"></a>
</p>

<p align="center">
  <sub><b>macOS 14 Sonoma or newer</b> · Apple Silicon & Intel · <b>English</b> · <a href="README.zh-CN.md"><b>简体中文</b></a> · <a href="README.zh-Hant.md"><b>繁體中文</b></a> · <a href="README.ja.md"><b>日本語</b></a> · <a href="README.ko.md"><b>한국어</b></a> · <a href="README.ru.md"><b>Русский</b></a></sub>
</p>

<p align="center">
  <img src="Docs/images/demo.gif" height="400" alt="Pulse floating rail docked against the screen edge">
  &nbsp;&nbsp;
  <img src="Docs/images/panel.png" height="400" alt="Hovering a ring opens a card with every limit and its reset">
</p>

- **Seventy-seven services at a glance** — Claude Code, Codex, Cursor, GitHub Copilot, Antigravity, Kiro, Grok, DeepSeek, Kimi Code and many more, each as its own ring.
- **No Pulse account, no Pulse server** — it uses the logins you already have, and nothing is sent back.
- **Real numbers only** — every usage percentage is the one the service itself reported. The few estimates are marked as such, and where a service reports nothing, Pulse says so instead of guessing.
- **Native and quiet** — Swift and SwiftUI, Liquid Glass on macOS 26. Dock it left, right, along the top or along the bottom beside the Dock, let it fold to a sliver when idle, or keep it in the menu bar.

**Recently added:** usage in the menu bar with a dashboard for each account and starting usage windows after a reset. [What's new](https://github.com/qunqin24/Pulse/releases/latest).

<p align="center">
  <sub>If Pulse has saved you from a surprise rate limit, a ⭐ helps other people find it.</sub>
</p>

---

## Installation

1. Download the latest **`Pulse-x.y.z.dmg`** from [Releases](https://github.com/qunqin24/Pulse/releases/latest).
2. Open the disk image and drag **Pulse** into your `Applications` folder.
3. On first launch, choose the services to monitor. All start unchecked; Pulse reads their credentials and checks usage only after you click **Done**. Closing the chooser leaves monitoring off; you can also enable a service in Settings. Upgrades keep your choices and ask once about newly supported services detected on your Mac.
4. Pulse lives in the menu bar. If your menu bar is crowded, right-click the floating rail — or the collapsed sliver — and choose **Settings…**; you can also assign a global shortcut for it under **Settings › General › Shortcuts**.

> [!NOTE]
> **macOS Gatekeeper First Launch**:<br>
> Pulse is an open-source project without an Apple Developer certificate. On first launch, macOS may block the app:
> - **Option 1 (GUI)**: Launch Pulse, dismiss the alert, open **System Settings → Privacy & Security**, and click **Open Anyway**.
> - **Option 2 (Terminal)**:
>   ```bash
>   xattr -cr /Applications/Pulse.app
>   ```
>   *Updates are offered in-app through Sparkle. macOS may request browser keychain access again after an update.*

---

## Key Features

### Rings at a glance
- **Colours that follow usage** — green through amber to red, or a colour of your own for each account.
- **Used or left** — `75% used` or `25% left`, with an optional clock arc for how much of the window has passed.
- **Live activity** — a turning dot while an agent is working, and an optional robot (Agent Robot Avatar by CX ArtLab) that reacts to each account.

### Details when you point at a ring
- **Every limit and its reset** on one card, in continuous or segmented bars.
- **Detailed card** — the plan, when it was read, what each limit is worth, and recent usage from this Mac's records.
- **Burn-rate forecast** — tells you when your pace will run out before the window does.
- **In the menu bar** — the fullest ring as a figure, a small ring or split limits, with an optional dashboard.

<p align="center">
  <img src="Docs/images/detailed-card.png" width="620" alt="The same Codex card, compact and detailed">
</p>

### Stays out of the way
- **Any edge** — left, right, top, beside the Dock, or anywhere at all; it folds to a sliver when idle.
- **Notifications you choose** — a limit crossing a line, spent, reset, failing checks, a low balance, a provider outage.
- **Six languages** — English, Simplified and Traditional Chinese, Japanese, Korean and Russian.
- **Optional extras** — global shortcuts, following the active display, hiding from screenshots.

### Spend, status and the rest
- **Token spend** — what 54 local clients have used, priced at public API rates, by day, model and agent, over any span you choose.
- **Estimates in your currency** — dollars, yuan, Hong Kong or New Taiwan dollars, yen, won or roubles.
- **Usage recaps** — shareable cards for a day, a week, a month or a year, built from the same records.
- **Service status** — 44 providers' own status pages, and a notification when one reports an outage.
- **Connection diagnostics** — where each figure came from, and the servers' own replies.
- **For power users** — several accounts per provider, extensions for your own sources, `Pulse --json` for scripts.

<p align="center">
  <img src="Docs/images/spend.webp" height="290" alt="Token spend: total, tokens by kind, and the daily pattern">
  &nbsp;&nbsp;
  <img src="Docs/images/spend-history.webp" height="290" alt="Token spend day by day, by month and by agent">
</p>

**Everything in detail:** [Docs/features.md](Docs/features.md).

---

## Supported Providers & Data Routes

77 services, each read the way the product itself works — its own usage endpoint, the editor's login, a local language server, or a key you paste — and every percentage is the one the service reported. [The full list, and how each is read](Docs/supported-services.md).

---

## Privacy & Security

- **No Pulse account, no Pulse server** — your Mac talks to the services you use, under your own logins.
- **Five kinds of connection, all listed** — those services, their public status pages, [models.dev](https://models.dev) for model prices, [ExchangeRate-API](https://www.exchangerate-api.com) only when you pick a currency other than the dollar, and GitHub/Sparkle for updates.
- **Your keys stay on your Mac**, encrypted, and the usage records Pulse reads never leave it.

[In detail](Docs/features.md#privacy-and-security).

---

## Build from Source

Pulse is built with native Swift and SwiftUI. Building the current sources needs the full **Xcode** (not the Command Line Tools), including the **macOS 26 SDK**; the app runs on **macOS 14+**.

```bash
# Clone the repository
git clone https://github.com/qunqin24/Pulse.git
cd Pulse

# Build the app bundle
./Scripts/bundle.sh

# Launch it
open build.noindex/Pulse.app
```

`swift run Pulse` is a quick way to build and run without a bundle, but notifications and in-app updates only work from the bundled app. See [Docs/build-from-source.md](Docs/build-from-source.md) for toolchain setup. Shipping a release: [Docs/releasing.md](Docs/releasing.md).

---

## Contributing

How the repo is documented, what must not regress, and how to update the right page: [CONTRIBUTING.md](CONTRIBUTING.md). Map of topic docs: [Docs/README.md](Docs/README.md).

---

## Design Attribution

Pulse was inspired by a UI concept shared by [**Vinz** (@hivinz_)](https://x.com/hivinz_/status/2092996055248126353) on X in August 2026. Pulse is an independent implementation with its own interactions, functionality, animations, and visual details. Vinz is not affiliated with or responsible for Pulse.

---

## Support Pulse

<p align="center">
  <sub>Pulse is free and open source, built in spare time.<br>If it saved you from a surprise rate limit, you can buy the author a coffee — every cup keeps the rings spinning.</sub>
</p>

<p align="center">
  <a href="https://afdian.com/a/qunqin"><img src="https://img.shields.io/badge/Afdian-Buy_me_a_coffee-946CE6?style=for-the-badge" alt="Support Pulse on Afdian"></a>
</p>

---

## License

Licensed under [Apache 2.0](LICENSE). Bundled third-party assets retain their respective licenses; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

---

## Star History

<a href="https://star-history.com/#qunqin24/Pulse&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=qunqin24/Pulse&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=qunqin24/Pulse&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=qunqin24/Pulse&type=Date" />
  </picture>
</a>

