---
project: mdbadges-cli
stars: 19
description: |-
    An extensive CLI tool to find over 500+ Shields.io badges for your projects.
url: https://github.com/inttter/mdbadges-cli
---

<img src="https://github.com/user-attachments/assets/14dd0cdc-6b1b-45ce-8e00-dbd7474866c7" width="150">

# mdbadges-cli

[![GitHub Release](https://img.shields.io/github/v/release/inttter/mdbadges-cli?style=flat&colorA=18181B&colorB=6134EB&logo=github)](https://github.com/inttter/mdbadges-cli/releases/latest)
[![NPM Downloads](https://img.shields.io/npm/dw/mdbadges-cli.svg?style=flat&colorA=18181B&colorB=6134EB&logo=npm)](https://www.npmjs.com/package/mdbadges-cli/)
[![License](https://custom-icon-badges.herokuapp.com/github/license/inttter/mdbadges-cli?logo=law&color=6134EB&labelColor=191724)](LICENSE)

**mdbadges-cli** is an extensive command-line tool that lets you search for over **600+** Shields.io badges for your projects without needing to leave the terminal, also including multiple commands with different purposes.

## Installation

To globally install mdbadges-cli, run the following:

```bash
npm install -g mdbadges-cli
```

[![Release](https://github.com/inttter/mdbadges-cli/actions/workflows/publish.yml/badge.svg)](https://github.com/inttter/mdbadges-cli/actions/workflows/publish.yml)
[![CI](https://github.com/inttter/mdbadges-cli/actions/workflows/test.yml/badge.svg)](https://github.com/inttter/mdbadges-cli/actions/workflows/test.yml)

## Getting Started

To start using a command, add the `mdb` prefix, followed by the correct [command name and syntax](#commands). For example:

```bash
mdb social discord

# Badge found:
# [![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?&logo=discord&logoColor=white)](#)
```

If you want to use a option, such as `--style`, you can run the same command with the option placed after it. For example:

```bash
mdb social discord --style plastic

# Badge found:
# [![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?&logo=discord&logoColor=white&style=plastic)](#)
```

For information on things like command syntax or accepted arguments, run `mdb help`.

## Commands

This section contains the commands that are currently available, with their corresponding syntax, arguments, and aliases.

|   Command                                 |    Description    |     Aliases      | Additional Information |
|-------------------------------------------|-------------------|------------------|------------------------|
`mdb [category] [badgeName]`                | Displays badge from a specific category. | None | Supports changing style using [`--style`](https://inttter.gitbook.io/mdbcli/commands/finding-a-badge#style-s), adding a link to the badge using [`--link`](https://inttter.gitbook.io/mdbcli/commands/finding-a-badge#style-s), and HTML using the `--html` option. Also supports finding [multiple badges](https://inttter.gitbook.io/mdbcli/commands/finding-a-badge#auto-update) at once.
`mdb search`                                | Searches for badges across any [category](#categories). | `s`, `find`, `lookup` | Select a badge to get the Markdown code for it. Loops until `No` is selected.
`mdb create`                                | Displays prompts to create your own badge. | `generate` | Both Markdown and HTML versions of your badge are given. For logo colors, only hexadecimal colors are supported.
`mdb add [category] [badgeName] [filePath]` | Allows you to add a badge to a file. | None | This works with [subdirectories](https://inttter.gitbook.io/mdbcli/commands/add#adding-badges-to-subdirectories) too. Also supports adding HTML versions using the `--html` option.
`mdb copy [category] [badgeName]`           | Copies a badges' code to the clipboard. | `c` | Also supports copying HTML versions using the `--html` option.
`mdb random`                                | Displays a random badge. | `r` | Displays the badge in both Markdown and HTML formats.
`mdb badges`                                | Opens a link to the badge list in your browser. | `list` | Opens in your default browser.
`mdb docs` | Opens a link to the documentation in your browser. | None | Opens in your default browser.
`mdb changelog` | Opens a link to the latest release and it's changelog in your browser. | `release` | Opens in your default browser.

## Categories

This section contains the categories that are currently available, with their corresponding names and syntax. The syntax is needed for the `[category]` field of certain commands.

| Name                    | Syntax                 |
|-------------------------|------------------------|
| API Development         | `api-dev`              |
| App Store               | `app-store`            |
| Artificial Intelligence | `ai`                   |
| Blog                    | `blog`                 |
| Browser                 | `browser`              |
| CI                      | `ci`                   |
| Cloud                   | `cloud`                |
| Code Coverage           | `code-coverage`        |
| Code Editor             | `code-editor`          |
| Code Linter             | `code-linter`          |
| Code Type Checker       | `code-type checker`    |
| Collaboration           | `collaboration`        |
| Cryptocurrency          | `crypto`               |
| Database                | `database`             |
| Data Science            | `data-science`         |
| Delivery                | `delivery`             |
| Design                  | `design`               |
| Documentation           | `documentation`        |
| Education               | `education`            |
| Funding                 | `funding`              |
| Framework               | `framework`            |
| Game Engine             | `game-engine`          |
| Gaming Platform         | `game-platform`        |
| Gaming Storefront       | `game-store`           |
| Jobs                    | `jobs`                 |
| Monitoring              | `monitoring`           |
| Operating System        | `os`                   |
| ORM                     | `orm`                  |
| Package Manager         | `package-manager`      |
| Payment                 | `payment`              |
| Process Manager         | `process-manager`      |
| Programming Language    | `programming`          |
| Review                  | `review`               |
| Search Engine           | `search-engine`        |
| Social Media            | `social`               |
| Sound                   | `sound`                |
| Static Site             | `static-site`          |
| Storage                 | `storage`              |
| Streaming               | `streaming`            |
| Terminal                | `terminal`             |
| URL Shortener           | `url-shortener`        |
| Version Control         | `version-control`      |
| Virtual Reality         | `vr`                   |

## Documentation

To learn more about mdbadges-cli and how to use certain commands, along with their options, visit the [documentation](https://inttter.gitbook.io/mdbcli), which hosts more detailed information and various examples.

## Contributing

If you would like to contribute in any way, such as adding a badge, please make sure to read the [contributing guidelines](CONTRIBUTING.md) first before making a contribution.

## License 

© **2026** - mdbadges-cli is licensed under the [MIT License](LICENSE).
