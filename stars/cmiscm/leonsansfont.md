---
project: leonsansfont
stars: 172
description: |-
    null
url: https://github.com/cmiscm/leonsansfont
---

# Leon Sans 2.0

Leon Sans is a geometric variable sans-serif typeface designed by Jongmin Kim. Originally created in 2019 as a code-based drawing system to celebrate the birth of his son Leon, **Version 2.0** is a standalone OpenType variable TrueType family (`LeonSans[wght].ttf`) spanning a continuous `wght` axis from **100 (Thin)** to **900 (Black)**.

[![Leon Sans 2.0 Specimen](documentation/specimen.png?v=2)](https://leon-kim.com/preview/)

**[Interactive Type Specimen & 470-Glyph Preview → https://leon-kim.com/preview/](https://leon-kim.com/preview/)**

This repository contains the installable variable font, editable UFO masters, and reproducible open-source build pipeline. The original animated JavaScript drawing library is maintained separately at [cmiscm/leonsans](https://github.com/cmiscm/leonsans).

## Overview & Specification

- **File**: `fonts/variable/LeonSans[wght].ttf`
- **Family Name**: `Leon Sans` (Version `2.000`, `2000 UPM`)
- **Variable Axis**: `wght` `100`–`900` interpolated from 8 editable UFO masters (`100, 300, 400, 500, 600, 700, 800, 900`) with 9 named instances (`Thin`, `ExtraLight`, `Light`, `Regular`, `Medium`, `SemiBold`, `Bold`, `ExtraBold`, `Black`). The default variable instance is Regular (`400`).
- **Character Repertoire (`470 Glyphs`)**:
  - **Basic & Extended Latin**: Google Fonts Latin Core plus pan-European Latin-1, Latin Extended-A/B, stroked letters (`Ø ø Ł ł Đ đ Ħ ħ`), ligatures (`Æ æ Œ œ ß ẞ ﬁ ﬂ`), and combining marks.
  - **Harmonized Figures & Fractions**: Optically balanced lining figures (`0`–`9`), full superscripts (`⁰`–`⁹`) and subscripts (`₀`–`₉`), and vulgar fractions (`¼ ½ ¾ ⅓ ⅔`).
  - **Currencies, Arrows & Calculus**: International currency symbols (`€ £ ¥ $ ₹ ₩ ¢`), geometric arrows (`← ↑ → ↓ ↔ ↖ ↗ ↘ ↙`), mathematical and calculus operators (`π Ω ∑ ∏ √ ∞ ∫ ∂ ∆ ∅ ≈ ≠ ≤ ≥ ÷ × ±`), and enclosed/editorial symbols (`Ⓓ © ® ™ № ℓ § ¶ † ‡`).

## Build from Source

Python 3.12+ is supported for building from source using the pinned open-source toolchain:

```sh
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python scripts/build.py
```

The eight editable UFO masters and `LeonSans.designspace` are located in `sources/`. `fontmake` compiles the variable TTF, and `scripts/finalize.py` applies STAT/OS/2/name table metadata, IUP-safe 2000-UPM scaling, and non-hinting rasterizer tables (`prep`/`gasp`). No proprietary font editor or external binary is required.

To run Google Fonts QA checks:

```sh
fontbakery check-googlefonts 'ofl/leonsans/LeonSans[wght].ttf'
```

## Version 2.0 Highlights

- **Continuous `wght` Axis (100–900)**: Re-engineered from 8 UFO masters on a 2000-UPM grid.
- **Optical Curve-to-Stem Transitions**: Refined inner and outer bowl joins across weights 300–900 (`a, b, d, g, p, q, u, y, 5, 6, 9, @` and accented derivatives) for smooth, natural curvature without pinch points.
- **Harmonized Numerals**: Unified figure proportions, crossbar alignments, and curve geometry across `0`–`9` and derived superscripts, subscripts, and fractions.
- **OpenType Layout**: `ccmp` canonical composition and contextual dotless forms (`i`, `j`, `iogonek` before top marks), `liga` standard ligatures, `kern` pair kerning, and `mark`/`mkmk` anchor positioning.

Version 1 static font binaries remain available in Git history.

## License & Authorship

Copyright 2019 The Leon Sans Project Authors (https://github.com/cmiscm/leonsansfont). Licensed under the [SIL Open Font License 1.1](OFL.txt).

[Interactive Type Specimen (`leon-kim.com/preview/`)](https://leon-kim.com/preview/) · [Designer Website](https://leon-kim.com/) · [Google Fonts PR #11132](https://github.com/google/fonts/pull/11132) · [Issue #2169](https://github.com/google/fonts/issues/2169)

