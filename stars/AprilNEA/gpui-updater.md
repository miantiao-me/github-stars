---
project: gpui-updater
stars: 25
description: |-
    Cross-platform self-update for GPUI desktop apps, hosted on GitHub Releases.
url: https://github.com/AprilNEA/gpui-updater
---

# gpui-updater

[![crates.io](https://img.shields.io/crates/v/gpui-updater.svg)](https://crates.io/crates/gpui-updater)
[![docs.rs](https://img.shields.io/docsrs/gpui-updater-core)](https://docs.rs/gpui-updater-core)
[![CI](https://github.com/AprilNEA/gpui-updater/actions/workflows/ci.yml/badge.svg)](https://github.com/AprilNEA/gpui-updater/actions/workflows/ci.yml)

Cross-platform self-update for [GPUI] desktop apps, hosted on GitHub Releases,
static JSON manifests, or [Sparkle] appcasts, and on macOS optionally driven
by Sparkle itself.

GPUI ships no updater of its own, and Zed's `auto_update` crate is GPL-licensed
and wired to Zed's private update server. `gpui-updater` is an independent,
MIT/Apache implementation of the same idea: check a release source, download
the platform artifact, verify it, and swap it into place.

## Features

| Feature | What it does | Guide |
| --- | --- | --- |
| Update sources | GitHub Releases, static JSON manifests on S3, R2, or any CDN, and Sparkle or WinSparkle appcasts. A fallback source tries a second host; implement `UpdateSource` for your own service. | [`source`][source] |
| Verification | Size, SHA-256, [minisign] and Sparkle Ed25519 signatures, version-bound signatures, key rotation, and signed manifests that expire. On macOS, the bundle version and code-signing team; on Windows, the Authenticode publisher. | [`verify`][verify] |
| Downloads | HTTPS only, into a private directory. Retries resume with HTTP `Range`, a verified earlier download is reused, and a download can be cancelled. Proxies and request headers are configurable. | [Retries][retries], [proxies][proxies] |
| Delta updates | Optional `delta` feature: per-file bsdiff deltas, chained across releases, with a fallback to the full download. On OpenLogi's macOS releases, a delta was 7–12% of the full download. | [`delta`][delta] |
| Install | macOS `.dmg`; Linux `.tar.gz`, app directories, and AppImages; Windows bare `.exe` and `.msi`. | [`install`][install] |
| Location and ownership | Rejects App Translocation, read-only, and unwritable install locations before downloading, and detects installs that Homebrew, apt, Flatpak, Snap, Nix, Scoop, winget, or an app store owns. | [Location][location], [ownership][ownership] |
| Errors | Every failure carries an `ErrorKind`, so the app can choose what to tell the user. | [`ErrorKind`][errorkind] |
| GPUI entity | An observable `Entity<Updater>` that runs the work on the background executor. There is no background polling: the app triggers each check. | [`gpui_updater`][adapter] |
| Sparkle driver | Hands the whole macOS flow to Sparkle 2, behind the same entity and status. | [`gpui_updater_sparkle`][sparkle-docs] |
| Release tooling | For release CI: writes `latest.json` and Sparkle appcasts with `<sparkle:deltas>`, signs with minisign and Sparkle Ed25519, embeds and signs `Sparkle.framework`, and makes verified Sparkle and native deltas. A library and a CLI. | [`gpui-updater-release`][release-docs] |

## Crates

| Crate | Use it for | Rust |
| --- | --- | --- |
| [`gpui-updater-core`][core] | The blocking engine, without GPUI | 1.85 |
| [`gpui-updater`][adapter] | Apps on registry `gpui` `^0.2.2` | 1.98 |
| [`gpui-updater-pre`][adapter-pre] | Apps on `gpui-pre` `^0.3.4` | 1.98 |
| [`gpui-updater-sparkle`][sparkle-docs] | Sparkle 2 on macOS, next to either adapter | 1.85 |
| [`gpui-updater-release`][release-docs] | Release CI: feeds, signatures, Sparkle bundling, deltas; not an app dependency | 1.85 |

The core and the two adapters are alternatives, not dependencies to combine;
`gpui-updater-sparkle` is additive. Both adapters re-export the entire core
API, and only the adapters export `Updater`. The Rust versions are tested
support floors (1.85.0 and 1.98.1), not a claim that older compilers fail.

## Installation

```toml
[dependencies]
# Core only (blocking engine, no GPUI):
gpui-updater-core = "0.4"

# OR official GPUI (Entity<Updater>):
gpui = "0.2.2"
gpui-updater = "0.4"

# OR gpui-pre (keep existing gpui_updater imports via an alias):
gpui = { package = "gpui-pre", version = "0.3.4" }
gpui-updater = { package = "gpui-updater-pre", version = "0.4" }

# Optional, next to either adapter: hand the macOS flow to Sparkle 2.
gpui-updater-sparkle = "0.4"
```

Add `features = ["delta"]` to the core or adapter dependency for delta
updates. Without the alias, pre imports use `gpui_updater_pre`.

The release side is a separate tool for CI:

```bash
cargo install gpui-updater-release --features cli,delta --locked
```

## Quick start

In a GPUI app, build the entity once, observe it, and drive it from a button:

```rust
use gpui_updater::{EngineConfig, GitHubSource, UpdateStatus, Updater, Version};

let updater = cx.new(|cx| {
    Updater::new(
        GitHubSource::new("AprilNEA", "OpenLogi")
            .asset_contains("macos")
            .asset_contains(".dmg")
            .with_checksums("SHA256SUMS"),
        EngineConfig::new(Version::parse(env!("CARGO_PKG_VERSION")).unwrap()),
        cx,
    )
});
cx.observe(&updater, |_, _, cx| cx.notify()).detach();

// In the "Check for updates" button handler:
updater.update(cx, |updater, cx| match updater.status() {
    UpdateStatus::Available(_) => updater.download_and_install(cx),
    UpdateStatus::Downloading { .. } => updater.cancel(cx),
    UpdateStatus::Staged(_) => updater.restart(cx),
    _ => updater.check(cx),
});
```

Without GPUI, the core runs the same steps as blocking calls:

```rust
use gpui_updater_core::{EngineConfig, GitHubSource, UpdateEngine, Version};

let engine = UpdateEngine::new(
    GitHubSource::new("AprilNEA", "OpenLogi").with_checksums("SHA256SUMS"),
    EngineConfig::new(Version::parse(env!("CARGO_PKG_VERSION"))?),
);
if let Some(release) = engine.check()? {
    let artifact = engine.download(&release, |done, total| { /* progress */ })?;
    engine.install(&artifact)?;
}
```

The [`gpui_updater`][adapter] documentation covers status values, errors,
cancelling, and the Sparkle driver. The [`gpui_updater_core`][core]
documentation lists a guide for each topic.

## Platform notes

| Platform | Artifacts | Code signature check | Notes |
| --- | --- | --- | --- |
| macOS | `.dmg` | Bundle version and code-signing team | A standard user cannot replace an app in `/Applications`; the engine reports `ErrorKind::Permission` before downloading. Sparkle's installer handles this case. |
| Linux | `.tar.gz`, app directories, `.AppImage` | None: sign the artifacts | Set `EngineConfig::install_root` for an app directory. |
| Windows | bare `.exe`, `.msi` | Authenticode publisher | Call `UpdateEngine::remove_leftovers` at startup. Deltas apply to bare `.exe` releases only; `.msi` releases take the full download. |

The [`install`][install] guide has the details. The adapters need their GPUI
backend's native toolchain, including Xcode and Metal on macOS; the core
needs neither GPUI nor a graphics toolchain.

Known issue: on Linux with registry `gpui` 0.2.2, libc 0.2.190 removed
`ENOATTR`, which breaks `xattr` 0.2.3 (pulled in by `gpui_http_client` →
`zed-async-tar`). If a fresh lockfile picks that libc, hold it back with
`cargo update -p libc --precise 0.2.189`. `gpui-pre` is not affected.

## Upgrading

[MIGRATING.md](MIGRATING.md) lists the breaking changes of each release:
[from 0.3](MIGRATING.md#migrating-from-03),
[from 0.2](MIGRATING.md#migrating-from-02),
[from 0.1](MIGRATING.md#migrating-from-01), and
[from 0.0.x](MIGRATING.md#migrating-from-00x). The
[releases page](https://github.com/AprilNEA/gpui-updater/releases) lists
what each release adds.

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md) lists the checks to run, the release
order, and where documentation lives.

## License

Licensed under either of

- Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE))
- MIT license ([LICENSE-MIT](LICENSE-MIT))

at your option.

[GPUI]: https://www.gpui.rs/
[Sparkle]: https://sparkle-project.org
[minisign]: https://jedisct1.github.io/minisign/
[core]: https://docs.rs/gpui-updater-core/latest/gpui_updater_core/
[source]: https://docs.rs/gpui-updater-core/latest/gpui_updater_core/source/index.html
[proxies]: https://docs.rs/gpui-updater-core/latest/gpui_updater_core/source/index.html#proxies-and-request-headers
[verify]: https://docs.rs/gpui-updater-core/latest/gpui_updater_core/verify/index.html
[retries]: https://docs.rs/gpui-updater-core/latest/gpui_updater_core/verify/index.html#retries-and-resuming
[delta]: https://docs.rs/gpui-updater-core/latest/gpui_updater_core/delta/index.html
[install]: https://docs.rs/gpui-updater-core/latest/gpui_updater_core/install/index.html
[location]: https://docs.rs/gpui-updater-core/latest/gpui_updater_core/install/index.html#install-location
[ownership]: https://docs.rs/gpui-updater-core/latest/gpui_updater_core/install/index.html#installs-a-package-manager-owns
[errorkind]: https://docs.rs/gpui-updater-core/latest/gpui_updater_core/enum.ErrorKind.html
[adapter]: https://docs.rs/gpui-updater/latest/gpui_updater/
[adapter-pre]: https://docs.rs/gpui-updater-pre/latest/gpui_updater_pre/
[sparkle-docs]: https://docs.rs/gpui-updater-sparkle/latest/gpui_updater_sparkle/
[release-docs]: https://github.com/AprilNEA/gpui-updater/tree/master/crates/gpui-updater-release

