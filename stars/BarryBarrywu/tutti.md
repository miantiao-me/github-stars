---
project: tutti
stars: 114
description: |-
    Multi-output audio and display control for Mac — one panel for every output, app, and screen.
url: https://github.com/BarryBarrywu/tutti
---

<p align="right">English · <a href="README.zh.md">中文</a></p>

<p align="center"><img src="docs/screenshots/icon.png" width="80" alt="Tutti app icon"></p>
<h1 align="center">Tutti</h1>
<p align="center"><strong>Sound and display control for Mac.</strong><br>Bring your setup together.</p>

<p align="center">
  <a href="https://github.com/BarryBarrywu/tutti/releases/latest/download/Tutti.dmg"><strong>Download for Mac</strong></a> ·
  <a href="https://tutti.barrybarrywu.com/">Website</a> ·
  <a href="https://tutti.barrybarrywu.com/docs/">Documentation</a>
</p>
<p align="center">
  <img src="https://img.shields.io/github/v/release/BarryBarrywu/tutti?style=flat-square&color=blue&label=release" alt="Release">
  <img src="https://img.shields.io/badge/macOS-13.0+-000000?style=flat-square&logo=apple&logoColor=white" alt="macOS 13+">
  <img src="https://img.shields.io/github/downloads/BarryBarrywu/tutti/total?style=flat-square&color=orange&label=downloads" alt="Downloads">
  <img src="https://img.shields.io/badge/Pro-one--time_purchase-38bdf8?style=flat-square" alt="Pro one-time purchase">
</p>
<p align="center"><sub>No virtual audio driver or system extension</sub></p>

<p align="center">
  <img src="docs/screenshots/mac-sound-displays.png" width="780" alt="Tutti 2.0 in light and dark appearance: category navigation, multi-output audio with 6-band output EQ, headphone correction and Audio Unit effects, per-app volume, presets, and display brightness controls">
</p>

## What's new in Tutti 2.0

