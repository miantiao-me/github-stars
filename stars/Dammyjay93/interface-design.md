---
project: interface-design
stars: 5244
description: |-
    Design engineering for Claude Code. Craft, memory, and enforcement for consistent UI.
url: https://github.com/Dammyjay93/interface-design
---

# Interface Design

<p align="center">
  <strong>Craft · Memory · Consistency</strong>
</p>

<p align="center">
  Build interfaces with intention. Remember decisions across sessions. Maintain systematic consistency.
</p>

<p align="center">
  <em>For interface design — dashboards, apps, tools, admin panels. Not for marketing sites.</em>
</p>

<p align="center">
  <a href="#installation">Install</a> ·
  <a href="#how-it-works">How It Works</a> ·
  <a href="https://interface-design.dev/examples.html">Examples</a> ·
  <a href="https://interface-design.dev">Website</a>
</p>

---

## What This Does

When you build UI with a coding agent, design decisions get made: spacing values, colors, depth strategy, surface elevation. Without structure, those decisions drift across sessions.

**Interface Design helps you:**

1. **Craft** — Principle-based design that produces professional, polished interfaces with real visual hierarchy
2. **Visual direction** — When an image-generation tool is available, explore direction boards, UI references, and critique paintovers
3. **Memory** — Save decisions to `.interface-design/system.md`, then reload them when the skill runs
4. **Consistency** — UI changes follow the same principles throughout the session

Make choices once. Apply them consistently.

## Before & After

**Without interface-design:**
- Every session starts from scratch
- Button heights drift (36px, 38px, 40px...)
- Random spacing values (14px, 17px, 22px...)
- No consistency across components

**With interface-design:**
- System loads automatically when the skill runs
- Direction boards and paintovers when an image-generation tool is available
- Patterns reused (Button: 36px, Card: 16px pad)
- Spacing on grid (4px, 8px, 12px, 16px)
- Consistent depth and surface treatment throughout

