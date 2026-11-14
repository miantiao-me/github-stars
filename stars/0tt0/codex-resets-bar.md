---
project: codex-resets-bar
stars: 2
description: |-
    Single-file Metrix.Bar dashboard that tracks OpenAI Codex quota reset announcements
url: https://github.com/0tt0/codex-resets-bar
---

# Codex Resets Bar

Never miss a Codex quota reset again.

A menu bar dashboard for [Metrix.Bar](https://metrix.bar) that watches OpenAI Codex reset announcements and tells you when one lands. [中文说明](README.zh-CN.md)

## Install

Open a build, then open the downloaded file — Metrix.Bar imports `.bar` files directly.

- **English** — [`codex-resets-en.bar`](https://cdn.jsdelivr.net/gh/0tt0/codex-resets-bar@v0.1.4/codex-resets-en.bar)
- **中文** — [`codex-resets.bar`](https://cdn.jsdmirror.com/gh/0tt0/codex-resets-bar@v0.1.4/codex-resets.bar)

Or paste this into your browser's address bar to import straight from the CDN:

```text
metrixbar://install?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2F0tt0%2Fcodex-resets-bar%40v0.1.4%2Fcodex-resets-en.bar&sha256=85a45e9a0aefd0970abde97604c66049f30784815a85c72614cb6876d83b97c1
```

GitHub strips custom schemes from rendered Markdown, so that link is copyable text rather than a clickable anchor. For the Chinese build, swap `jsdelivr.net` → `jsdmirror.com` and `codex-resets-en.bar` → `codex-resets.bar`.

## What you get

- **How long since the last reset**, in local time or UTC.
- **Regular vs. banked** resets, labelled differently.
- **A four-month calendar** — the rhythm, not just the latest entry.
- **Pace**: resets in 30 days, average interval, days since the last.
- **A notification when a new announcement drops**, and never a stale one on install.
- **One-click screenshot sharing.**

![The Codex Resets panel: latest reset, stats, a four-month calendar and recent announcements](screenshot-en.webp)

## Good to know

It refreshes every 2 minutes; a failed request keeps the last good data and offers Retry. Requests go straight to `codex-resets.com`, so that host must be reachable. Alerts are on by default and can be turned off in dashboard settings.

## Credits & license

Data comes from the public [codex-resets.com](https://codex-resets.com) API. Not affiliated with codex-resets.com or OpenAI.

[Apache-2.0](LICENSE). Vue is loaded from a CDN at startup and stays under MIT. "OpenAI" and "Codex" are trademarks of OpenAI, used only to identify the monitored service.