Existing Pro owners receive 2.0 at no additional charge. [See the full release notes](https://github.com/BarryBarrywu/tutti/releases/tag/v2.0.0).

- **Output processing:** six-band EQ, offline headphone correction profiles and parameter-file import, plus ordered Audio Unit effect chains with plug-in editors and generic controls. Save processing settings and chain order in Presets. Included in existing Pro on macOS 14.4+; per-app EQ stays free. Third-party plug-ins may require their own licenses.
- **Inputs for recording:** mix microphones, eligible virtual inputs and Apps with independent gain and mute, live meters and clipping history. Tutti Mix Input supplies stereo. Tutti Split Input puts the combined App group on channels 1–2 and the combined microphone/input group on channels 3–4. Your compatible recorder assigns tracks and saves the recording. Input Mix requires Pro and macOS 14.4+.
- **A more flexible panel:** Favorites, Audio, Displays and Presets share controls and card order. Customize Output, Input and Display icons; edit saved Preset Output members with session Undo; use improved keyboard and VoiceOver controls.
- **Temporary display disconnection:** disconnect and restore a secondary physical display from its icon. Free on supported Apple Silicon Macs running macOS 15+; the main and last usable display are protected.

[Tutti Remote](https://apps.apple.com/app/tutti-remote/id6788375184) is distributed through the App Store. Version 2.0 brings redesigned navigation and Mac management, refreshed Now Playing, Devices, App Volume and Settings screens, a new app icon, and interactive Home Screen and Lock Screen widgets for a chosen Mac's master or specific Output volume.

## Why Tutti?

### Give each speaker a part

Play through several outputs together, then tune them individually. Send the left channel to one speaker and the right to another, adjust each device's balance, or add delay to faster outputs to match a slower one. Delay tuning cannot make Bluetooth audio arrive sooner.

### Switch your sound and screens together

Save your audio outputs, volumes, app settings, display selection, and brightness as one preset. A movie setup can use your speakers and dimmer screens; a work setup can restore different outputs and brightness. Resolution, refresh rate, and main-display changes remain local manual controls and are not saved in presets.

### Stay in control from the couch

Use [Tutti Remote](https://apps.apple.com/app/tutti-remote/id6788375184) on your iPhone to choose outputs, adjust device and app volume, control music playback, or change display brightness over your local network.

## One panel for everyday controls

- **Outputs & processing:** multi-output playback, per-output six-band EQ, offline headphone correction, and ordered Audio Unit effect chains.
- **Apps:** individual volume, six-band EQ and Turbo boost, with per-app output routing.
- **Inputs & recording:** one-click microphone switching plus Input Mix and Split Input for mixing mics, virtual inputs, and Apps into your recorder.
- **Displays:** individual or grouped brightness, Follow Built-in, resolution, refresh rate, existing HiDPI modes, main-display selection, temporary secondary-display disconnection, and brightness upscaling on eligible screens.
- **The rest of your desk:** Now Playing for Apple Music and Spotify, custom device icons, and Device Guard for preferred audio devices and volume.

See the [full feature list and interactive demo](https://tutti.barrybarrywu.com/).

## Tutti in your day

### From work desk to movie night

Work with headphones and screens set for reading. When it's time for a movie, switch to a preset you've saved to select your speakers, restore their volume, and dim your displays together. Once you're on the couch, adjust volume and brightness from your iPhone.

### Headphones for you, speakers for the lesson

During a lesson or rehearsal, play the same backing track through headphones and speakers: follow the music in your headphones while students practice along with the speakers. Adjust headphone and speaker volume separately. If one output plays ahead of the other, add delay to the faster one, then save your usual setup as a preset.

### Turn down one app, keep the rest as they are

Keep music playing quietly while you work. If a video in your browser is suddenly too loud, turn down the browser in Tutti without changing the music or your Mac's overall volume. Give each app a level that feels right.

### Two speakers, a left and a right

Assign the left channel to the speaker on one side of your desk and the right channel to the other, then adjust their volumes to balance what you hear. If one plays later, add delay to the faster output to align them by ear. Save the combination as a preset.

### Clearer by day, gentler at night

Outdoors or beside a bright window, your screen can be hard to see even at maximum brightness. Enable Brightness Upscaling on an eligible display to make it easier to read. At bedtime with the lights off, the lowest brightness may still feel too bright; Extra Dim can lower supported screens below their normal hardware minimum.

Both adjustments can affect color accuracy; turn them off for color-critical editing.

## Bluetooth synchronization limits

Tutti can compensate for a relatively stable time difference by delaying the faster output. It cannot make a slower Bluetooth speaker play sooner. Some Bluetooth devices may fall out of sync after a track change, pause/resume, reconnection or during continuous playback, even when the saved setting stays the same. If adjustment does not hold, try a wired connection or use one output. Neither restoring a saved setting nor a one-time calibration guarantees ongoing synchronization.

[Bluetooth synchronization limits](https://tutti.barrybarrywu.com/blog/fix-bluetooth-audio-delay-mac/)

## Install

[Download the latest DMG](https://github.com/BarryBarrywu/tutti/releases/latest/download/Tutti.dmg), move Tutti to Applications, and open it. Or install with Homebrew:

```bash
brew install --cask brewforge/extras/tutti
```

Click the menu bar icon and select the outputs you want to use. Select more than one for multi-output playback, then adjust the group volume or each output separately. Tutti checks for updates automatically; [release notes](https://github.com/BarryBarrywu/tutti/releases) describe what's changed.

## Free & Pro

**Free, without a time limit:** multi-output playback, device volume, per-app volume, Turbo and EQ, local display brightness and display-mode controls, and temporary secondary-display disconnection on supported Apple Silicon Macs.

**Pro adds:** presets, per-output six-band EQ, offline headphone correction, Audio Unit effect chains, Input Mix & Split Input for recording, per-app output routing, stereo pairing, per-device balance and latency tuning, global shortcuts, desktop widgets, Raycast control, iPhone remote control, and eligible display brightness upscaling.

Tutti Remote is free to download on iPhone; controlling your Mac requires Tutti Pro on the Mac.

**Black Friday launch price: US$8.99 one-time, including tax, through November 30 (Pacific time).** The regular price is US$19.99 from December 1. Includes a 7-day Pro trial, one active Mac per license, and a 14-day refund policy. When the trial ends, free features keep working. [Compare plans and get Pro](https://tutti.barrybarrywu.com/#pricing).

## Control from anywhere

- **[Tutti Remote for iPhone](https://apps.apple.com/app/tutti-remote/id6788375184)** — control outputs, device and app volume, music playback, and display brightness over your local network.
- **[Raycast](https://www.raycast.com/Barrybarrywu/tutti)** — set volume, mute, or apply a preset.
- **Shortcuts, Siri & Spotlight** — use Tutti actions to switch presets, mute, or set volume in your workflows. See the [setup guide](https://tutti.barrybarrywu.com/docs/).

<details>
<summary><strong>Compare Tutti, SoundSource, FineTune, and BetterDisplay</strong></summary>

Choose by the workflow you need. Tutti combines audio and display controls; the alternatives below also offer capabilities outside Tutti's scope.

| Workflow | Tutti | SoundSource 6 | FineTune | BetterDisplay 5 |
|---|---|---|---|---|
| Multi-output playback | Yes; stereo split, balance and delay tuning | Output groups, including AirPlay | Multi-device routing | Not listed |
| Per-app volume / EQ / routing | Volume + 6-band EQ + routing | Volume + 10-band EQ + routing | Volume + 10-band EQ + routing | Not listed |
| Output processing & effects | 6-band EQ, offline headphone correction, Audio Unit chains | Headphone EQ, Audio Unit effects | AutoEQ headphone correction | Not listed |
| Recording input mixing | Input Mix (stereo) & Split Input (4-ch) | Not listed | Not listed | Not listed |
| Display control | Brightness, existing modes, upscaling, temporary disconnect | Not listed | Not listed | Brightness, flexible HiDPI, virtual screens and more |
| Combined audio + display-brightness presets | Yes | Not listed | Not listed | Not listed |
| Companion iPhone remote | Tutti Remote | Not listed | Not listed | Not listed |
| Other strengths | Sound, effects, recording inputs, and displays in one panel | AirPlay groups; system-wide Audio Unit routing | Open-source | Custom resolutions, virtual displays, PIP and 3D LUTs |
| Installation | No virtual audio driver or system extension | ARK plugin + audio permissions | App + audio capture permission | App installation |

“Not listed” means the cited official documentation does not advertise that workflow; it is not a tested claim that the capability is impossible. This is a documentation comparison, not a performance or hardware-compatibility test. Tutti's system and display requirements still apply.

Tutti capabilities updated for 2.0 on November 21, 2026; third-party columns last checked September 19, 2026: [SoundSource features](https://rogueamoeba.com/soundsource/), [installation requirements](https://rogueamoeba.com/support/manuals/soundsource/?page=Permissions), [FineTune features and setup](https://github.com/ronitsingh10/FineTune#readme), and [BetterDisplay features](https://github.com/waydabber/BetterDisplay#readme).

</details>

## Compatibility & support

| Capability | Requires |
|---|---|
| Multi-output audio and device controls | macOS 13+ |
| Per-app volume, Turbo, EQ and routing | macOS 14.4+ |
| Output processing (EQ, headphone correction, Audio Units) & Input Mix | macOS 14.4+ (Pro) |
| Display controls | macOS 15+; available controls depend on the display and connection |
| Temporary secondary-display disconnection | Apple Silicon Mac, macOS 15+ (Free) |

AirPlay receivers cannot join Tutti's multi-output groups. Bluetooth outputs may need latency tuning; adding delay cannot make a slow output arrive sooner. Keyboard volume- and brightness-key takeover requires Accessibility permission.

Output processing is unavailable in stereo-pairing mode, and shared Audio Unit hosting failures can affect multiple plug-ins and require separate retries. Input Mix recording qualification is currently limited to OBS 33.0.1 with IINA 1.5.0 and Sony ECM-S1 on M2 Max Mac Studio / macOS 27.0.1; Audition and Tencent Meeting remain unqualified, QuickTime may record silence when reopening the same active input, layout changes may require reselecting the input, and continuous recording through sleep is not guaranteed.

Brightness upscaling depends on the display's EDR headroom and connection. It can affect HDR content and color accuracy; Tutti does not detect HDR content or automatically disable gain. Group controls, keys, scrolling, Remote, and automation stay within 100%. Read the [compatibility and setup guide](https://tutti.barrybarrywu.com/docs/#upscaling) before enabling it.

Need help? Read the [documentation](https://tutti.barrybarrywu.com/docs/), [report an issue](https://github.com/BarryBarrywu/tutti/issues), or email [support@barrybarrywu.com](mailto:support@barrybarrywu.com). Follow updates on [Telegram](https://t.me/tuttiapp) or [X](https://x.com/BarryBarrywu).

Tutti is closed-source. This repository hosts downloads, releases, automatic-update metadata, and issue reports. Binaries are distributed under the [EULA](https://tutti.barrybarrywu.com/terms).

The display brightness engine builds on [Crisp](https://github.com/didriksg/Crisp). Thanks to didriksg and its contributors.

