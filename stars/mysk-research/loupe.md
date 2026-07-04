---
project: loupe
stars: 1372
description: |-
    A privacy-focused iOS app that raises awareness about what native apps can see
url: https://github.com/mysk-research/loupe
---

<p align="center">
  <img src="docs/images/loupe-icon.png" alt="Loupe" width="120">
</p>

# Loupe

Loupe is an iOS and iPadOS app that gives you a hands-on tour of the device fingerprinting surface. It reads real values from public iOS APIs, the same ones any third-party app can call, and shows them to you raw. The point is simple: see what your iPhone quietly exposes, and why each reading helps an app recognize you again.

Trackers don't need your name, email, or location to recognize you online. Each reading isn't necessarily unique on its own, but together they form a fingerprint that follows you across apps and websites.

<p align="center">
  <a href="https://apps.apple.com/app/id6766152470"><img src="docs/images/app-store-badge.svg" alt="Download Loupe on the App Store" height="48"></a>
</p>

<p align="center">
  <img src="docs/images/iphone-1.png" alt="Loupe screenshot showing the passive signal category" width="200">
  <img src="docs/images/iphone-2.png" alt="Loupe screenshot showing the needs permission signal category" width="200">
  <img src="docs/images/iphone-3.png" alt="Loupe screenshot showing some highlights from what apps can see" width="200">
</p>

## How signals are organized

Loupe groups every reading into three tiers, reflecting the cost of access:

- **Passive** — visible to any app with no prompt at all (locale, time zone, screen, battery, and more).
- **Needs Permission** — readings that trigger an iOS prompt (contacts, photos, location, calendars).
- **Advanced** — clever side-channel uses of public APIs, such as URL-scheme probing via `canOpenURL` and Keychain persistence across reinstalls.

## Privacy

Nothing Loupe reads leaves your device unless you explicitly export it. Values are shown raw, without aggregation or hashing. Nothing is uploaded, synced, or shared.

## A note on how this was built

Loupe was written almost entirely by AI coding tools.

## Building

You'll need Xcode 26 or newer.

1. Open `code/Loupe.xcodeproj`.
2. Copy `code/Config/Signing.local.xcconfig.example` to `code/Config/Signing.local.xcconfig` and fill in your own `DEVELOPMENT_TEAM` and bundle identifiers. This file is gitignored and never published.
3. Build and run on a device or simulator.

The project uses Xcode's buildable folders (folder references), so new Swift files are picked up automatically with no need to edit the project file.

### macOS

Loupe also builds for macOS. The Mac version is mostly complete, but a few things still need work before it's polished.

## Support the project

Loupe is free and open source. If it helped you see what apps can quietly learn about your device, the best way to support more work like this is to try [Psylo](https://apps.apple.com/app/psylo-private-browser-proxy/id6741358035), our privacy-first browser for iPhone and iPad. Psylo gives you proxy-backed browsing, isolated tabs, and anti-fingerprinting protections.

You can also read [why we built Psylo](https://mysk.blog/2025/06/17/introducing-psylo/).

## License

The **source code** is released under the [MIT License](LICENSE).

The Loupe name and logo, the app icon, all other images and icons, and the design source files are © Mysk, all rights reserved, and are not covered by the MIT license.

## About

Loupe is made by Mysk.

- [Website](https://mysk.co)
- [Blog](https://mysk.blog)
- [X](https://x.com/mysk_co)
- [Mastodon](https://mastodon.social/@mysk)

