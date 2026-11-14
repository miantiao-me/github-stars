---
project: onevra
stars: 288
description: |-
     Native desktop UI components for Go, built on MyGo. Themed controls, window shells, Lucide icons, plus chat, Markdown, code highlighting, charts and a command palette. Also includes a standalone packager for macOS, Windows and Linux.
url: https://github.com/oneo-me/onevra
---

<p align="center">
  <img src="source/assets/icon.png" alt="Onevra" width="128">
</p>

<h1 align="center">Onevra</h1>

<p align="center">
  <strong>English</strong> |
  <a href="README.zh-CN.md">简体中文</a>
</p>

<p align="center">
  <a href="https://github.com/oneo-me"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-oneo--me-181717?logo=github&logoColor=white"></a>
  <a href="https://oneo.me"><img alt="Blog" src="https://img.shields.io/badge/Blog-oneo.me-0969da"></a>
  <a href="https://x.com/oneo666"><img alt="X" src="https://img.shields.io/badge/X-%40oneo666-000000?logo=x&logoColor=white"></a>
  <a href="https://github.com/sponsors/oneo-me"><img alt="GitHub Sponsors" src="https://img.shields.io/badge/GitHub%20Sponsors-ea4aaa?logo=githubsponsors&logoColor=white"></a>
</p>

<p align="center">
  <a href="https://awesomemygo.dev/ui"><img alt="Listed on Awesome MyGo" src="https://awesomemygo.dev/badge.svg"></a>
</p>

<p align="center">
  Onevra is a Go component library for native desktop applications, built on <a href="https://github.com/egoist/mygo">MyGo</a>. It provides themed controls, window shells, Lucide icons and complex components.
</p>

<p align="center">
  <img src="docs/images/gallery.png" alt="Onevra Gallery main interface with sidebar navigation and the Welcome page">
</p>

## Install

Onevra requires Go 1.27.3 or later. Install **0.2026.18** in your application module:

```sh
go get github.com/oneo-me/onevra/source@v0.2026.18
```

## Usage

Save this minimal application as `main.go` and run `go run .`:

```go
package main

import (
    "log"

    "github.com/egoist/mygo"
    "github.com/egoist/mygo/ui"
    "github.com/oneo-me/onevra/source/components"
    "github.com/oneo-me/onevra/source/shells/plain"
    "github.com/oneo-me/onevra/source/theme"
)

func main() {
    mygo.App.WhenReady(func() {
        shell := plain.NewShell(plain.ShellOptions{
            Title: "Hello Onevra",
            Theme: theme.Onevra,
            Content: func(c *ui.Context) {
                ui.Column(c).Fill().Padding(24).Children(func() {
                    components.Text(c, "Hello, Onevra!")
                })
            },
        })
        shell.Window().OnClosed(func() { mygo.App.Quit() })
    })
    if err := mygo.App.Run(); err != nil {
        log.Fatal(err)
    }
}
```

Create windows after MyGo is ready. Build content with Onevra controls and MyGo layout primitives; the application owns state, persistence and asynchronous work. See the [component contract](source/components/doc.go) and the [Shells](source/shells/plain/shell.go) used here.

## Documentation

| Topic | Document |
| --- | --- |
| Guides and every component | [oneo-me.github.io/onevra](https://oneo-me.github.io/onevra/) |
| Component contract | [source/components/doc.go](source/components/doc.go) |
| Window shells | [plain](source/shells/plain/shell.go), [sidebar](source/shells/sidebar/shell.go) |
| Theme | [source/theme/doc.go](source/theme/doc.go) |
| Lucide icons | [source/icons/lucide/doc.go](source/icons/lucide/doc.go) |
| Component design | [docs/architecture/components.md](docs/architecture/components.md) |
| Architecture | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Development guide | [docs/build.md](docs/build.md) |

## Development

Run these from `source/` to check a change:

```sh
gofmt -l .
GOWORK=off go test ./...
GOWORK=off go vet ./...
GOWORK=off go build ./...
```

- Preview all components with the Gallery: `go run ./examples/gallery`; append `-theme light` or `-theme dark` to choose an appearance.
- Package an application with MyGo's CLI: `go tool mygo dev` or `go tool mygo build`. See [app bundles](docs/build.md#app-bundles).
- Run one of the five starter applications under `source/examples/`; see [starter applications](docs/build.md#starter-applications).
- Work on the documentation site with `cd website && bun install && bun run dev`; see [website/README.md](website/README.md).
- Read [AGENTS.md](AGENTS.md) before changing code.

Consumer-visible changes are recorded in [CHANGELOG.md](CHANGELOG.md).

## License

Project code: [MIT](LICENSE). Components adapted from MyGo retain the [upstream MIT notice](source/components/LICENSE.mygo). Lucide assets retain their [upstream ISC and Feather MIT notices](source/icons/lucide/LICENSE).

