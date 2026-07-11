---
project: ai-global
stars: 70
description: |-
    Unified Config Manager for AI Coding Tools
url: https://github.com/nanxiaobei/ai-global
---

# AI Global

English · [简体中文](README_CN.md) · [繁體中文](README_TW.md) · [日本語](README_JP.md) · [한국어](README_KR.md)

---

**Unified Config Manager for AI Coding Tools.**

Edit one file, sync to all your AI tools.

Works both **System Mode** & **Project Mode**.

## Supported Tools

| Tool                                                  | Key           | AGENTS.md | Rules | Commands | Skills |
| ----------------------------------------------------- | ------------- | :-------: | :---: | :------: | :----: |
| [Claude Code](https://claude.com/product/claude-code) | `claude`      |     ✓     |       |    ✓     |   ✓    |
| [OpenAI Codex](https://openai.com/codex/)             | `codex`       |     ✓     |   ✓   |          |   ✓    |
| [Cursor](https://cursor.com/)                         | `cursor`      |     ✓     |   ✓   |    ✓     |   ✓    |
| [Factory Droid](https://factory.ai/)                  | `droid`       |     ✓     |   ✓   |    ✓     |   ✓    |
| [Amp](https://ampcode.com/)                           | `amp`         |     ✓     |   ✓   |    ✓     |   ✓    |
| [Antigravity](https://antigravity.google/)            | `antigravity` |     ✓     |       |          |   ✓    |
| [Gemini CLI](https://geminicli.com/)                  | `gemini`      |     ✓     |       |          |   ✓    |
| [Kiro](https://kiro.dev/)                             | `kiro`        |     ✓     |   ✓   |          |   ✓    |
| [OpenCode](https://opencode.ai/)                      | `opencode`    |     ✓     |       |    ✓     |   ✓    |
| [Qoder](https://qoder.com/)                           | `qoder`       |     ✓     |   ✓   |    ✓     |   ✓    |
| [Qodo](https://www.qodo.ai/)                          | `qodo`        |     ✓     |       |          |        |
| [GitHub Copilot](https://github.com/features/copilot) | `copilot`     |     ✓     |       |          |   ✓    |
| [Continue](https://www.continue.dev/)                 | `continue`    |     ✓     |   ✓   |          |        |
| [Windsurf](https://windsurf.com/)                     | `windsurf`    |     ✓     |   ✓   |          |   ✓    |
| [Roo Code](https://roocode.com/)                      | `roo`         |     ✓     |   ✓   |    ✓     |   ✓    |
| [Cline](https://cline.bot/)                           | `cline`       |     ✓     |   ✓   |          |   ✓    |
| [Blackbox AI](https://www.blackbox.ai/)               | `blackbox`    |           |       |          |   ✓    |
| [Goose AI](https://goose.ai/)                         | `goose`       |     ✓     |       |          |   ✓    |
| [Augment](https://www.augmentcode.com/)               | `augment`     |     ✓     |   ✓   |    ✓     |        |
| [OpenClaw](https://openclaw.ai/)                      | `openclaw`    |     ✓     |       |          |   ✓    |
| [Command Code](https://commandcode.ai/)               | `commandcode` |     ✓     |       |    ✓     |   ✓    |
| [Kilo Code](https://kilo.ai/)                         | `kilocode`    |     ✓     |   ✓   |    ✓     |   ✓    |
| [Neovate](https://neovateai.dev/)                     | `neovate`     |     ✓     |       |    ✓     |   ✓    |
| [OpenHands](https://openhands.dev/)                   | `openhands`   |     ✓     |       |          |   ✓    |
| [TRAE](https://www.trae.ai/)                          | `trae`        |     ✓     |   ✓   |          |   ✓    |
| [Zencoder](https://zencoder.ai/)                      | `zencoder`    |     ✓     |   ✓   |          |   ✓    |

## Installation

Install with `curl` or `npm`:

### curl

```bash
curl -fsSL https://raw.githubusercontent.com/nanxiaobei/ai-global/main/install.sh | bash
```

### npm

```bash
npm install -g ai-global
# or
pnpm add -g ai-global
# or
yarn global add ai-global
# or
bun add -g ai-global
```

## Usage

Run:

```bash
ai-global
```

This will:

1. Detect the current directory context (system or project)
2. Scan for installed AI tools
3. Back up original configs to `.ai-global/backups`
4. Merge `AGENTS.md` `skills` `rules` `commands` from detected tools to `.ai-global` shared configs
5. Create symlinks from each tool to `.ai-global` shared configs

### Context

- **System Mode**: When run from `~` directory, unified configs for system-wide
- **Project Mode**: When run from any project directory (not `~`), unified configs for project-specific

## Commands

```bash
ai-global                   # Update symlinks (default)
ai-global status            # Show symlinks status
ai-global list              # List all supported AI tools
ai-global backups           # List available backups
ai-global unlink <key>      # Restore a tool's original config
ai-global unlink all        # Restore all tools
ai-global add <user/repo>   # Add skills from GitHub repo
ai-global upgrade           # Upgrade to latest version
ai-global uninstall         # Completely remove ai-global
ai-global version           # Show version
ai-global help              # Show help
```

**Context-aware**: Command behavior depends on the current directory (system or project)

### Add Skills

```bash
ai-global add user/repo
ai-global add https://github.com/user/repo
```

Skills will be added to your `.ai-global/skills`, and automatically shared to each tool (because of symlinks).

## How It Works

### System Mode Structure

```
~/.ai-global/
├── AGENTS.md        <- System shared AGENTS.md
├── skills/          <- System shared skills
├── rules/           <- System shared rules
├── commands/        <- System shared commands
└── backups/         <- Original tool configs' backups

~/.claude/
├── CLAUDE.md -> ~/.ai-global/AGENTS.md        (symlink)
├── skills/   -> ~/.ai-global/skills/          (symlink)
└── commands/ -> ~/.ai-global/commands/        (symlink)

~/.cursor/
├── AGENTS.md -> ~/.ai-global/AGENTS.md        (symlink)
└── skills/   -> ~/.ai-global/skills/          (symlink)

... and more tools
```

### Project Mode Structure

```
my-project/
├── .ai-global/
│   ├── AGENTS.md        <- Project shared AGENTS.md
│   ├── skills/          <- Project shared skills
│   ├── rules/           <- Project shared rules
│   ├── commands/        <- Project shared commands
│   └── backups/         <- Original tool configs' backups
└── .cursor/
    ├── AGENTS.md -> ../.ai-global/AGENTS.md   (symlink)
    └── skills/   -> ../.ai-global/skills/     (symlink)

    ... and more tools
```

### Mode Behavior

- **System Mode**: Manages AI tool configs for the system
- **Project Mode**: Manages AI tool configs for a project
- **Automatic Detection**: No commands needed to switch
- **Context-Aware**: Commands will show which context they're operating in

### Merge behavior

When you run `ai-global`, it merges items from all tools by filename:

- Cursor has skills: `react/`, `typescript/`
- Claude has skills: `typescript/`, `python/`
- Result in `.ai-global/skills`: `react/`, `typescript/`, `python/`

**Last file wins** (later tools overwrite earlier tools with the same filename).

## Uninstall

```bash
ai-global uninstall
```

This will:

1. Unlink all tools, restore to their original configs
2. Remove all `.ai-global` directory
3. Remove `ai-global` command

## License

MIT

