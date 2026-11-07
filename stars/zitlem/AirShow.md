---
project: AirShow
stars: 24
description: |-
    Free, open-source, cross-platform screen mirroring receiver — AirPlay, Google Cast, Miracast, DLNA
url: https://github.com/zitlem/AirShow
---



# AirShow

A free, open-source, cross-platform screen mirroring receiver. Turn any computer into a wireless display that accepts screen mirrors from phones, tablets, and other computers.

**Think AirServer, but free.**

## Supported Protocols

| Protocol | Source Devices | Status |
|----------|---------------|--------|
| **AirPlay** | iPhone, iPad, Mac | Working (needs device testing) |
| **Google Cast** | Chrome browser (desktop) | Implemented (Cast Streaming receiver), needs device testing |
| **Miracast** | Windows 10/11 | Implemented (MS-MICE), needs device testing |
| **DLNA** | Any DLNA controller app | Working (needs device testing) |

## Features

- **Multi-protocol** --- one app receives from any device
- **Fullscreen receiver** with correct aspect ratio (letterboxed when needed)
- **Connection status HUD** showing device name and protocol
- **Audio playback** with mute toggle
- **Hardware H.264 decode** with automatic software fallback
- **Security controls** --- device approval prompts, PIN pairing, LAN-only filtering
- **Windowed mode** (`--windowed` flag) for development and testing
- **Close button + mute** appear on mouse hover

## Quick Start

### Download (no install)

