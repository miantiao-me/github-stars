---
project: leonsansfont
stars: 173
description: |-
    null
url: https://github.com/cmiscm/leonsansfont
---

# Leon Sans 2.0

Leon Sans is a geometric variable sans-serif typeface designed by Jongmin Kim. Originally created in 2019 as a code-based drawing system to celebrate the birth of his son Leon, **Version 2.0** is a standalone OpenType variable TrueType family (`LeonSans[wght].ttf`) spanning a continuous `wght` axis from **100 (Thin)** to **900 (Black)**.

[![Leon Sans 2.0 Specimen](documentation/specimen.png?v=2)](https://leon-kim.com/preview/)

**[Interactive Type Specimen & 479-Glyph Preview → https://leon-kim.com/preview/](https://leon-kim.com/preview/)**

This repository contains the installable variable font, editable UFO masters, and reproducible open-source build pipeline. The original animated JavaScript drawing library is maintained separately at [cmiscm/leonsans](https://github.com/cmiscm/leonsans).

## Overview & Specification

- **File**: `fonts/variable/LeonSans[wght].ttf`
- **Family Name**: `Leon Sans` (Version `2.006`, `2000 UPM`)
- **Variable Axis**: `wght` `100`–`900` interpolated from 8 editable UFO masters (`100, 300, 400, 500, 600, 700, 800, 900`) with 9 named instances (`Thin`, `ExtraLight`, `Light`, `Regular`, `Medium`, `SemiBold`, `Bold`, `ExtraBold`, `Black`). The default variable instance is Regular (`400`).
- **Character Repertoire (`479 Glyphs`)**:
  - **Basic & Extended Latin**: 100% Google Fonts Latin Core plus pan-European Latin-1, Latin Extended-A/B (`Ə ə`), stroked letters (`Ø ø Ł ł Đ đ Ħ ħ Ŧ ŧ Ǥ ǥ`), ligatures (`Æ æ Œ œ ß ẞ ﬁ ﬂ`), and combining marks.
  - **Harmonized Figures & Fractions**: Optically balanced lining figures (`0`–`9`), full superscripts (`⁰`–`⁹`) and subscripts (`₀`–`₉`), and vulgar fractions (`¼ ½ ¾ ⅓ ⅔`).
  - **Currencies, Arrows & Calculus**: International currency symbols (`€ £ ¥ $ ₹ ₩ ¢ ƒ`), geometric arrows (`← ↑ → ↓ ↔ ↖ ↗ ↘ ↙`), mathematical and calculus operators (`π Ω ∑ ∏ √ ∞ ∫ ∂ ∆ ∅ ≈ ≠ ≤ ≥ ÷ × ± ∙ ◊`), and enclosed/editorial symbols (`Ⓓ © ® ™ № ℓ § ¶ † ‡`).

## Build from Source

Python 3.12+ is supported for building from source using the pinned open-source toolchain:

```sh
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python scripts/build.py
```

The eight editable UFO masters and `LeonSans.designspace` are located in `sources/`. `fontmake` compiles the variable TTF, and `scripts/finalize.py` applies STAT/OS/2/name table metadata, IUP-safe 2000-UPM scaling, and non-hinting rasterizer tables (`prep`/`gasp`). No proprietary font editor or external binary is required.

To run the current Google Fonts Fontspector checks against an isolated package (including metadata, license, article, and images):

```sh
python scripts/qa.py --fontspector /path/to/fontspector
```

## Version 2.0 Highlights

- **Continuous `wght` Axis (100–900)**: Re-engineered from 8 UFO masters on a 2000-UPM grid.
- **Optical Curve-to-Stem Transitions**: Refined inner and outer bowl joins across weights 300–900 (`a, b, d, g, p, q, u, y, 5, 6, 9, @` and accented derivatives) for smooth, natural curvature without pinch points.
- **Harmonized Numerals**: Unified figure proportions, crossbar alignments, and curve geometry across `0`–`9` and derived superscripts, subscripts, and fractions.
- **OpenType Layout**: `ccmp` canonical composition and contextual dotless forms (`i`, `j`, `iogonek` before top marks), `liga` standard ligatures, `kern` pair kerning, and `mark`/`mkmk` anchor positioning.

Version 1 static font binaries remain available in Git history.

## License & Authorship

Copyright 2019 The Leon Sans Project Authors (https://github.com/cmiscm/leonsansfont). Licensed under the [SIL Open Font License 1.1](OFL.txt).

[Interactive Type Specimen (`leon-kim.com/preview/`)](https://leon-kim.com/preview/) · [Designer Website](https://leon-kim.com/) · [Google Fonts issue #11132](https://github.com/google/fonts/issues/11132) · [Issue #2169](https://github.com/google/fonts/issues/2169)

## Release verification

Thin is intended for large display settings. For small interface or body text, start with Regular or heavier and proof the actual target size and platform.

`python scripts/build.py` also refreshes the embedded preview font. The explicit `sources/config.yaml` recipe invokes the same finalizer; run it in the activated environment with `SOURCE_DATE_EPOCH=1791676800 gftools builder sources/config.yaml`.

Development packages omit `source.commit` when release inputs have uncommitted changes. After committing reviewed sources and binaries, run `python scripts/prepare_metadata.py --release` to bind the package to the actual commit. `ofl/build-manifest.json` records the exact source and font hashes.

The local font repertoire is broader than the current Google Fonts web subset definitions. The proposed upstream subset correction and designer profile are under `documentation/googlefonts/`. These are submission materials, not a claim that Google Fonts has accepted or deployed them.

For the equivalent gftools recipe, install `requirements-builder.txt`, then run `SOURCE_DATE_EPOCH=1791676800 gftools builder sources/config.yaml`.

Shaping regression checks (normalization, soft dots, and accented fi/fl sequences):

```sh
python scripts/check_shaping.py --output output/shaping.json
```

Stacked-mark clearance: `python scripts/check_mark_clearance.py --output output/mark-clearance.json` checks 24,300 sequences across 81 weights, including the Iacute/Igrave stacking regression. It is included in `make check`.

Spacing regression: `python scripts/check_spacing.py --output output/spacing.json`. Add `--full` to screen all encoded letters below U+2000 at weights 100, 400, 700 and 900.

Validate the variable font and all nine named instances structurally with `python scripts/check_instances.py --output output/instances.json` (OpenType Sanitizer).

Strict release QA: `python scripts/check_release.py --qa-directory output/qa`. Release packaging now requires an online, unfiltered report matching the exact package with zero WARN/FAIL/ERROR/FATAL, as well as committed source inputs. The report's input hashes are written by `scripts/qa.py`. A technically clean run still needs Google Fonts design approval.

## Repository Layout

This repository follows the Unified Font Repository layout with a Google Fonts build entry point. `sources/` contains eight editable UFO masters, the designspace and `config.yaml`; `fonts/variable/` and `fonts/webfonts/` contain generated fonts; `scripts/` contains build and verification tools; `documentation/` contains article, specimen and onboarding materials. Generated `ofl/`, `output/` and `tmp/` directories are not source inputs.

After installing `requirements.txt` in a virtual environment, `make build`, `make check`, `make proof`, and `make test` provide the main workflows. `requirements.in` records direct dependencies. `make test` requires the separately installed Fontspector executable and preserves failing exit codes. `make proof` creates a portable HTML specimen with the actual font embedded. Override `PYTHON` or `FONTSPECTOR` when needed. `make release` additionally requires committed sources and strict QA; it does not publish anything.

## About

Designed by Jongmin Kim. [Designer website](https://leon-kim.com/) · [Profile and selected work](https://blog.cmiscm.com/?page_id=3023).

