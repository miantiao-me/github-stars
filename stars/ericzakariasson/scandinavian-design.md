---
project: scandinavian-design
stars: 404
description: |-
    null
url: https://github.com/ericzakariasson/scandinavian-design
---

# Scandinavian Design

A Cursor agent skill for applying a restrained Scandinavian visual system to a codebase: black-and-white foundation, sans-serif type, generous spacing, and purposeful product imagery.

![Scandinavian design showcase](showcase.gif)

Ten sites, before rewritten into after.

## Install

Install with `npx skills add ericzakariasson/scandinavian-design`.

The skill is `skills/scandinavian-design/`. Nothing else in this repo is needed.

```bash
git clone https://github.com/ericzakariasson/scandinavian-design
cd scandinavian-design
cp -r skills/scandinavian-design ~/.cursor/skills/
npm --prefix ~/.cursor/skills/scandinavian-design/scripts install
```

Then invoke `/scandinavian-design` on the surface you want redesigned.

## Eval

`demos/` holds ten live sites restyled through the CSS-override fallback, with before/after captures at desktop and mobile — the set the skill was tested and corrected against. Browse them at [scandinavian-design.vercel.app](https://scandinavian-design.vercel.app) or locally:

```bash
npm install && npm run eval   # re-capture everything
npm run site                  # viewer on :4173
npm run showcase              # Remotion studio — before/after scan rewrite
npm run showcase:render       # write showcase.mp4 for the landing page
```

`feedback.md` records what each demo taught the skill, including the claims that were checked and rejected.

