---
project: omarchy-a
stars: 159
description: |-
    Experimental Omarchy desktop for Apple A-series devices.
url: https://github.com/OrchardLinux/omarchy-a
---

# Omarchy A

An experimental, [Omarchy](https://omarchy.org/)-inspired desktop for Apple A-series devices. Built on Arch Linux ARM, with Omarchy's look and feel reworked for touch.

Includes a device-aware CLI and release format for installation, diagnostics, and bringing Omarchy A to more hardware.

## Development checkout

This repository is the distribution: desktop, root filesystem and release. The
hardware support and the `orchard` tool live in
[orchard](https://github.com/OrchardLinux/orchard); put its launcher on your PATH
once (see its [README](https://github.com/OrchardLinux/orchard#develop)). Here,
`orchard` runs orchard's newest nightly, whose kernels, m1n1, Pongo and tools this
build then takes as they are. To work against your own orchard checkout, e.g. a
branch with a driver you need, run that checkout's launcher instead
(`../orchard-installer/bin/orchard build`). A gitignored `orchard.local.toml` may
hold your board:

```toml
device = "j71b"
```

`orchard.toml` (its `[release]` table) makes this checkout an orchard distribution:

```sh
orchard build        # every component that changed, then a release in out/releases/dev-DATE-TIME
orchard run          # build, then start that release's recovery on the attached iPad, from RAM
orchard install      # install the last build
orchard python -m unittest discover -s tests
```

`orchard build` runs `tools/build.py`, which keeps each component (desktop,
Labwc, base, loader, …) in `out/components/` and rebuilds it only when its files
change; orchard brings Pongo, the recovery tools and the kernels.
[BUILD.md](BUILD.md) describes the steps one by one.

RAM experiments and device bring-up happen in orchard itself, with its
[examples](https://github.com/OrchardLinux/orchard/tree/main/examples) and
[bring-up guide](https://github.com/OrchardLinux/orchard/blob/main/docs/device-bring-up.md).

## Supported devices

A release covers every device orchard describes: one root image, and
orchard's kernel, device trees and modules for each platform. How well a device
works is orchard's device data, which the installer shows before it changes
anything. Today the iPad 6 Wi-Fi (`iPad7,5`, J71b) is supported, without GPU
acceleration; the others are experimental. See orchard's
[devices](https://github.com/OrchardLinux/orchard/tree/main/devices).

This image uses **tethered boot**: starting Linux after a cold restart requires a host computer running `orchard launch`.

> **Security:** this experimental image logs in as `tablet` automatically at boot. `sudo` asks for the password chosen at install, and the screen lock takes a 6-digit PIN. There is no disk encryption, and the boot ROM exploit used to start Linux gives anyone holding the device full access. Use a dedicated test device; do not store sensitive data on it.

Contributions for additional devices are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Install

Use a computer running **Linux or macOS** with curl, libusb and OpenSSH installed, a USB data cable, and a supported iPad running iPadOS 16 or later. Allow several GB of free host storage for firmware downloads and extraction. You need no Python or other tools: the installer brings its own.

### 1. Back up your iPad

Storage changes can permanently erase data. Back up before continuing.

### 2. Make room for Linux

The installer needs at least 9 GiB that iPadOS doesn't use: free space, or an earlier Linux install to replace. It never resizes iPadOS itself. Skip this step if you already have that.

1. Download and extract [Resize APFS](https://github.com/OrchardLinux/resize-apfs/releases/latest). It uses [palera1n](https://github.com/palera1n/palera1n/releases); the installer below puts palera1n into `~/.local/bin` if you don't have it yet, and stops without changing the iPad when there isn't enough room.
2. Run `./resize-apfs boot` from its extracted folder and follow the prompts.
3. Once iPadOS starts, unlock the iPad and open **Resize APFS** when its icon appears.
4. Choose **Adjust size** and reserve space for Linux.
5. Wait for **Completed and verified** before restarting. Do not interrupt the operation; see the [resize safety instructions](https://github.com/OrchardLinux/resize-apfs#while-resizing) if status becomes unavailable.

### 3. Install Omarchy A

Connect only the target iPad. Enter DFU: hold Home + Power for about 8 seconds, release Power, then keep holding Home for about 10 seconds. The screen should remain black. Then run:

```sh
curl -fsSL https://github.com/OrchardLinux/omarchy-a/releases/latest/download/install.sh | sh
```

The installer of the latest release downloads its own Python and checks it, then the release. Choose where Omarchy A goes, then set a password (for `sudo` and system changes) and a 6-digit PIN (for the lock screen). It boots recovery, writes a boot partition and the system next to iPadOS, adds the device's firmware, and starts Omarchy A, all in one DFU boot. Keep USB connected until it says Omarchy A is starting. On Linux, it installs USB permissions with `sudo`; reconnect the device if it asks.

It also leaves `orchard` in `~/.local/bin` for starting Omarchy A again (below); add that directory to your `PATH` if it isn't. `orchard update` updates it.

### Coming from the previous installer

Installs from the previous installer (one Linux partition, no boot partition) can't be started or converted by this one. The installer offers that partition as a target and says so before erasing it. To keep files, copy them off first: start the old system with the previous CLI release, then copy them over the network (for example with `scp`).

## Start Linux after a restart

Connect the iPad in DFU mode and run:

```sh
orchard launch
```

The bootloader reads the boot entries from the iPad's boot partition and starts the one you choose (or the only one). It works from any computer with Orchard installed: nothing is downloaded, formatted or reinstalled. See [orchard](https://github.com/OrchardLinux/orchard#install-a-system).

## More than an installer

Hardware work before and after installation (recovery boot, device-tree capture, firmware preparation, RAM experiments, bringing up a new device) happens with [orchard](https://github.com/OrchardLinux/orchard) from a checkout; see its [device bring-up guide](https://github.com/OrchardLinux/orchard/blob/main/docs/device-bring-up.md).

## How it works

An iPad cannot boot a Linux installer like a PC boots an ISO. [How Omarchy A gets from DFU to desktop](docs/how-it-works.md) explains the boot path, release format, device runtime, and installation lifecycle.

## Contribute or bring up a device

- **Desktop:** improve touch interaction, the shell, applications, and Omarchy integration here.
- **Hardware and host tooling:** contribute kernel patches, device trees, firmware recipes, runtime support, device adapters, boot transports and installation workflows to [orchard](https://github.com/OrchardLinux/orchard).
- **Create your own remix:** customize the desktop, root filesystem, and image policy using the same release format; [minimal-linux](https://github.com/OrchardLinux/minimal-linux) provides a smaller, Alpine-based example.

See [CONTRIBUTING.md](CONTRIBUTING.md) for bring-up guidance and [BUILD.md](BUILD.md) for image assembly and validation.

## Troubleshooting

See [Troubleshooting](docs/troubleshooting.md) for USB connectivity, diagnostics, and failed installations.

