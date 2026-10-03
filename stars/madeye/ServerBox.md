---
project: ServerBox
stars: 213
description: |-
    ServerBox: turn a used Android phone into a Linux server, no root required. Alpine, Arch, Debian, Kali and Ubuntu with an always-on SSH server.
url: https://github.com/madeye/ServerBox
---

# ServerBox

**Turn a used Android phone into a Linux server, no root required.**

An old phone is a small, quiet, low-power computer with a battery backup and Wi-Fi built in.
ServerBox puts a real Linux distribution on it and keeps an SSH server running, so you can use
it like any other box on your network: host services, run scripts and cron jobs, or tinker.

ServerBox is a fork of [UserLAnd](https://github.com/CypherpunkArmory/UserLAnd) by
CypherpunkArmory (UserLAnd Technologies, LLC) and, like UserLAnd, is licensed under the
[GPLv3](LICENSE).

## What it does

- **Linux distributions without root.** Alpine, Arch, Debian, Kali and Ubuntu run in user space
  through [PRoot](https://proot-me.github.io/). Each one is a headless server image with an SSH server,
  an editor and the usual tools. Install and uninstall ServerBox like any other app.
- **SSH out of the box.** Every session runs an SSH server on port 2022. The Sessions tab shows
  how to connect (`ssh -p 2022 <user>@<phone's IP>`), the user and the password. Turn on
  **Settings → Allow SSH from the network** to reach it from other devices, and add your public
  keys (optionally with **Keys only**).
- **Stays up.** Servers keep running with the screen off and after the app is closed: ServerBox
  holds a wake lock and a Wi-Fi lock, restarts a server that dies unexpectedly, and can restart
  your sessions after a reboot (**Start on boot**).
- **Your services start with it.** Executables in `/etc/serverbox/autostart.d` inside the
  distribution run each time its server starts (logs in `/var/log/serverbox-autostart.log`), which is
  the place for databases, web servers and other daemons in guests without a working init.
- **Phone storage.** Shared storage is available at `/sdcard` inside the distribution; ServerBox
  asks for access to a folder the first time a program uses it.
- **Coding agents, ready to go.** The **Claude** and **Codex** apps are Debian with Anthropic's
  [Claude Code](https://www.anthropic.com/claude-code) or OpenAI's
  [Codex CLI](https://github.com/openai/codex) preinstalled, along with Node.js, git and ripgrep.
  SSH in and run `claude` or `codex`; you sign in with your own account or API key. 64-bit phones
  only.
- **Virtual machines where supported.** On phones with the Android Virtualization Framework,
  distributions can also run in a real VM through a companion app.

## Screenshots

| Apps | New filesystem | Server settings |
| :---: | :---: | :---: |
| <img src="docs/screenshots/apps.png" alt="Apps tab listing the Linux distributions and the coding agents" width="240"> | <img src="docs/screenshots/filesystem-edit.png" alt="Creating a filesystem with a user name and password" width="240"> | <img src="docs/screenshots/settings.png" alt="Server settings: start on boot, SSH from the network, authorized keys" width="240"> |

## Download

Get the APK from [Releases](https://github.com/madeye/ServerBox/releases/latest). ServerBox needs
Android 8.0 or later. Every distribution is available for 64-bit ARM (nearly all current phones)
and x86_64; 32-bit support varies by distribution.

Releases are signed with this certificate (SHA-256), which you can check with
`apksigner verify --print-certs serverbox-<version>.apk`:

```
55:40:C1:F2:4F:5D:44:86:C5:96:EF:76:0A:8C:E9:8C:8E:68:FE:45:AF:C9:E9:54:1C:C6:3D:EF:3E:7A:76:B5
```

Builds from before 1.0 were signed with a different key, so Android can't update them to a
release: uninstall the old build first. Uninstalling deletes its distributions and sessions.

## Getting started

1. Install ServerBox and open it.
2. Pick a distribution on the **Apps** tab. ServerBox downloads it (the setup log shows each
   step) and opens a terminal.
3. Open the **Sessions** tab for the SSH command, user and password.
4. To connect from your computer, turn on **Settings → Allow SSH from the network**, then run the
   command shown on the Sessions tab.

### Keeping the server running

Android pauses background apps to save battery, which makes a server stop answering once the
screen is off. When ServerBox first runs a server it asks to be exempted from battery
optimization; allow it. Some vendors add their own restrictions on top:

- **Xiaomi / HyperOS / MIUI:** in ServerBox's app settings, set **Battery saver** to
  **No restrictions** and turn on **Autostart**. The default "smart" restriction cuts off
  background networking.
- **Android 12 and later:** the phantom process killer can stop long-running processes. ServerBox
  offers to turn it off through Wireless debugging (**Settings → Stop Android killing session
  processes**).

Keep the phone on a charger, and consider reserving its IP address in your router so the SSH
address stays the same.

## Building

Builds need JDK 17.

```sh
./gradlew :app:assembleServerBoxDebug
./gradlew testServerBoxDebugUnitTest :terminal:testDebugUnitTest lintServerBoxDebug
```

Instrumented tests (Room migrations and DAOs, the terminal's PTY) run on a connected device or
emulator:

```sh
./gradlew :library:connectedServerBoxDebugAndroidTest :terminal:connectedDebugAndroidTest
```

`./gradlew :app:assembleServerBoxRelease` signs the release APK when a keystore is configured in
`local.properties` (or the same names as environment variables); without one it builds unsigned:

```properties
KEYSTORE_PATH=/path/to/keystore
KEYSTORE_PASSWORD=...
KEY_ALIAS=...
KEY_PASSWORD=...
```

The distribution images are built in [madeye/ServerBox-Images](https://github.com/madeye/ServerBox-Images)
and published to `ghcr.io/madeye/serverbox-<distro>`.

## Credits

ServerBox is forked from [UserLAnd](https://github.com/CypherpunkArmory/UserLAnd) and its
library (UserLAndLibrary) by
CypherpunkArmory (UserLAnd Technologies, LLC), who hold the copyright on the original code.
ServerBox's changes are copyright Max Lv. Like UserLAnd, ServerBox is released under the
GNU General Public License v3; the full text is in [LICENSE](LICENSE) and the copyright
notices are in [COPYRIGHT](COPYRIGHT).

