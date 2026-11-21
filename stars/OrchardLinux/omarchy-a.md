---
project: omarchy-a
stars: 223
description: |-
    Experimental Omarchy desktop for Apple A-series devices.
url: https://github.com/OrchardLinux/omarchy-a
---

# Omarchy A

An experimental, [Omarchy](https://omarchy.org/)-inspired desktop for Apple A-series devices. Built on Arch Linux ARM, with Omarchy's look and feel reworked for touch.

## Install

You need a Mac or Linux computer, a USB cable, and a [compatible device](https://github.com/OrchardLinux/orchard/blob/main/docs/compatibility.md) (iPad Air 2, iPad 5–7, iPhone 7–X) on iOS or iPadOS 15 or later.

1. **Back up your device.**
2. **Make room for Linux (at least 9 GB):**
   - Install [palera1n 3.0 beta 3](https://github.com/palera1n/palera1n/releases/tag/v3.0.0-beta.3). On a Mac, run `export RA1N_CLI=1 PALERA1N=/Applications/palera1n.app/Contents/MacOS/palera1n` before the next step.
   - Download and unzip [Resize APFS](https://github.com/OrchardLinux/resize-apfs/releases/latest), then run `./resize-apfs boot` in its folder and follow the prompts.
   - When the device has started, open the **Resize APFS** app, choose **Adjust size**, and wait for **Completed and verified**.
3. **Put the device in [DFU mode](https://support.apple.com/en-us/108900)**; the screen stays black.
4. **Install:**
   ```sh
   curl -fsSL https://github.com/OrchardLinux/omarchy-a/releases/latest/download/install.sh | sh
   ```
5. **After a restart**, start it again from your computer: DFU mode, then `orchard launch`.

Update from the device with **Update > Omarchy** in the menu. The Linux storage is not encrypted. For problems, see [Troubleshooting](docs/troubleshooting.md).

## How it works

An iPad cannot boot a Linux installer like a PC boots an ISO. [How Omarchy A gets from DFU to desktop](docs/how-it-works.md) explains the boot path, release format, device runtime, and installation lifecycle.

## Contribute or bring up a device

- **Desktop:** improve touch interaction, the shell, applications, and Omarchy integration here.
- **Hardware and host tooling:** contribute kernel patches, device trees, firmware recipes, runtime support, device adapters, boot transports and installation workflows to [orchard](https://github.com/OrchardLinux/orchard).
- **Create your own remix:** customize the desktop, root filesystem, and image policy using the same release format; [minimal-linux](https://github.com/OrchardLinux/minimal-linux) provides a smaller, Alpine-based example.

See [CONTRIBUTING.md](CONTRIBUTING.md) for bring-up guidance and [BUILD.md](BUILD.md) for image assembly and validation.

## Development

This repository is the distribution: desktop, root filesystem and release. The
hardware support and the `orchard` tool live in
[orchard](https://github.com/OrchardLinux/orchard); put its launcher on your PATH
once (see its [README](https://github.com/OrchardLinux/orchard#develop)). Here,
`orchard` runs orchard's newest nightly, whose kernels, m1n1, Pongo and tools this
build then takes as they are. To work against your own orchard checkout, e.g. a
branch with a driver you need, run that checkout's launcher instead
(`../orchard-installer/bin/orchard build`). To test package changes (Labwc,
wlroots, Mesa, …) before they are published, keep a checkout of
[OrchardLinux/packages](https://github.com/OrchardLinux/packages) beside this one
(`../packages`): `orchard build` then builds every package of the image whose
recipe there differs from the published one, caches it by recipe, installs it in
place of `[orchard]`'s, and prints which packages it built. A checkout elsewhere
is `--packages DIR`. A gitignored `orchard.local.toml` may hold your board and
that choice:

```toml
device = "j71b"
# packages = "../somewhere/packages"   # another checkout; false: published packages only
```

`orchard.toml` (its `[release]` table) makes this checkout an orchard distribution:

```sh
orchard build        # every component that changed, then a release in out/releases/dev-DATE-TIME
orchard run          # build, then start that release's recovery on the attached iPad, from RAM
orchard install      # install the last build
orchard python -m unittest discover -s tests
```

`orchard build` runs `tools/build.py`, which keeps each component (desktop,
base, artwork, …) in `out/components/` and rebuilds it only when its files
change; orchard brings Pongo, the recovery tools and the kernels.
[BUILD.md](BUILD.md) describes the steps one by one.

RAM experiments and device bring-up happen in orchard itself, with its
[examples](https://github.com/OrchardLinux/orchard/tree/main/examples) and
[bring-up guide](https://github.com/OrchardLinux/orchard/blob/main/docs/device-bring-up.md).

## More than an installer

Hardware work before and after installation (recovery boot, device-tree capture, firmware preparation, RAM experiments, bringing up a new device) happens with [orchard](https://github.com/OrchardLinux/orchard) from a checkout; see its [device bring-up guide](https://github.com/OrchardLinux/orchard/blob/main/docs/device-bring-up.md).

## Troubleshooting

See [Troubleshooting](docs/troubleshooting.md) for USB connectivity, diagnostics, and failed installations.