See the difference: **[interface-design.dev/examples.html](https://interface-design.dev/examples.html)**

---

## Installation

### Recommended: skills.sh

Use the installer shown on the [interface-design skills.sh page](https://www.skills.sh/dammyjay93/interface-design/interface-design):

```bash
npx skills add https://github.com/dammyjay93/interface-design --skill interface-design
```

The CLI detects supported agents and installs the skill in the right place. Useful variants:

```bash
# Install globally for the current detected agent
npx skills add https://github.com/dammyjay93/interface-design --skill interface-design -g

# Install for a specific agent
npx skills add https://github.com/dammyjay93/interface-design --skill interface-design --agent claude-code -g
npx skills add https://github.com/dammyjay93/interface-design --skill interface-design --agent codex -g

# Install for all supported agents
npx skills add https://github.com/dammyjay93/interface-design --skill interface-design --agent '*' -g -y

# Preview available skills without installing
npx skills add https://github.com/dammyjay93/interface-design --skill interface-design --list
```

Review installed skills before use. Skills run with the same permissions as your coding agent.

### Agent Notes

#### Claude Code

Recommended install:

```bash
npx skills add https://github.com/dammyjay93/interface-design --skill interface-design --agent claude-code -g
```

This installs the core skill to `~/.claude/skills/interface-design`. Claude Code can auto-invoke it when relevant, and you can invoke it directly as `/interface-design`.

Claude Code plugin install is still supported if you prefer Claude Code's marketplace/plugin flow:

```bash
/plugin marketplace add Dammyjay93/interface-design
/plugin menu
```

Select `interface-design` from the menu, then restart Claude Code.

#### Codex

Recommended install:

```bash
npx skills add https://github.com/dammyjay93/interface-design --skill interface-design --agent codex -g
```

The skills CLI installs Codex skills to `~/.agents/skills/interface-design`, which Codex scans. Restart Codex, or start a fresh Codex thread, if the skill does not appear immediately.

Use the Codex slash command when available, invoke the skill explicitly in prompts, or let Codex invoke it when the request is clearly product UI work:
- `/interface-design`
- `use interface-design to build this dashboard`
- `use interface-design design-review on the settings page`

#### Other Skill-Compatible Agents

Use the same CLI with an agent target:

```bash
npx skills add https://github.com/dammyjay93/interface-design --skill interface-design --agent <agent-name> -g
```

### Compatibility Matrix

| Agent | Install | Skill support | Slash commands | Notes |
|-------|---------|---------------|----------------|-------|
| Claude Code | `npx skills add ... --agent claude-code -g` | Yes | `/interface-design` | Plugin marketplace remains supported |
| Codex | `npx skills add ... --agent codex -g` | Yes | `/interface-design` | Slash command and natural language both work |
| All supported agents | `npx skills add ... --agent '*' -g -y` | Depends on agent | Depends on agent | Good for multi-agent setups |

### Manual Fallback

If you cannot use `npx`, copy the core skill folder manually:

```bash
git clone https://github.com/Dammyjay93/interface-design.git
cd interface-design

# Claude Code
mkdir -p ~/.claude/skills
cp -R .claude/skills/interface-design ~/.claude/skills/

# Codex / shared agent-skills location
mkdir -p ~/.agents/skills
cp -R .claude/skills/interface-design ~/.agents/skills/
```

Restart the target agent after manual installation.

---

## How It Works

### The Flow

When an agent uses interface-design:

**If system.md exists:**
```
✓ Reads skill files and principles
✓ Loads .interface-design/system.md
✓ Applies established patterns
✓ Keeps design choices explicit
✓ Offers to save new patterns
```

**If no system.md:**
```
1. Reads skill files and principles
2. Assesses project context
3. Suggests direction, asks for confirmation
4. Keeps design choices explicit while building
5. Builds with consistent principles
6. Offers to save system
```

### Example: First Session

```
You: "Build a user dashboard with metrics cards"

Agent:
This feels like a data-heavy dashboard — I'd suggest:
- Depth: Borders-only (clean, technical)
- Surfaces: Subtle elevation shifts
- Spacing: 8px base

Does this direction fit?

[You: y]

Depth: borders-only
Surfaces: 7% → 9% → 11% lightness scale
Borders: rgba(255,255,255,0.06)
Spacing: 8px base

[Builds dashboard with consistent depth, spacing, surfaces]

Want me to save these patterns to .interface-design/system.md?

[You: y]

✓ System saved
```

### Example: Second Session

```
You: "Add a settings page"

Agent:
✓ Loaded system.md

Depth: borders-only
Surfaces: using established scale
Borders: rgba(255,255,255,0.06)
Spacing: 8px base

[Builds settings page matching existing system]

Want me to save any new patterns?
```

The system **remembers** across sessions.

---

## System File

After establishing direction, your decisions live in `.interface-design/system.md`:

```markdown
# Design System

## Direction
Personality: Precision & Density
Foundation: Cool (slate)
Depth: Borders-only

## Tokens
### Spacing
Base: 4px
Scale: 4, 8, 12, 16, 24, 32

### Colors
--foreground: slate-900
--secondary: slate-600
--accent: blue-600

## Patterns
### Button Primary
- Height: 36px
- Padding: 12px 16px
- Radius: 6px
- Usage: Primary actions

### Card Default
- Border: 0.5px solid
- Padding: 16px
- Radius: 8px
```

This file is loaded by the interface-design skill when relevant. Claude Code and Codex use it to maintain consistency.

---

## Agent Usage

### Claude Code

With the skills.sh install, invoke the skill directly or let Claude Code auto-invoke it:

```text
/interface-design
use interface-design to build this dashboard
use interface-design to audit this settings page
```

If you installed through the Claude Code plugin flow, two command files in `.claude/commands` give you focused review passes:

```bash
/interface-design:design-review   # Strict craft + hierarchy review, with an approval bar
/interface-design:design-deslop   # Fast, diff-scoped pass that strips visual slop from a branch
```

`design-review` is the design counterpart to a deep code-quality review — it judges focal point, hierarchy, typography, color, surfaces, states, and motion against the bar of a top design team, then tells you what to fix. `design-deslop` is the counterpart to a code-deslop pass — it finds the obvious tells of generated UI (generic tokens, defaulted fonts, timid palettes, identical cards, missing states, harsh borders) and cleans them up in place.

### Codex Invocation

Codex uses the same skill content and can invoke it through the slash command or natural language:

```text
/interface-design
use interface-design to build this dashboard
use interface-design design-review on the settings page
use interface-design design-deslop on this branch
```

For visual direction work, when an image-generation tool is available the skill can produce direction boards, UI reference mockups, screenshot paintovers, and project-bound raster assets.

---

## Design Directions

The skill infers direction from project context, but you can customize:

| Direction | Feel | Best For |
|-----------|------|----------|
| **Precision & Density** | Tight, technical, monochrome | Developer tools, admin dashboards |
| **Warmth & Approachability** | Generous spacing, soft shadows | Collaborative tools, consumer apps |
| **Sophistication & Trust** | Cool tones, layered depth | Finance, enterprise B2B |
| **Boldness & Clarity** | High contrast, dramatic space | Modern dashboards, data-heavy apps |
| **Utility & Function** | Muted, functional density | GitHub-style tools |
| **Data & Analysis** | Chart-optimized, numbers-first | Analytics, BI tools |

---

## Examples

See live examples at **[interface-design.dev/examples.html](https://interface-design.dev/examples.html)**

For system file templates, see `reference/examples/`:
- **[system-precision.md](reference/examples/system-precision.md)** — Dashboard/admin interfaces
- **[system-warmth.md](reference/examples/system-warmth.md)** — Collaborative/consumer apps

---

## Migration from claude-design-skill

**This repo was renamed from `claude-design-skill`.**

All old URLs redirect automatically.

**If you installed the old skill:**

```bash
# Uninstall old
rm -rf ~/.claude/skills/design-principles

# Install the current skill
npx skills add https://github.com/dammyjay93/interface-design --skill interface-design --agent claude-code -g
```

Your system.md files (if any) continue to work. Rename `.ds-engineer/` to `.interface-design/` if you have not already.

---

## Philosophy

**Decisions compound.** A spacing value chosen once becomes a pattern. A depth strategy becomes an identity.

**Consistency beats perfection.** A coherent system with "imperfect" values beats a scattered interface with "correct" ones.

**Memory enables iteration.** When you can see what you decided and why, you can evolve intentionally instead of drifting accidentally.

---

## License

MIT — See [LICENSE](LICENSE)

---

<p align="center">
  <a href="https://interface-design.dev">Website</a> · <a href="https://github.com/Dammyjay93/interface-design">GitHub</a>
</p>

