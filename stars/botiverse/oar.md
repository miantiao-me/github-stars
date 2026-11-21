---
project: oar
stars: 681
description: |-
    oar (Open Agent Runtime): programming interface for all agent harnesses
url: https://github.com/botiverse/oar
---

# OAR - *programming interface for all agent harnesses* [![Built with Raft](https://raw.githubusercontent.com/raft-builders/awesome-raft-build/main/badge/built-with-raft.svg)](https://app.raft.build/s/open-agent-runtime)

<div align="center">
  <img src="assets/logo.png" alt="OAR logo" width="120">
</div>

OAR (**O**pen **A**gent **R**untime) is a provider-independent programming interface for coding-agent runtimes: a solid foundation for building agent workspaces and other applications.

**Delete harness logic and focus on outcomes and UX.**

OAR is built in the open: the agents and people working on it talk, review and ship on [Raft](https://app.raft.build/s/open-agent-runtime), where you can follow along.

## Supported runtimes

<table>
  <tr>
    <td align="center" width="112">
      <a href="docs/runtimes/antigravity.md">
        <img src="packages/oar/assets/brands/antigravity.svg" width="32" height="32" alt=""><br>
        Antigravity
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/claude.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/claude.svg">
          <img src="packages/oar/assets/brands/claude.svg" width="32" height="32" alt="">
        </picture><br>
        Claude Code
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/codebuddy.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/codebuddy-on-dark.svg">
          <img src="packages/oar/assets/brands/codebuddy-on-light.svg" width="32" height="32" alt="">
        </picture><br>
        CodeBuddy Code
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/codex.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/codex-on-dark.svg">
          <img src="packages/oar/assets/brands/codex-on-light.svg" width="32" height="32" alt="">
        </picture><br>
        Codex
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/cursor.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/cursor-on-dark.svg">
          <img src="packages/oar/assets/brands/cursor-on-light.svg" width="32" height="32" alt="">
        </picture><br>
        Cursor
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/dsh.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/dsh-on-dark.svg">
          <img src="packages/oar/assets/brands/dsh-on-light.svg" width="32" height="32" alt="">
        </picture><br>
        DeepSeek Harness
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/devin.md">
        <img src="packages/oar/assets/brands/devin.svg" width="32" height="32" alt=""><br>
        Devin
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="112">
      <a href="docs/runtimes/factory.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/factory.svg">
          <img src="packages/oar/assets/brands/factory.svg" width="32" height="32" alt="">
        </picture><br>
        Factory Droid
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/grok.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/grok-on-dark.svg">
          <img src="packages/oar/assets/brands/grok-on-light.svg" width="32" height="32" alt="">
        </picture><br>
        Grok Build
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/kimi.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/kimi-on-dark.svg">
          <img src="packages/oar/assets/brands/kimi-on-light.svg" width="32" height="32" alt="">
        </picture><br>
        Kimi Code
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/opencode.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/opencode-on-dark.svg">
          <img src="packages/oar/assets/brands/opencode-on-light.svg" width="32" height="32" alt="">
        </picture><br>
        OpenCode
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/pi.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/pi-on-dark.svg">
          <img src="packages/oar/assets/brands/pi-on-light.svg" width="32" height="32" alt="">
        </picture><br>
        Pi
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/qoder.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/qoder-on-dark.svg">
          <img src="packages/oar/assets/brands/qoder-on-light.svg" width="32" height="32" alt="">
        </picture><br>
        Qoder
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/qwen.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/qwen-on-dark.svg">
          <img src="packages/oar/assets/brands/qwen-on-light.svg" width="32" height="32" alt="">
        </picture><br>
        Qwen Code
      </a>
    </td>
  </tr>
</table>

[Pi Durable](docs/runtimes/pi-durable.md) also runs through a host-owned Harness,
including in a browser ([demo](apps/pi-durable/README.md)).

### Community runtimes

Shipped from `@botiverse/oar/community` and maintained outside the core team: a
host adds one with its own deployment and credentials, so they are not in
`defaultRuntimes`.

<table>
  <tr>
    <td align="center" width="112">
      <a href="docs/runtimes/morph.md">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="packages/oar/assets/brands/morph-on-dark.svg">
          <img src="packages/oar/assets/brands/morph.svg" width="32" height="32" alt="">
        </picture><br>
        Mister Morph
      </a>
    </td>
    <td align="center" width="112">
      <a href="docs/runtimes/cybion.md">
        <img src="packages/oar/assets/brands/cybion.svg" width="32" height="32" alt=""><br>
        Cybion
      </a>
    </td>
  </tr>
</table>

## Library

One API drives every runtime: swap `"claude"` for `"codex"`, `"grok"` or
`"pi"` (with a model it has) and the code stays the same. An option a runtime cannot honor is refused
before anything opens, never silently dropped.

```ts
import { defaultRuntimes, promptAndWait } from "@botiverse/oar";

const claude = defaultRuntimes.require("claude");
const installation = await claude.installation?.();
if (installation?.kind !== "available") throw new Error("claude is not installed");

const session = await claude.session(installation, { cwd: process.cwd(), model: "sonnet" });

session.events((event) => {
  // Every event says which agent it came from: [] is the root.
  if (event.kind === "text_delta" && event.agentPath.length === 0) process.stdout.write(event.text);
  if (event.kind === "tool_call_started") console.log(event.tool);
});

const run = promptAndWait(session, "Find and fix the flaky test", { timeoutMs: 600_000 });
// From your UI: steers the running turn, or queues where the runtime cannot steer.
await session.deliver("Leave the snapshots alone.");
console.log(await run);
await session.dispose();

// Later, even from another process: the same conversation.
const resumed = await claude.session(installation, { cwd: process.cwd(), resume: session.id });
```

A session gives you:

- **Every fact, attributed.** One event per fact with `seq` and `agentPath`;
  `rawEvents()` keeps every native payload verbatim
  ([record stream](docs/spec/record-stream.md)).
- **Control with honest answers.** `prompt`, `steer`, `queue`, `withdraw` and
  `abort` answer accepted or rejected with a typed code
  ([conversation](docs/spec/conversation.md)). Runtimes with native compaction
  also offer `compact` ([contract](docs/spec/manual-compaction.md)).
- **Your own tools and subagents.** `serveMcpTools` attaches host tools to any
  runtime; `@botiverse/oar/agents` hands work to other runtimes
  ([host tools](docs/spec/runtime-matrix.md#host-served-tools)).
- **Views and tests.** `@botiverse/oar/observe` folds records for a UI, in a
  browser too; `@botiverse/oar/testing` is a scripted runtime with no binary or
  login.

What differs by runtime is declared on the `Runtime`, not guessed
([matrix](docs/spec/runtime-matrix.md)). Entry points and setup:
[package README](packages/oar/README.md).

## Without a session

The same API answers the questions a dashboard or setup wizard asks, for every
runtime:

```ts
for (const runtime of defaultRuntimes.list()) {
  const installation = await runtime.installation?.();
  if (installation?.kind === "available") {
    console.log(runtime.id, await runtime.listModels?.(installation));
  }
}
```

- **Installation:** whether each runtime is installed, its version and where;
  [install](docs/spec/install.md) and [update](docs/spec/update.md) through the
  vendor's own installer and updater, and the minimum version OAR supports
  where a runtime has one.
- **Account:** [log in, log out and status](docs/spec/login.md) through the
  runtime's own login, without a terminal (OAR never handles the tokens);
  [usage](docs/spec/account-usage.md): plan, quota windows and their resets, and
  Codex and Claude limit resets.
- **Models:** what the installation can run now, with efforts and service tiers.
- **[Inventories](docs/spec/inventory.md):** configured skills, commands, MCP servers and tools.
- **[Setup forms](docs/spec/config-form.md):** settings as data a UI renders.
- **[Orientation](docs/spec/orientation.md):** all of the above for every runtime in one bounded call.

## CLI

The same API on the command line: set up runtimes on a machine (install, sign in, check usage and models) and run a turn to see what a runtime does, for setup, debugging and verifying OAR itself. `oar mcp` also lets an agent hand tasks to other runtimes.

```bash
npx @botiverse/oar-cli installation
oar install codex --plan
oar account login claude
oar account usage
oar run claude "What does this repo do?" --record run.jsonl
```

Every command: [packages/cli](packages/cli/README.md) (published as `@botiverse/oar-cli`).

## Projects using OAR

- [Raft](https://raft.build): where people and agents work together; Raft Computers run agent runtimes through OAR.
- [Kaze](https://kaze.build): a calm, quick browser for macOS and Windows, with an agent that works in your tabs.
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/experimental/subagent-oar): `subagent-oar` hands DeepSeek Harness subagents to other runtimes.
- [repo-harness](https://github.com/aimpact-inc/repo-harness): file-backed workflow harness for Claude Code and Codex sessions.
- [Eta](https://github.com/0xfe-project/eta): a self-contained multi-agent loop, runtime and app.
- [dsh-agent-team](https://github.com/Contexera/dsh-agent-team): agent teams for DeepSeek Harness.
- [dsh-engine-switch](https://github.com/Goodfun-Studio/dsh-engine-switch): a DeepSeek Harness plugin that hands the main session to another agent runtime.
- [ducter](https://github.com/wey-gu/ducter): a personal AI that hands work to coding agents on your machines.
- [tmux-agent-deck](https://github.com/RayzPub/tmux-agent-deck): control tmux sessions and coding agents from a web terminal.

Using OAR in a public project? Open a pull request to add it here.

## Contributing

Issues and pull requests are welcome, from people and from agents, including
the agents of projects that use OAR. Issues are preferred. AI-written
contributions are fine without a person checking them by hand, as long as the
AI verified them in a real environment: the real runtime, a real account, a
real task.

- **Issues.** Name the `@botiverse/oar` (or `@botiverse/oar-cli`) version, the
  runtime and its version, and the OS; say what you called, what you expected
  and what happened; include the session's records that show it
  (`session.records()`, or a log from `oar run ... --record run.jsonl`),
  redacted, and how you reproduced it in a real environment. One problem per
  issue.
- **Pull requests.** Read [docs/development.md](docs/development.md) first.
  One change per pull request, rebased on `main`, titled in Conventional
  Commits (`fix(pi): ...`); a fix comes with a test that fails without it;
  docs are updated in the same change; `CI=1 pnpm run check` passes (without
  `CI=1`, snapshot tests rewrite their snapshots instead of failing). Do not
  bump package versions or push tags: releases are cut by the maintainers.
  Say in the description how the change was verified in a real environment.
- Never paste credentials, tokens, account identifiers or emails, or
  machine-local paths.
- Projects that use both Raft and OAR can ask
  contact@raft.build for a joint channel with the OAR team, to take part more
  directly.

## Docs

- [Design](docs/design/README.md): why oar exists, its decisions and what comes next.
- [Spec](docs/spec/README.md): the record stream and every contract built on it.
- [Runtimes](docs/runtimes/README.md): what each runtime says natively and how oar maps it.
- [Prior art](docs/prior-arts/README.md): related projects compared feature by feature.
- [Development](docs/development.md): working in this repo.

ESM-only, Node entry requires Node.js 24+; the browser entry needs a modern browser
with Web Crypto. Apache-2.0.

