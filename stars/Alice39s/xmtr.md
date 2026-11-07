---
project: xmtr
stars: 45
description: |-
    Meet xmtr, a better alternative to mtr. Run probes against multiple targets in parallel and export clean, easy-to-read MTR visualizations in one-click.
url: https://github.com/Alice39s/xmtr
---

<h1 align="center">xmtr</h1>

<p align="center">
  Trace several targets at once and see every hop on a map.
</p>

<p align="center">
  <a href="https://github.com/Alice39s/xmtr/releases/latest"><img alt="Release" src="https://img.shields.io/github/v/release/Alice39s/xmtr?style=flat-square"></a>
  <a href="https://github.com/Alice39s/xmtr/actions/workflows/release.yml"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/Alice39s/xmtr/release.yml?branch=main&style=flat-square"></a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT%20OR%20Apache--2.0-blue?style=flat-square">
</p>

<p align="center">
  English · <a href="docs/zh-CN.md">简体中文</a> · <a href="docs/zh-TW.md">繁體中文（台灣）</a> · <a href="docs/zh-HK.md">繁體中文（香港）</a> · <a href="docs/zh-MO.md">繁體中文（澳門）</a>
</p>

`xmtr` traces several targets at the same time with [trippy](https://github.com/fujiapple852/trippy), stops each route once its path is stable, and uploads the routes to [xmsl.dev IPMap](https://xmsl.dev/ipmap). IPMap places every hop on a map and replays the route.

https://github.com/user-attachments/assets/b2152647-3396-4f2c-86d4-267c2b11e529

The link at the end of a run opens the map:

https://github.com/user-attachments/assets/b675a8f5-dff1-460a-bb3c-ca7b3e4ff412

## Quick start

```sh
curl -fsSL https://raw.githubusercontent.com/Alice39s/xmtr/main/install.sh | bash
sudo xmtr 1.1.1.1 cloudflare.com
```

The second command traces 1.1.1.1 and cloudflare.com, over IPv4 and IPv6 when the host has both, and prints the routes and an IPMap link. Windows and package managers are covered in [Install](#install), and [Privileges](#privileges) lists who may trace on each system.

## Install

### Install script

**macOS, Linux, FreeBSD, Termux**

```sh
curl -fsSL https://raw.githubusercontent.com/Alice39s/xmtr/main/install.sh | bash
```

The script is POSIX `sh`, so `| sh` works on systems without bash. On OpenWrt, use the [native package repository](docs/openwrt.md). As a regular user it installs into `/usr/local/bin` through `sudo`, so `sudo xmtr` finds the binary; sudo may ask for your password. Without sudo rights it installs into `~/.local/bin`.

**Windows**

```powershell
powershell -c "irm https://raw.githubusercontent.com/Alice39s/xmtr/main/install.ps1|iex"
```

Both scripts pick the build for your system, check it against the release `SHA256SUMS`, and run a small installer that places a single `xmtr` binary and then deletes itself. Nothing else is written, except the user `PATH` entry on Windows. Downloads use HTTPS, unless `XMTR_RELEASES` names an `http://` mirror.

| System | Default location |
| --- | --- |
| Linux, macOS, FreeBSD | `/usr/local/bin`; `~/.local/bin` without sudo rights |
| Termux | `$PREFIX/bin` |
| Windows | `%LOCALAPPDATA%\Programs\xmtr` |

Pass installer options after `bash -s --`:

```sh
curl -fsSL https://raw.githubusercontent.com/Alice39s/xmtr/main/install.sh | bash -s -- --dir ~/bin --version v0.3.6
```

`XMTR_INSTALL_DIR` sets the directory, and `XMTR_RELEASES` points both the script and the installer at a mirror of the releases page. On Windows these two variables are the only way to pass options.

### Package managers

| | Manager | Command |
| :-: | --- | --- |
| <img src=".github/assets/homebrew.svg" width="20" alt=""> | Homebrew (macOS, Linux) | `brew install alice39s/tap/xmtr` |
| <img src=".github/assets/scoop.png" width="20" alt=""> | Scoop (Windows) | `scoop bucket add alice39s https://github.com/Alice39s/scoop-bucket` then `scoop install alice39s/xmtr` |
| <img src=".github/assets/windows.svg" width="20" alt=""> | WinGet (Windows) | `winget install Alice39s.xmtr` |
| <img src=".github/assets/chocolatey.svg" width="20" alt=""> | Chocolatey (Windows) | `choco install xmtr` |
| <img src=".github/assets/npm.svg" width="20" alt=""> | npm | `npm install --global @xmtr/cli`, or `npx @xmtr/cli 1.1.1.1` |
| <img src=".github/assets/pypi.svg" width="20" alt=""> | PyPI | `uv tool install xmtr`, `pipx install xmtr` or `pip install xmtr` |
| <picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/rust-dark.svg"><img src=".github/assets/rust.svg" width="20" alt=""></picture> | Cargo | `cargo binstall xmtr` for the release binary, or `cargo install xmtr` to build it |
| <img src=".github/assets/mise.svg" width="20" alt=""> | mise | `mise use --global github:Alice39s/xmtr` |
| <img src=".github/assets/nixos.svg" width="20" alt=""> | Nix | `nix run github:Alice39s/xmtr -- 1.1.1.1`, or `nix profile install github:Alice39s/xmtr` |
| <img src=".github/assets/docker.svg" width="20" alt=""> | Docker | `docker run --rm ghcr.io/alice39s/xmtr 1.1.1.1` |

The npm package and the PyPI wheels hold the same binaries as the release archives; npm picks the `@xmtr/<platform>` package for your system. The Docker image holds only the static binary and is built for amd64, arm64, armv7, armv6, 386, riscv64 and loong64. Docker grants raw sockets to containers by default; with Podman add `--cap-add NET_RAW`.

### Linux package repositories

The deb, rpm and apk packages install `/usr/bin/xmtr` and grant it raw sockets with `setcap`, so every user can trace without root. They are attached to each release and served from signed repositories:

| | System | Architectures |
| :-: | --- | --- |
| <img src=".github/assets/debian.svg" width="20" alt=""> | Debian, Ubuntu | amd64, arm64, armhf, i386, riscv64, loong64 |
| <img src=".github/assets/fedora.svg" width="20" alt=""> | Fedora, RHEL | x86_64, aarch64, armv7hl, i686, riscv64, loongarch64 |
| <img src=".github/assets/alpinelinux.svg" width="20" alt=""> | Alpine | x86_64, aarch64, armv7, armhf, x86, riscv64, loongarch64 |

```sh
# Debian, Ubuntu
sudo curl -fsSL -o /usr/share/keyrings/xmtr.gpg https://alice39s.github.io/xmtr/xmtr.gpg
echo "deb [signed-by=/usr/share/keyrings/xmtr.gpg] https://alice39s.github.io/xmtr/deb stable main" | sudo tee /etc/apt/sources.list.d/xmtr.list
sudo apt update && sudo apt install xmtr

# Fedora, RHEL
sudo curl -fsSL -o /etc/yum.repos.d/xmtr.repo https://alice39s.github.io/xmtr/rpm/xmtr.repo
sudo dnf install xmtr

# Alpine
wget -qO /etc/apk/keys/xmtr.rsa.pub https://alice39s.github.io/xmtr/apk/xmtr.rsa.pub
echo https://alice39s.github.io/xmtr/apk >> /etc/apk/repositories
apk add xmtr
```

The repositories are signed with the keys in [`packaging/keys`](packaging/keys). The release workflow publishes every channel above except mise and Nix, which read the GitHub release and the flake directly.

### OpenWrt

Native packages are built for OpenWrt 24.10 (`opkg`) and 25.12 (APK v3), covering x86-64, x86 with SSE2, ARM64, ARMv7 hard-float and soft-float, and MIPS 24Kc in both byte orders. The [OpenWrt guide](docs/openwrt.md) lists the exact package architectures, signed feed setup and update commands. Run xmtr as root on OpenWrt.

### Update and uninstall

```sh
xmtr self update              # install the latest release over this binary
xmtr self update --tag v0.3.3 # install a given release instead
xmtr self uninstall           # delete this binary
```

`--force` reinstalls a release that is already installed. Update packages from a package manager or a Linux repository with that manager instead.

After a run in a terminal, xmtr looks up the latest release, waiting at most 3 seconds. When it is newer, xmtr asks whether to install it and then whether to run the same command again with the new version; Enter answers yes to both. When a package manager owns the binary, or its directory is not writable, xmtr prints the command that updates it instead. Runs with `--json`, `--quiet` or `--no-upload`, and runs without a terminal on stdin and stderr, skip the lookup.

### Verify a download

Archives for manual installs are on the [releases page](https://github.com/Alice39s/xmtr/releases). Releases are immutable: once published, their files and tag cannot change.

```sh
gh release verify-asset <tag> <file> --repo Alice39s/xmtr   # the file belongs to the release
gh attestation verify <file> --repo Alice39s/xmtr           # the file was built by the release workflow
```

The second command checks the [build provenance](https://github.com/Alice39s/xmtr/attestations).

## Platforms

| | System | Architectures |
| :-: | --- | --- |
| <img src=".github/assets/linux.svg" width="20" alt=""> | Linux, glibc and musl | <img src=".github/assets/amd.svg" width="14" alt=""> x86_64 · <img src=".github/assets/intel.svg" width="14" alt=""> i686 · <img src=".github/assets/arm.svg" width="14" alt=""> aarch64, armv7, armv6 · <img src=".github/assets/riscv.svg" width="14" alt=""> riscv64 · <img src=".github/assets/chip.svg" width="14" alt=""> loongarch64 |
| <img src=".github/assets/linux.svg" width="20" alt=""> | Linux, glibc | <img src=".github/assets/ibm.svg" width="24" alt=""> powerpc64le, powerpc64, s390x · <img src=".github/assets/oracle.svg" width="14" alt=""> sparc64 |
| <picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/apple-dark.svg"><img src=".github/assets/apple.svg" width="20" alt=""></picture> | macOS | <img src=".github/assets/arm.svg" width="14" alt=""> Apple silicon · <img src=".github/assets/intel.svg" width="14" alt=""> x86_64 |
| <img src=".github/assets/windows.svg" width="20" alt=""> | Windows 10 and later | <img src=".github/assets/amd.svg" width="14" alt=""> x86_64 · <img src=".github/assets/intel.svg" width="14" alt=""> i686 · <img src=".github/assets/arm.svg" width="14" alt=""> ARM64 |
| <img src=".github/assets/freebsd.svg" width="20" alt=""> | FreeBSD | <img src=".github/assets/amd.svg" width="14" alt=""> x86_64 |
| <img src=".github/assets/android.svg" width="20" alt=""> | Android, Termux with root | <img src=".github/assets/arm.svg" width="14" alt=""> aarch64, armv7 · <img src=".github/assets/amd.svg" width="14" alt=""> x86_64 · <img src=".github/assets/intel.svg" width="14" alt=""> i686 |

All builds are cross-compiled on Linux. Before each release, CI runs every build and traces `127.0.0.1` with it: x86_64 and ARM64 builds for Linux, macOS and Windows on hosted runners, the other Linux CPUs under QEMU user emulation, FreeBSD in a virtual machine and Android in the Termux image. After a release, CI installs xmtr through each package channel on Linux, macOS and Windows runners.

| | System | Why there is no build |
| :-: | --- | --- |
| <img src=".github/assets/netbsd.svg" width="20" alt=""> | NetBSD | trippy's socket layer does not compile there |
| <img src=".github/assets/openbsd.svg" width="20" alt=""> | OpenBSD, DragonFly BSD | Rust ships no prebuilt standard library for cross builds |
| <img src=".github/assets/chip.svg" width="20" alt=""> | illumos, Solaris | trippy's socket layer does not compile there |
| <img src=".github/assets/webassembly.svg" width="20" alt=""> | iOS, WebAssembly | no raw socket access for command-line programs |

## Privileges

Tracing needs raw sockets.

| System | Run as |
| --- | --- |
| Linux | root, or once: `sudo setcap cap_net_raw+ep $(command -v xmtr)`; the deb, rpm and apk packages do this at install |
| macOS | any user; ICMP and UDP use unprivileged sockets, TCP needs root |
| Windows | an Administrator terminal |
| FreeBSD, Android | root |

`xmtr self update` replaces the binary, so run `setcap` again after an update.

## Usage

```sh
xmtr 1.1.1.1 cloudflare.com 9.9.9.9   # three targets at once
xmtr -4 --min-rounds 20 example.com    # IPv4 only, at least 20 rounds
xmtr -p tcp --port 443 example.com     # TCP probes to port 443
xmtr --no-upload 192.0.2.1             # print the routes, upload nothing
xmtr --pin 2580 example.com            # viewers enter 2580 to open the map
xmtr -q 1.1.1.1                        # print only the IPMap link
xmtr --json 1.1.1.1 > trace.json       # the upload payload as JSON, tables on stderr
```

Every option is listed under [Options](#options).

### How a run works

A run has five steps, numbered the same way in the progress panel.

1. **Resolve.** Every target is resolved. A hostname with both A and AAAA records is traced over IPv4 and IPv6 at the same time, using the first address of each family in resolver order. A family without a local route is skipped.
2. **Trace.** Up to 8 routes run in parallel (`-j`). Each tracer has its own ICMP identifier, UDP source port and sequence range, so replies never mix between routes. A route stops once it has run `--min-rounds` rounds, no new hop has appeared for 3 rounds, and the target answered. A route that never reaches its target gets 5 extra rounds. `--max-rounds` and `--time-limit` are hard limits; a tracer never runs more rounds than fit in the time limit.

   With `--protocol auto`, a target that ICMP has not reached after 4 rounds is also traced over TCP port 80, or over UDP with unprivileged sockets. The second route runs beside the ICMP route, gets its own row in the progress view and counts toward `-j`; an ICMP route that ends sooner without the target starts it when it ends. Both routes are uploaded. A route where no hop answered is reported as an error and left out.

   UDP over raw sockets uses Dublin traceroute: each round keeps both ports fixed to follow one flow through routers that balance traffic by flow, and replies can be matched after NAT changes the UDP checksum. ICMP, TCP and UDP over unprivileged sockets send classic probes.
3. **Lookup.** Public hop addresses get reverse DNS names and origin AS numbers ([Team Cymru](https://www.team-cymru.com/ip-asn-mapping)), at most 32 lookups at a time. The step ends after 5 seconds at the latest, and the result notes how many addresses did not answer. Private addresses are never sent to a resolver given with `--dns`. `--no-rdns` skips this step.
4. **Upload.** The routes are uploaded to `--api`; see [Upload and sharing](#upload-and-sharing). `--no-upload` skips this step.
5. **Result.** The IPMap link, any notes, and one table per route.

Ctrl-C stops the run and exits with status 130.

### Progress and output

In a terminal, a panel below the prompt shows the steps as they run: which step is active, one progress bar per route, and how many reverse lookups have answered. When the run ends, the panel turns into the result: the IPMap link first, then any notes, then each route as a table, with runs of silent hops folded into one line. The panel is drawn on stderr and needs stdout on the terminal as well.

`--progress` picks the view, and `auto` chooses one from the terminal:

| View | Chosen by `auto` when | Shows |
| --- | --- | --- |
| `panel` | stdout and stderr are on a terminal of at least 44 columns and 8 rows that reports its cursor position | the panel described above |
| `line` | stdout is redirected, or the terminal is smaller or does not report its cursor position | finished steps and routes as single lines above one status line, then the tables and the link |
| `plain` | stderr is not a terminal, or `TERM=dumb` | one line per step and finished route, such as `[2/5] 1.1.1.1 v4 ICMP: reached, 7 rounds, 5.2s`, and the current state every 10 seconds while nothing changes |

A router that forwarded the probe inside an MPLS tunnel and quoted the label stack in its reply ([RFC 4950](https://www.rfc-editor.org/rfc/rfc4950)) gets one line per label under its address, such as `[MPLS: Lbl 24001 TC 0 S 1 TTL 1]`, the form `mtr -e` prints. Every router inside a tunnel reports about the round trip of the tunnel's last router, because its reply travels to the end of the tunnel before it turns back.

A table that does not fit the terminal, even with long host names wrapped, becomes one line per hop with the host, the average round trip and any loss. `--quiet` turns progress off and prints only the link.

`--theme` sets the colors of the panel and the line view. `auto` asks the terminal for its background and uses RGB colors when `COLORTERM` is `truecolor` or `24bit`; `dark`, `light`, `dark-ansi` and `light-ansi` choose directly.

Piped or redirected, xmtr prints each route as plain text, followed by the trace ID and the link:

```text
$ sudo xmtr --min-rounds 20 121.55.201.201 | cat
121.55.201.201 -> 121.55.201.201 [ICMP IPv4] 20 rounds, 20.4s, reached
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Hop   Host                                                               ASN        Loss%   Snt    Last     Avg    Best    Wrst   StDev │
╞═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╡
│   1   dgw.vyme.net (45.88.180.254)                                       AS199297     0.0    20     0.4     0.4     0.3     0.9     0.1 │
│   2   te0-0-0-2.nr61.b074095-0.rns01.atlas.cogentco.com (149.6.72.106)   AS174        0.0    20     1.3     1.1     0.8     1.6     0.2 │
│   3   be2928.rcr51.rns01.atlas.cogentco.com (154.25.12.25)               AS174        0.0    20     1.5     1.6     1.5     2.0     0.1 │
│   4   be7070.rcr61.uro01.atlas.cogentco.com (154.54.76.85)               AS174        0.0    20     6.0     5.7     5.5     6.1     0.2 │
│   5   be2480.ccr42.par01.atlas.cogentco.com (130.117.3.13)               AS174        0.0    20     7.3    10.9     7.0    44.4    11.2 │
│   6   port-channel2732.ccr92.lhr01.atlas.cogentco.com (154.54.75.138)    AS174        0.0    20    14.1    14.1    14.0    14.5     0.1 │
│   7   be3467.ccr32.bos01.atlas.cogentco.com (154.54.94.45)               AS174        0.0    20    76.4    76.3    76.2    76.5     0.1 │
│   8   be8030.ccr22.alb02.atlas.cogentco.com (154.54.169.226)             AS174        0.0    20    79.9    79.9    79.7    80.6     0.2 │
│   9   port-channel8023.ccr92.cle04.atlas.cogentco.com (154.54.169.197)   AS174        0.0    20    87.4    87.5    87.3    87.6     0.1 │
│  10   be2718.ccr42.ord01.atlas.cogentco.com (154.54.7.129)               AS174        0.0    20    99.3    99.0    98.8    99.3     0.1 │
│  11   be5068.ccr32.oma02.atlas.cogentco.com (154.54.166.73)              AS174        0.0    20   102.7   103.6   102.7   118.3     3.5 │
│  12   be8568.ccr82.den01.atlas.cogentco.com (154.54.95.109)              AS174       70.0    20   114.7   114.2   113.8   114.7     0.3 │
│  13   be9563.ccr82.slc03.atlas.cogentco.com (154.54.163.206)             AS174       55.0    20   125.1   124.5   123.5   125.1     0.7 │
│  14   be3906.ccr22.sfo01.atlas.cogentco.com (154.54.5.154)               AS174        0.0    20   138.5   138.6   138.5   138.9     0.1 │
│  15   be3670.ccr41.sjc03.atlas.cogentco.com (154.54.43.14)               AS174        0.0    19   140.7   140.6   140.4   140.8     0.1 │
│  16   38.104.138.31                                                      AS174        0.0    19   140.0   140.1   139.8   140.3     0.1 │
│  17   tky009bb10.IIJ.Net (58.138.88.225)                                 AS2497      73.7    19   240.2   241.9   240.2   242.9     1.1 │
│  18   tky009ix55.IIJ.Net (58.138.112.109)                                AS2497       0.0    19   241.4   241.3   241.2   241.4     0.1 │
│  19   210.173.173.82                                                     -            0.0    19   239.1   239.0   238.9   239.2     0.1 │
│  20   198.81.233.103.guam.net (198.81.233.103)                           AS3605       0.0    19   235.2   235.3   235.0   235.5     0.1 │
│  21   202.128.5.115.guam.net (202.128.5.115)                             AS3605       0.0    19   270.3   270.2   270.0   270.7     0.2 │
│  22   ae14-cgw-har-gu.guam.net (198.81.233.92)                           AS3605       0.0    19   264.4   264.5   264.1   266.4     0.5 │
│  23   ???                                                                -          100.0    19       -       -       -       -       - │
│  24   ???                                                                -          100.0    19       -       -       -       -       - │
│  25   121-55-201-201.d.c200.guam.net (121.55.201.201)                    AS3605       0.0    19   283.7   282.6   279.6   285.2     1.9 │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

trace-id 103115083070058496-nBjPEnny
https://xmsl.dev/xmtr/103115083070058496-nBjPEnny
```

### Upload and sharing

The upload returns a trace ID and a link to its map. The trace ID is a snowflake ID and an 8-letter key. Anyone with the link can open the trace; the key keeps others from guessing it.

| Option | Effect |
| --- | --- |
| `--pin 2580` | viewers must enter the four-digit PIN (digits 0-8, no 4) after opening the link |
| `--hide-origin` | the source address is left out; the first hops may still show the network |
| `--no-upload` | the routes stay on this machine |

IPMap starts each route at the public address its probes left from. When their local address is not public (private, CGNAT, ULA, link-local or another reserved range), xmtr takes the address the gateway sees on an HTTPS request sent from that local address straight to the gateway, ignoring proxy settings. The request runs during the trace and waits at most 3 seconds; a route without a public source address is uploaded without one.

The upload carries the source address, the destination and a target given as an IP address cut to their network, the /24 of IPv4 or the /48 of IPv6, such as `203.0.113.0` for `203.0.113.7` and `2001:db8:1::` for `2001:db8:1:2::7`. The hops keep their full addresses, and the tables in the terminal show the full destination. Each address at a hop also carries the lowest round trip of its own replies and the MPLS label stack it quoted.

### DNS

`--dns` selects the resolver for target names, the upload, reverse DNS and AS lookups.

| Value | Resolver |
| --- | --- |
| `auto` | system configuration; target names go through the OS, so hosts files apply |
| <img src=".github/assets/cloudflare.svg" width="14" alt=""> `cloudflare`, <img src=".github/assets/google.svg" width="14" alt=""> `google`, <img src=".github/assets/quad9.svg" width="14" alt=""> `quad9`, `9.9.9.9`, `192.0.2.53:5353` | plain DNS over UDP and TCP |
| `tcp://[2620:fe::fe]` | DNS over TCP |
| `tls://[2606:4700:4700::1111]`, `dot://dns.quad9.net` | DNS over TLS |
| `https://cloudflare`, `doh://dns.google/dns-query` | DNS over HTTPS |
| `quic://dns.adguard-dns.com` | DNS over QUIC |

`cloudflare`, `google` and `quad9` also work as the host of a URL and include both IPv4 and IPv6 servers. A hostname in a URL is looked up once with the system resolver; certificates are checked against public roots. DNS over HTTPS needs a hostname or an IPv4 address.

## Options

```text
Usage: xmtr [OPTIONS] <TARGET>...
       xmtr self update [--force] [--tag <TAG>]
       xmtr self uninstall

-p, --protocol <auto|icmp|udp|tcp>   probe protocol (default auto)
-4, --ipv4 / -6, --ipv6              trace one family only
    --min-rounds <N>                 rounds before a route may stop (default 5)
-c, --max-rounds <N>                 hard limit on rounds (default 30)
-t, --time-limit <DURATION>          time limit per route, at least 1s and longer than -i (default 45s)
-i, --interval <DURATION>            minimum time between rounds, at least 100ms (default 1s)
-m, --max-ttl <N>                    maximum TTL (default 30)
    --port <PORT>                    destination port for -p tcp (default 443)
-j, --parallel <N>                   routes traced at the same time (default: all routes, at most 8)
-u, --unprivileged                   unprivileged sockets (macOS)
    --dns <RESOLVER>                 see DNS above (default auto)
    --no-rdns                        skip reverse DNS and AS lookups
    --no-upload                      print the routes only
    --hide-origin                    upload without the source address of the routes
    --pin <PIN>                      four digits from 0-8 without 4
    --api <URL>                      upload gateway, also XMTR_API
    --json                           print the upload payload on stdout, tables on stderr
-q, --quiet                          print only the IPMap link
    --progress <VIEW>                auto, panel, line or plain (default auto)
    --theme <THEME>                  auto, dark, light, dark-ansi or light-ansi (default auto)
```

## Telemetry

Release binaries send reports to the xmtr project on [GlitchTip](https://glitchtip.com). Builds from source, such as `cargo install` and `nix build`, send nothing unless `XMTR_TELEMETRY_DSN` is set while they compile.

| Report | Sent | Contents |
| --- | --- | --- |
| Usage | for one run in 100 that uploads, and for `xmtr self` commands | xmtr version, OS and version (such as Debian 13), CPU architecture, command, duration, whether the run had errors |
| Error | after a run with errors, when you answer yes | the error messages, xmtr version, OS, CPU architecture |
| Crash | after a panic, when you answer yes | the panic message and its source location, xmtr version, OS, CPU architecture |

xmtr asks about errors and crashes only when stdin and stderr are a terminal and neither `--json` nor `--quiet` is set. The default answer is no, and without a terminal nothing is sent. Before sending, xmtr replaces IP addresses with `[ip]`; the targets, a resolver or gateway given by hostname, and proxy hosts with `[host]`; the home directory with `~`; user names in paths with `[user]`; and credentials in URLs. Reports do not include the name of your machine or the command line. GlitchTip records the address a report came from, shortened to its network prefix.

`DO_NOT_TRACK=1` turns off every report and question ([Console Do Not Track](https://consoledonottrack.com)).

## Build from source

```sh
cargo build --release --workspace
```

The workspace builds `xmtr` and `xmtr-installer` and needs Rust 1.88 or later. Set `XMTR_TELEMETRY_DSN` to a GlitchTip or Sentry DSN to build with [telemetry](#telemetry). `nix build` builds `xmtr` from the flake.

Release builds use [cargo-zigbuild](https://github.com/rust-cross/cargo-zigbuild) for Linux, Windows and macOS, [cross](https://github.com/cross-rs/cross) for FreeBSD, powerpc64 and sparc64, and [cargo-ndk](https://github.com/bbqsrc/cargo-ndk) for Android; see `.github/workflows/release.yml` and [`scripts/ci`](scripts/ci/README.md). The workspace builds against a patched trippy-core in `vendor/` that traces IPv4 on Android; see [vendor/README.md](vendor/README.md).

## Translations

[`docs/zh-CN.md`](docs/zh-CN.md) is the Simplified Chinese version of this README. The Traditional Chinese versions are generated from it with [OpenCC](https://github.com/BYVoid/OpenCC): `zh-TW.md` with Taiwan phrases (`s2twp`), `zh-HK.md` and `zh-MO.md` with Hong Kong character forms (`s2hk`). After editing `zh-CN.md`, regenerate them:

```sh
uv run --project scripts/ci xmtr-ci docs
```

## Releasing

Releases are managed with [knope](https://github.com/knope-dev/knope) and change files:

1. With each user-facing change, run `knope document-change` and commit the file it writes to `.changeset/`.
2. To release, run `knope release`. It sets the version in `Cargo.toml`, `Cargo.lock`, this README and its translations, moves the change files into [CHANGELOG.md](CHANGELOG.md), commits, and tags `vX.Y.Z`. Before 1.0, a `minor` change file raises only the patch number; `knope release --override-version X.Y.0` sets the version directly.
3. `git push --atomic origin main vX.Y.Z` starts the release workflow. It builds and checks every target, publishes the GitHub release with the CHANGELOG.md section as its notes, and then publishes to the package managers.

CI checks `knope.toml` and that every versioned file has the same version, and adds a preview of the next release to the job summary while change files are pending.

## License

Licensed under either of [Apache License 2.0](LICENSE-APACHE) or [MIT](LICENSE-MIT), at your option.