Prebuilt builds are on the [Releases](https://github.com/zitlem/AirShow/releases) page. Nothing is installed — each one runs in place:

| Platform | Download | Run |
|----------|----------|-----|
| Windows 10/11 (x64) | `AirShow-windows-x64.zip` | Unzip anywhere, run `AirShow\airshow.exe` |
| macOS 13+ (Apple Silicon) | `AirShow-macos-arm64.dmg` | Open the .dmg and run AirShow (or drag it anywhere). It isn't notarized: the first time, right-click → **Open**. |
| Linux (x86_64, glibc 2.35+) | `AirShow-linux-x86_64.AppImage` | `chmod +x AirShow-*.AppImage && ./AirShow-*.AppImage` |

Device discovery (AirPlay, Google Cast, Miracast) needs nothing extra: AirShow uses the system's mDNS service where there is one (macOS, Avahi on Linux, Bonjour on Windows if installed) and otherwise answers mDNS itself with its built-in responder. On Windows, allow AirShow through the firewall on private networks when asked.

## Build from source

### Linux (Ubuntu/Debian)

AirShow needs **Qt 6.8 or newer**. Ubuntu 25.04+ / Debian 13 ship it (`qt6-base-dev qt6-declarative-dev`); on Ubuntu 24.04 install Qt 6.8 with the [Qt online installer](https://www.qt.io/download-qt-installer) or [aqtinstall](https://github.com/miurahr/aqtinstall) and pass `-DCMAKE_PREFIX_PATH=<qt>/gcc_64`.

```bash
sudo apt install \
  libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev \
  gstreamer1.0-plugins-base gstreamer1.0-plugins-good \
  gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
  libssl-dev libavahi-client-dev libavahi-compat-libdnssd-dev \
  libupnp-dev libplist-dev libprotobuf-dev protobuf-compiler \
  libgtest-dev libgmock-dev ninja-build cmake pkg-config
git submodule update --init
./build-and-run.sh            # add --windowed for a normal window
```

### macOS (Homebrew)

```bash
brew install qt gstreamer openssl libplist libupnp protobuf googletest ninja cmake pkgconf
git submodule update --init
./build-and-run.sh
```

### Windows — build from source (MSYS2)

Install [MSYS2](https://www.msys2.org/), open the **UCRT64** shell and run:

```bash
pacman -S --needed git mingw-w64-ucrt-x86_64-{toolchain,cmake,ninja,pkgconf,qt6-base,qt6-declarative,qt6-tools,gstreamer,gst-plugins-base,gst-plugins-good,gst-plugins-bad,gst-plugins-ugly,gst-libav,openssl,libupnp,libplist,protobuf,gtest}
git clone --recursive https://github.com/zitlem/AirShow.git && cd AirShow
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build
packaging/windows/package.sh build dist/AirShow   # optional: self-contained folder
```

Neither the Bonjour SDK nor Bonjour itself is needed: without Bonjour, AirShow's built-in mDNS responder handles discovery.

## Manual Build

```bash
cmake --preset linux-debug    # or macos-debug / windows-msys2-debug
cmake --build build/linux-debug
./build/linux-debug/airshow
```

## Architecture

```
src/
  main.cpp                    # Application entry point
  pipeline/                   # GStreamer media pipeline (appsrc, uridecodebin, webrtcbin, MPEG-TS)
  protocol/                   # Protocol handlers
    ProtocolHandler.h          # Abstract interface
    ProtocolManager.h          # Handler registry
    AirPlayHandler.h           # AirPlay 2 via UxPlay
    DlnaHandler.h              # DLNA DMR via libupnp
    CastHandler.h              # Google Cast via CASTV2 protobuf (TLS on port 8009)
    MiracastHandler.h          # Miracast over Infrastructure (MS-MICE)
  discovery/                  # mDNS/SSDP service advertisement
    DiscoveryManager.h         # Advertises all protocols
    AvahiAdvertiser.h          # Linux mDNS backend
    UpnpAdvertiser.h           # DLNA SSDP backend
  security/                   # Connection approval, PIN, network filter
    SecurityManager.h
  settings/                   # QSettings persistence
    AppSettings.h
  ui/                         # Qt Quick/QML bridges
    ReceiverWindow.h
    ConnectionBridge.h         # HUD state + approval dialog
    AudioBridge.h              # Mute toggle
    SettingsBridge.h           # Settings exposure to QML
  platform/
    WindowsFirewall.h          # Windows firewall rule registration
qml/
  main.qml                    # Root window
  HudOverlay.qml              # Connection status overlay
  IdleScreen.qml              # Waiting screen + PIN display
  ApprovalDialog.qml           # Device approval prompt
```

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Language | C++17 |
| GUI | Qt 6.8+ / Qt Quick / QML |
| Media Pipeline | GStreamer 1.26.x |
| Video Rendering | GStreamer appsink → Qt `VideoFrameSink` |
| AirPlay | UxPlay (embedded) |
| DLNA | libupnp (pupnp) |
| Google Cast | protobuf + OpenSSL (TLS, AES-CTR) + Cast Streaming over UDP |
| Miracast | MS-MICE (TCP/RTSP) |
| Discovery | Avahi (Linux), Bonjour (macOS, Windows if installed), built-in mDNS responder otherwise |
| Build | CMake + Ninja |
| Crypto | OpenSSL 3.x / 4.x |

## Security

AirShow includes three security layers:

1. **Device Approval** --- new devices trigger an Allow/Deny dialog before mirroring starts. Approved devices are remembered.
2. **PIN Pairing** --- optional 4-digit PIN displayed on the receiver. Devices must enter the correct PIN to connect.
3. **LAN-Only Filter** --- connections from non-RFC1918 IPs are rejected. VPN interfaces are excluded from listener binding.

## Known Limitations

- **Google Cast authentication** uses precomputed RSA signatures from AirReceiver (via shanocast). They cover through ~2027-12-21 and cannot be regenerated; Google may also revoke them at any time. Android "Cast screen" is not expected to work with these credentials.
- **Google Cast media** uses AirShow's own Cast Streaming receiver (`src/cast/CastStreamingReceiver`): RTP + AES-128-CTR + RTCP feedback, VP8/VP9/H.264 video and Opus audio. Not yet verified against a real Chrome sender.
- **Miracast** uses MS-MICE (infrastructure mode) only. Wi-Fi Direct Miracast is not supported due to unstable Linux kernel/wpa_supplicant P2P APIs.
- **Android Miracast** support varies by OEM. Most Android devices use Wi-Fi Direct only and won't connect via MS-MICE.
- **HDCP content** (Netflix, Disney+, etc.) is blocked at the protocol level by DRM --- this is not a bug.

## Testing

```bash
# Run all tests
cd build/linux-debug && ctest --output-on-failure

# Run tests for a specific protocol
ctest -R test_airplay
ctest -R test_dlna
ctest -R test_cast
ctest -R test_miracast
ctest -R test_security
```

## Contributing

Contributions welcome. The codebase follows these conventions:

- C++17, Qt Quick/QML, GStreamer
- Pure virtual `ProtocolHandler` interface for each protocol
- `MediaPipeline` with pluggable modes (appsrc, uridecodebin, webrtcbin, MPEG-TS)
- GTest for unit and integration tests
- CMake with presets for Linux/macOS/Windows

## License

Open source (license TBD).

