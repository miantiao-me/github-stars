---
project: install-edgeos-packages
stars: 37
description: |-
    Installs debian packages if they aren't already installed following an upgrade or reboot
url: https://github.com/britannic/install-edgeos-packages
---

# UBNT Install EdgeOS Packages Script with Upgrade Persistence

[![License](https://img.shields.io/badge/license-BSD-blue.svg)](https://github.com/britannic/blacklist/blob/master/LICENSE.txt)[![Version](https://img.shields.io/badge/version-v1.0.1-green.svg)](https://github.com/britannic/install-edgeos-packages)

NOTE: THIS IS NOT OFFICIAL UBIQUITI SOFTWARE AND THEREFORE NOT SUPPORTED OR ENDORSED BY [Ubiquiti Networks®](https://www.ubnt.com/)

## Overview

* Script ensures packages are installed at the end of EdgeOS boot sequence, for any packages not installed during the first boot after an upgrade

## Copyright

* Copyright © 2022 Helm Rock Consulting

## Licenses

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
1. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
    ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

    The views and conclusions contained in the software and documentation are those
    of the authors and should not be interpreted as representing official policies,
    either expressed or implied, of the FreeBSD Project.

## Features

* Iterates through any packages downloaded to:

```bash
/config/data/install-packages
```

## Compatibility

* install-pkgs has been tested on the EdgeRouter ERLite-3, ERPoe-5, ER-X and UniFi Security Gateway USG-3 routers

## Change Log

* See [changelog](CHANGELOG.md) for details.

## Installation

### All EdgeOS and USG routers

```bash
curl -O https://raw.githubusercontent.com/britannic/install-edgeos-packages/master/install-pkgs
sudo install -o root -g root -m 0755 install-pkgs /config/scripts/post-config.d/install-pkgs
```

#### Adding Packages

* To add packages (use the mkdir command if the directory doesn't exist):

```bash
sudo mkdir -p /config/data/install-packages
cd /config/data/install-packages
sudo apt-get update
sudo apt-get download [package name]
```

## Upgrade

* Replace the old version with the latest

## Removal

### EdgeMAX - All Platforms

```bash
sudo rm /config/scripts/post-config.d/install-pkgs
```

## Usage

* In daily use, no additional interaction with install-pkgs is required.

> install-edgeos-packages

