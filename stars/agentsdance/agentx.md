---
project: agentx
stars: 51
description: |-
    AgentX - Agent Extension: MCP Servers, Agent Skills and Plugins Manager
url: https://github.com/agentsdance/agentx
---

# AgentX

English | [Chinese](README.zh-CN.md)

AgentX stands for Agent eXtension: A unified CLI tool for managing **MCP (Model Context Protocol) Servers** and **Skills** across multiple AI coding agents.

## Overview

AgentX simplifies the installation, management, and monitoring of MCP servers and skills across popular AI coding tools:

- **Claude Code**
- **Codex**
- **Cursor**
- **Gemini CLI**
- **OpenCode**

It provides both a command-line interface and an interactive terminal UI (TUI) for seamless configuration management.

## Features

### MCP Server Management
- Install/remove MCP servers across multiple agents
- Check installation status
- Bulk installation to all supported agents
- Supported MCP servers:
  - **Playwright** - Browser automation capabilities
  - **Context7** - Library documentation access

### Claude Code & Codex Skills Management
- Install skills from local paths or Git repositories
- Support for skill directories (with `SKILL.md`); Claude Code also supports command files (`.md`)
- Install from GitHub URLs with tree fragments
- Personal and project scope management
- Skills health checking and validation

### Interactive TUI
- Three main tabs: MCP Servers, Skills, Code Agents
- Visual status matrix showing MCP installations across agents
- Keyboard shortcuts for quick navigation
- Real-time status updates

## Installation

### 1. npm (global install)

```bash
npm install -g @agentsdance/agentx
```

### 2. Homebrew (macOS/Linux)

```bash
# Add the tap (points to this repo)
brew tap agentsdance/agentx https://github.com/agentsdance/agentx.git

# Install agentx
brew install agentx

# Upgrade to the latest version
brew upgrade agentx
```

### 3. Download Binary

Download the latest release from [GitHub Releases](https://github.com/agentsdance/agentx/releases).

### 4. Go Install

```bash
go install github.com/agentsdance/agentx@latest
```

### 5. Build from Source

```bash
# Clone the repository
git clone https://github.com/agentsdance/agentx.git
cd agentx

# Build
make build

# Install to /usr/local/bin (customize with PREFIX env var)
make install
```

### Prerequisites

- **Go 1.25+** for building
- **Node.js with npm** for MCP server execution (via npx)
- **Git** for cloning skill repositories

## Usage

### Interactive Mode

Launch the interactive TUI:

```bash
agentx
```

Use keyboard shortcuts to navigate:
- `Tab` / `Shift+Tab` - Switch between tabs
- `↑` / `↓` - Navigate items
- `Enter` - Select/toggle
- `q` / `Ctrl+C` - Quit

### CLI Commands

![](./tui1.png)

![](./tui2.png)

### Command Aliases

The tool responds to: `agentx`, `agents`, or `ax`

## Configuration

### Agent Configuration Locations

| Agent | Config Path |
|-------|-------------|
| Claude Code | `~/.claude.json` |
| Codex | `~/.codex/config.toml` |
| Cursor | `~/.cursor/mcp.json` |
| Gemini CLI | `~/.gemini/settings.json` |
| OpenCode | `~/.opencode/config.json` |

### Skills Storage

Claude Code:

| Scope | Skills Directory | Commands Directory |
|-------|------------------|-------------------|
| Personal | `~/.claude/skills/` | `~/.claude/commands/` |
| Project | `.claude/skills/` | `.claude/commands/` |

Codex:

| Scope | Skills Directory |
|-------|------------------|
| Personal | `$CODEX_HOME/skills/` (default `~/.codex/skills/`) |
| Project | `.codex/skills/` |

## Project Structure

```
agentx/
├── cmd/                    # CLI commands
├── internal/
│   ├── agent/             # Agent implementations (Claude, Codex, Cursor, Gemini, OpenCode)
│   ├── config/            # Configuration management
│   ├── skills/            # Skills management
│   ├── mcp/               # MCP-specific logic
│   └── version/           # Version information
├── ui/
│   ├── components/        # Reusable UI components
│   ├── views/             # Tab views (MCP, Skills, Agents)
│   └── theme/             # Styling
├── main.go                # Entry point
├── Makefile               # Build targets
└── go.mod                 # Go module definition
```

## Available Skills

AgentX comes with pre-configured skills:

| Skill | Description |
|-------|-------------|
| `frontend-design` | Production-grade UI design |
| `mcp-builder` | Build MCP servers |
| `pdf` | PDF document handling |
| `docx` | Word document handling |
| `xlsx` | Excel document handling |
| `pptx` | PowerPoint document handling |

## License

Apache 2.0 - See [LICENSE](LICENSE) for details.

