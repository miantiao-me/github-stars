---
project: leancast
stars: 179
description: |-
    Ad-free DLNA / UPnP cast receiver for Android TV · 极简无广告投屏接收器
url: https://github.com/addozhang/leancast
---

# LeanCast

English | [简体中文](README.zh-CN.md)

**[Download APK](https://github.com/addozhang/leancast/releases/latest) · [Website](https://solocraft.app/leancast) · [Supported devices](#supported-devices) · [Report device compatibility](https://github.com/addozhang/leancast/issues/new?template=device-compatibility.yml)**

<p align="center">
  <img src="docs/screenshots/main-en.png?v=2" width="49%" alt="LeanCast TV dashboard" />
  <img src="docs/screenshots/player-osd-en.png?v=2" width="49%" alt="LeanCast playback OSD" />
</p>

A minimal, ad-free **DLNA/UPnP cast receiver** for Android TV. Open any video app
with a cast button (Bilibili, iQiyi, Tencent Video, Youku, Quark, …), pick this
receiver, and the video plays fullscreen with hardware decoding — no ads, no
accounts, no cloud.

```
Phone app --SSDP--> discovers  Phone app --SOAP SetAVTransportURI--> LeanCast
                                                                    |
                                                        ExoPlayer + MediaCodec HW decode
```

## Highlights

- **Standard UPnP AV `MediaRenderer:1`** — SSDP discovery, AVTransport /
  RenderingControl / ConnectionManager SOAP control, and real GENA eventing
  (initial `LastChange` on subscribe, then a notification per state change).
- **Hardware decoding** via Media3/ExoPlayer: HLS (`.m3u8`), progressive MP4,
  Matroska, HTTP-FLV (best effort), HTTP↔HTTPS redirects, cleartext LAN URLs.
- **TV-native controls & OSD**: OK = pause/resume, ◀ ▶ = seek with an
  **escalating fast-forward ladder (10 s → 5 min while held)**, ▼ = cycle
  **playback speed (0.75x / 1.0x / 1.25x / 1.5x / 2.0x)**, ▲ = reveal OSD,
  Back = exit; on-screen HUD with live progress bar, media title, and
  seek/speed feedback in English or Chinese.
- **Lean & private**: lighter than the stock TV launcher (see below); zero
  analytics, zero non-LAN network calls; pure-Kotlin APK with **no native
  libs** — one artifact runs on `armeabi-v7a`, `arm64-v8a`, `x86`, `x86_64`.
- **Nothing hardcoded**: the cast name defaults to `LeanCast` and is
  user-renamable; UUID is derived from the device id, so it survives reboots
  **and reinstalls**; UI language switchable between
  简体中文 and English.
- Tested on an Amazon Fire TV (Fire OS 7 / Android 9, 32-bit MTK SoC) with
  `minSdk 21` / `targetSdk 28`.

## Supported devices

LeanCast is a pure-Kotlin APK with **no native libraries** and `minSdk 21`
(Android 5.0, 2014), so a single artifact covers `armeabi-v7a`, `arm64-v8a`,
`x86` and `x86_64`. Decoding uses each device's platform `MediaCodec`, so codec
coverage follows the device: H.264 everywhere, HEVC/4K on 2016+ TVs, AV1 only
on newer boxes.

| Tier | Devices | Notes |
| :--- | :--- | :--- |
| ✅ Tested hardware | Amazon Fire TV (see verified-device list below) | Primary test device: Fire OS 7.7, 32-bit MTK SoC; other models need individual reports |
| ✅ Expected | Certified Android TV / Google TV (Sony, TCL, Philips, Chromecast w/ Google TV), NVIDIA Shield, Amlogic / Rockchip boxes, Xiaomi international boxes | Sideload and go |
| ⚠️ Experimental | CN smart TVs with sideloading (MIUI TV / PatchWall, Coocaa, Hisense Android models), Tmall boxes (YunOS) | Enable "unknown sources"; report results via the compatibility issue template |
| ❌ Unsupported | Samsung (Tizen), LG (webOS), Huawei Vision (HarmonyOS), non-smart TVs | No Android app runtime — use any TV box from the ✅ tiers |

Notes:
- Phone "system cast" (Miracast) is out of scope — LeanCast is a DLNA/UPnP
  receiver, so use the `[TV]` button inside video apps.
- Brand alone does not establish compatibility: operating systems vary by model and region. Native Tizen, webOS, Roku OS, VIDAA and other non-Android systems cannot run this APK; an external Android TV box can be used instead.

### Verified devices

These are specific developer or community test reports, not guarantees for every model from a brand. Unreported versions are left unknown; testing a feature does not imply every feature or sender app was tested.

| Brand / model | OS / firmware | Android | LeanCast tested | Test scope | Report / contributor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Amazon Fire TV (exact model not recorded) | Fire OS 7.7 | 9 | Version not recorded | Developer playback / resource-usage testing | [@addozhang](https://github.com/addozhang) |
| Sony KD-55X9000H | Android TV; firmware not reported | Not reported | 0.2.5 / 0.2.6; speed branch `11ff197` | iQiyi / Youku casting reported; speed build tested successfully | [Issue #1](https://github.com/addozhang/leancast/issues/1), [@LabiKyo](https://github.com/LabiKyo) |

**Does LeanCast work on your TV, box or projector?** [Submit a device compatibility report](https://github.com/addozhang/leancast/issues/new?template=device-compatibility.yml). The bilingual form includes major brands and OS families; unknown firmware / Android versions are optional, and unsuccessful results are welcome too. If you use an external box, report the box running LeanCast. Reviewed reports will be added here with contributor credit.

## Install & use

1. Download the latest `LeanCast-<version>.apk` from [GitHub Releases](https://github.com/addozhang/leancast/releases/latest); building from source is optional.
2. Allow installation from unknown sources on your TV / box, install the APK, and open LeanCast.
3. Connect your phone and receiver to the same LAN. Tap `[TV]` inside a video app and select LeanCast.

You can rename the receiver, switch UI language, and enable **Start on boot** in the app.

### Remote controls

| Key | Action |
| :--- | :--- |
| OK | Pause / resume |
| Left / Right | Seek on VOD; hold for escalating steps (10 s → 5 min) |
| Down | Cycle VOD speed: 1.0x → 1.25x → 1.5x → 2.0x → 0.75x → 1.0x |
| Up | Reveal time / progress without changing playback |
| Back | Stop and exit playback |

Seeking and speed changes are disabled on live streams. Each new cast resets speed to 1.0x.

### Optional: install via ADB

Enable network debugging on the receiver, then run on your computer (use the port shown by your device):

```bash
adb connect <TV-IP>:5555
adb install -r LeanCast-<version>.apk
adb shell am start -n io.leancast/io.leancast.app.MainActivity
```

## Resource usage

Measured on the primary test device (Fire TV, 1.6 GB RAM); idle = receiver
waiting on the dashboard:

| State | RAM (PSS) | CPU | Storage |
| :--- | :--- | :--- | :--- |
| Idle / waiting | 63–72 MB (≈ 33 MB private) | ≈ 0% | 5 MB APK + < 0.1 MB data |
| Casting 1080p | ≈ 74 MB | ~4–5% of total (decode is hardware) | — |

Lighter than the stock Fire TV launcher (83 MB PSS) on the same device.

## Build

Requirements: JDK 17+, Android SDK (platform 34). Then:

```bash
./gradlew assembleDebug
# app/build/outputs/apk/debug/app-debug.apk
```

## Project layout

```
domain/          Pure-Kotlin protocol core (JVM-unit-tested, 90 tests)
  ssdp/          M-SEARCH parsing, target matching, USN, alive/byebye, MX delays
  upnp/          Device description + SCPDs, SOAP parser (prefix-tolerant DIDL),
                 response envelopes & faults, H:MM:SS time math, SOAP router
  cast/          AVTransport state machine, player port, volume math
app/             Android shell (thin adapters, E2E-verified on device)
  ControlServer  Minimal HTTP/1.1 server: /desc.xml, /scpd/*, /ctl/*, /evt/*
  SsdpAgent      Multicast UDP listener + advertiser (MulticastLock held)
  ExoPlayerPort  PlayerPort adapter (main-thread marshalled, cached position)
  ReceiverService Foreground service assembling everything
tools/
  e2e_control_point.py  Scripted UPnP control point for device E2E runs
openspec/        Spec-driven development artifacts (proposal/specs/design/tasks)
```

Development follows **OpenSpec** (`openspec/`) with strict TDD: every spec
scenario maps to unit tests in `domain`; run them with `./gradlew :domain:test`.
End-to-end verification drives a real device from a dev box:

```bash
python3 tools/e2e_control_point.py http://<lan-host>/video.mp4
```

## Releases & CI

Two GitHub Actions workflows ship with the repo:

- **CI** (`.github/workflows/ci.yml`) — runs domain unit tests + debug build on
  every push to `main` and every PR; uploads the debug APK as an artifact.
- **Release** (`.github/workflows/release.yml`) — triggered by pushing a `v*`
  tag (or manually via *workflow_dispatch*). Builds the release APK, runs the
  unit tests, creates a GitHub Release with auto-generated notes, and attaches
  `LeanCast-<version>.apk`.

To publish a release:

```bash
git tag v0.2.0
git push origin v0.2.0
```

### Release signing

By default the release APK falls back to the debug keystore (fine for personal
sideloading). For a stable release signature across builds, add these
repository secrets (**Settings → Secrets and variables → Actions**):

| Secret | Value |
| :--- | :--- |
| `KEYSTORE_BASE64` | `base64 -i release.keystore \| pbcopy` (or `base64 -w0` on Linux) |
| `KEYSTORE_PASSWORD` | Keystore password |
| `KEY_ALIAS` | Key alias |
| `KEY_PASSWORD` | Key password |

The workflow decodes the keystore to `ci-release.keystore` (git-ignored) and
signs with it. Generate a keystore once with:

```bash
keytool -genkeypair -v -keystore release.keystore -alias leancast \
  -keyalg RSA -keysize 2048 -validity 10000
```

## License

Apache-2.0. Dependencies: Media3 (Apache-2.0).

